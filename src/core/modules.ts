import log from '../utils/logger'

import * as store from '../utils/store'
import { eventBus } from './eventbus'
import { filter } from './filtering'
import Frame from './frame'
import * as ip from '../utils/ip'
import * as http from '../utils/http'
import * as dom from '../utils/dom'

import { browser } from 'webextension-polyfill-ts'

import * as settings from './settings'
import * as block from './block'

const UTILS: { [index: string]: Record<string, unknown> } = {
  filter,
  Frame,
  eventBus,
  http,
  ip,
  block,
  dom
}

const module_store: { [index: string]: RefresherModule } = {}

const runtime = browser && browser.runtime

const runModule = (mod: RefresherModule) => {
  const plugins = []

  if (mod.require && mod.require.length) {
    const len = mod.require.length
    for (let mi = 0; mi < len; mi++) {
      plugins.push(UTILS[mod.require[mi]])
    }
  }

  if (mod.func) {
    mod.func(...plugins)
  }
}

const revokeModule = (mod: RefresherModule) => {
  if (mod.revoke) {
    const plugins = []

    if (mod.require && mod.require.length) {
      const len = mod.require.length
      for (let mi = 0; mi < len; mi++) {
        plugins.push(UTILS[mod.require[mi]])
      }
    }

    mod.revoke(...plugins)
  }

  if (mod.memory) {
    for (const key in mod.memory) {
      mod.memory[key] = undefined
    }
  }
}

export const modules = {
  lists: (): { [index: string]: RefresherModule } => {
    return module_store
  },
  load: (...mods: RefresherModule[]): Promise<void> =>
    new Promise<void>(resolve => {
      return Promise.all(
        mods.map(v => {
          return modules.register(v)
        })
      ).then(() => {
        resolve()
      })
    }),

  register: async (mod: RefresherModule): Promise<void> => {
    const start = performance.now()

    if (typeof module_store[mod.name] !== 'undefined') {
      throw new Error(`${mod.name} is already registered.`)
    }

    const enable = (await store.get(`${mod.name}.enable`)) as boolean
    mod.enable = enable

    if (typeof enable === 'undefined' || enable === null) {
      store.set(`${mod.name}.enable`, mod.default_enable)
      mod.enable = mod.default_enable
    }

    if (mod.settings) {
      for (const key in mod.settings) {
        if (!mod.status) {
          mod.status = {}
        }
        
        mod.status[key] = await settings.load(
          mod.name,
          key,
          mod.settings[key]
        )
      }
    }

    module_store[mod.name] = mod

    const stringify = JSON.stringify({
      module_store,
      settings_store: settings.dump()
    })

    runtime.sendMessage(stringify)

    if (!mod.enable) {
      log(`📁 ignoring ${mod.name}. The module is disabled.`)
      return
    }

    if (mod.url && !mod.url.test(location.href)) {
      log(
        `📁 ignoring ${mod.name}. current URL is not matching with the module's URL value.`
      )
      return
    }

    runModule(mod)

    log(
      `📁 ${mod.name} module loaded. took ${(performance.now() - start).toFixed(
        2
      )}ms.`
    )
  }
}

if (runtime.onMessage) {
  runtime.onMessage.addListener((msg: RefresherRuntimeMessage) => {
    if (typeof msg === 'object' && msg.updateModuleSettings) {
      module_store[msg.name].enable = msg.value as boolean
      store.set(`${msg.name}.enable`, msg.value)

      runtime.sendMessage(
        JSON.stringify({
          module_store
        })
      )

      if (!msg.value) {
        revokeModule(module_store[msg.name])
        return
      }

      runModule(module_store[msg.name])
    } else if (typeof msg === 'object' && msg.updateUserSetting) {
      settings.setStore(msg.name, msg.key, msg.value)
    }
  })
}

eventBus.on(
  'refresherUpdateSetting',
  (module: string, key: string, value: unknown) => {
    if (module_store[module]) {
      module_store[module].status[key] = value
    }

    if (
      module_store[module].update &&
      typeof module_store[module].update[key] === 'function'
    ) {
      const utils: unknown[] = []

      const requires = module_store[module].require as string[]
      if (requires) {
        for (let i = 0; i < requires.length; i++) {
          const name = requires[i]

          if (UTILS[name]) {
            utils.push(UTILS[name])
          }
        }
      }

      module_store[module].update[key].bind(module_store[module])(
        value,
        ...utils
      )
    }
  }
)
