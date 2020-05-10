const log = require('../utils/logger')
const store = require('../utils/store')

let ACCESSIBLE_UTILS = {
  filter: require('./filtering'),
  Frame: require('./frame'),
  eventBus: require('./eventbus'),
  http: require('../utils/http'),
  ip: require('../utils/ip')
}

;(() => {
  let module_store = {}

  const modules = {
    lists: module_store,
    register: async mod => {
      if (typeof module_store[mod.name] !== 'undefined') {
        throw new Error(`${mod.name} is already registered.`)
      }

      if (
        typeof await store.get(`${mod.name}.status`) === 'undefined' ||
        await store.get(`${mod.name}.status`) === null
      ) {
        store.set(`${mod.name}.status`, JSON.stringify(mod.status))
      }

      if (
        typeof await store.get(`${mod.name}.enable`) === 'undefined' ||
        await store.get(`${mod.name}.enable`) === null
      ) {
        store.set(`${mod.name}.enable`, mod.default_enable)
      }

      mod.enable = await store.get(`${mod.name}.enable`)
      mod.status = await store.get(`${mod.name}.status`)
      module_store[mod.name] = mod

      if (!mod.enable) {
        log(
          `📁 ignoring ${mod.name}. The module is disabled.`
        )
        return
      }

      if (mod.url && !mod.url.test(location.href)) {
        log(
          `📁 ignoring ${mod.name}. current URL is not matching with the module\'s URL value.`
        )
        return
      }

      let plugins = []

      if (mod.require && mod.require.length) {
        let len = mod.require.length
        for (let mi = 0; mi < len; mi++) {
          plugins.push(ACCESSIBLE_UTILS[mod.require[mi]])
        }
      }

      mod.func(...plugins)

      log(`📁 ${mod.name} module loaded.`)
    }
  }

  module.exports = modules
})()
