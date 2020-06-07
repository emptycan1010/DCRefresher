const Vue = require('vue')

const components = require('../components/frame')

;(() => {
  class InternalFrame {
    constructor (cls, options, app) {
      this.class = cls
      this.options = options

      this.app = app
      this.data = {}
    }

    setData (key, value) {
      this.data[key] = value
    }

    querySelector (...a) {
      return this.app.$el.querySelector(...a)
    }

    get center() {
      return this.options.center
    }
  }
  /**
   *
   * @param {Object} option
   * @param {*} className 적용할 className (default)
   */
  class frame {
    constructor (childs, option) {
      if (!document || !document.createElement) {
        throw new Error(
          "Frame is not available before DOMContentLoaded event. (DOM isn't accessible)"
        )
      }

      if (!childs) {
        childs = []
      }

      if (typeof option === 'undefined') {
        option = {}
      }

      this.outer = document.createElement('refresher-frame-outer')
      document.querySelector('body').appendChild(this.outer)

      this.frame = []
      this.app = new Vue({
        el: this.outer,
        data: () => {
          return {
            frames: [],
            ...option,
            activeGroup: option.groupOnce,
            fade: false
          }
        },
        methods: {
          first () {
            return this.frames[0]
          },

          second () {
            return this.frames[1]
          },

          outerClick () {
            this.fadeOut()
            document.querySelector('body').style.overflow = 'scroll'

            setTimeout(() => {
              document.querySelector('body').removeChild(this.$el)
            }, 300)
          },

          fadeIn () {
            this.fade = true
          },

          fadeOut () {
            this.fade = false
          }
        }
      })

      for (let i = 0; i < childs.length; i++) {
        this.app.frames.push(new InternalFrame(this.class, childs[i], this.app))
      }

      document.querySelector('body').style.overflow = 'hidden'
    }
  }

  module.exports = frame
})()
