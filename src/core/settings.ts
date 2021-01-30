import * as store from '../utils/store'
import { eventBus } from './eventbus'
import { browser } from 'webextension-polyfill-ts'

const settings_store: { [index: string]: unknown } = {}

const runtime = (chrome && chrome.runtime) || (browser && browser.runtime)

export const set = async (
  module: string,
  key: string,
  value: unknown
): Promise<void> => {
  eventBus.emit('RefresherUpdateSetting', module, key, value)

  settings_store[module][key].value = value

  await store.set(`${module}.${key}`, value)

  if (runtime) {
    runtime.sendMessage(
      JSON.stringify({
        settings_store
      })
    )
  }
}

export const setStore = (module: string, key: string, value: unknown): void => {
  eventBus.emit('RefresherUpdateSetting', module, key, value)
  settings_store[module][key].value = value
}

export const get = (module: string, key: string): Promise<unknown> => {
  return store.get(`${module}.${key}`)
}

export const dump = (): { [index: string]: unknown } => {
  return settings_store
}

export const loadDefault = async (
  module: string,
  key: string,
  settings: RefresherSettings
): Promise<unknown> => {
  if (!settings_store[module]) {
    settings_store[module] = {}
  }

  let got = await get(module, key)

  if (typeof got === 'undefined' || typeof got === null) {
    settings.value = settings.default
    got = settings.default
  } else {
    settings.value = got
  }

  settings_store[module][key] = settings

  return got
}
