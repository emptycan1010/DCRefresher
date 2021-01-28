interface ButtonProps {
  click: () => boolean
  error: number
}

interface ButtonData {
  error: number
}

export default {
  template: `
    <div class="refresher-preview-button" v-on:click="safeClick">
      <transition name="refresher-shake">
        <img :key="error + 1" :src="getURL('/assets/icons/' + id + '.png')"></img>
      </transition>
      <transition name="refresher-shake">
        <p class="refresher-vote-text" :key="error" :id="'refresher-' + id + '-counts'">{{text}}</p>
      </transition>
    </div>
  `,
  props: {
    id: { type: [String, Number] },
    text: {
      type: String
    },
    click: {
      type: Function,
      required: false
    }
  },
  data (): ButtonData {
    return {
      error: 0
    }
  },
  methods: {
    getURL (u: string): string {
      return !chrome || !chrome.extension ? u : chrome.extension.getURL(u)
    },

    async safeClick (this: ButtonProps): Promise<unknown> {
      const result = this.click && (await this.click())

      if (!result) {
        this.error = Math.random()
      }

      return result
    }
  }
}
