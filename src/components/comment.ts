import User from './user'
import TimeStamp from './timestamp'
import { eventBus } from '../core/eventbus'

const NRegex = /(ㄴ)(\s)?([^ ]+)/g

interface CommentVueData {
  currentId: string
  me: boolean
  rereply: boolean
}
interface CommentVueMethods {
  checkReReply: () => boolean
}

interface CommentClass extends CommentVueData, CommentVueMethods {
  comment: dcinsideCommentObject
  index: number
  postUser: string
}

interface VoiceDataComputed {
  iframe: boolean
  src: string
  memo: string
}

export default {
  components: {
    TimeStamp,
    User
  },
  template: `<div class="refresher-comment" :data-depth="comment.depth" :data-rereply="rereply" :data-deleted="comment.del_yn === 'Y'">
    <div class="meta">
      <User :user="comment.user" :me="me"></User>
      <div class="float-right">
        <TimeStamp :date="new Date(date(comment.reg_date))"></TimeStamp>
      </div>
    </div>
    <div v-if="comment.vr_player">
      <iframe v-if="getVoiceData.iframe" :src="getVoiceData.src" width="280px" height="54px" ></iframe>
      <audio v-else :src="getVoiceData.src" controls></audio>
      <p v-if="getVoiceData.memo">{{getVoiceData.memo}}</p>
    </div>
    <p v-else class="refresher-comment-content" :class="{dccon: comment.memo.indexOf('<img class=') > -1 || comment.memo.indexOf('<video class=') > -1}" v-html="comment.memo"></p>
  </div>`,
  data (): CommentVueData {
    return {
      currentId: '',
      me: false,
      rereply: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },

    index: {
      type: Number
    },

    postUser: {
      type: String
    }
  },
  mounted (this: CommentClass): void {
    this.rereply = this.checkReReply()

    if (!this.comment.user.id) {
      return
    }

    const gallogImageElement = document.querySelector(
      '#login_box .user_info .writer_nikcon > img'
    ) as HTMLImageElement

    const click =
      gallogImageElement && gallogImageElement.getAttribute('onclick')

    if (click) {
      this.currentId = click
        .replace(/window\.open\('\/\/gallog\.dcinside\.com\//g, '')
        .replace(/'\);/g, '')

      this.me = this.currentId === this.comment.user.id
    }

    if (!this.me && this.postUser) {
      this.me = this.postUser === this.comment.user.id
    }

    if (!this.me && !this.postUser) {
      eventBus.on(
        'RefresherPostDataLoaded',
        (obj: PostInfo) => {
          this.me = (obj.user && obj.user.id) === this.comment.user.id
        },
        {
          once: true
        }
      )
    }
  },
  computed: {
    getVoiceData (this: CommentClass): VoiceDataComputed | null {
      if (!this.comment.vr_player) {
        return null
      }
      const memo = this.comment.memo.split('@^dc^@')

      return {
        iframe: memo[0].indexOf('iframe') > -1,
        src:
          memo[0].indexOf('iframe') > -1
            ? memo[0].split('src="')[1].split('"')[0]
            : 'https://vr.dcinside.com/' + memo[0],
        memo: memo[1]
      }
    }
  },
  methods: {
    date (str: string): string {
      return str.substring(0, 4).match(/\./)
        ? `${new Date().getFullYear()}-${str.replace(/\./g, '-')}`
        : str.replace(/\./g, '-')
    },

    extractID (str: string): string | null {
      const match = str.match(/gallog\.dcinside.com\/.+'/g)
      return match ? match[0].replace(/gallog\.dcinside.com\/|'/g, '') : null
    },

    checkReReply (this: CommentClass): boolean {
      const content = this.comment.memo
      const depth = this.comment.depth

      if (depth < 1) {
        return false
      }

      if (
        !NRegex.test(content) ||
        content.indexOf('ㄴ') !== 0 ||
        content.indexOf('ㄴㄴ') === 0
      ) {
        return false
      }

      return true
    }
  }
}
