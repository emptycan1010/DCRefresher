const types: {[index: string]: string} = {
  UID: '유저 ID',
  NICK: '닉네임',
  IP: 'IP'
}
const memoAsk = (type: string, value: string) => {
  const win = document.createElement('div')
  win.className = 'refresher-frame-outer'

  const frame = document.createElement('div')
  frame.className = 'refresher-memo-frame'
  frame.innerHTML = `
  <p>${types[type]} ${value} 메모</p>
  <input id="refresher_memo" type="text"></input>
  <br>
  <input type="color" id="refresher_memo_color"></input>
  <p>color select</p>
  <button>ok</button>
  `

  win.appendChild(frame)
  document.body.appendChild(win)

  requestAnimationFrame(() => {
    win.classList.add('fadeIn')
  })

  return new Promise((resolve, reject) => {
    frame.querySelector('button')?.addEventListener('click', () => {
      resolve({
        text: frame.querySelector('#refresher_memo').value,
        color: frame.querySelector('#refresher_memo_color').value
      })

      document.body.removeChild(win)
    })
  })
}

export default {
  name: '유저 정보',
  description: '사용자의 IP, 아이디 정보, 메모를 표시합니다.',
  data: {},
  author: { name: 'Sochiru', url: '' },
  url: /gall\.dcinside\.com\/(mgallery\/|mini\/)?board\/(view|lists)/g,
  memory: {
    always: '',
    requestBlock: '',
    contextMenu: '',
    selected: {
      nick: '',
      uid: '',
      ip: ''
    },
    lastSelect: 0
  },
  enable: true,
  default_enable: true,
  require: ['filter', 'eventBus', 'ip'],
  func (
    filter: RefresherFilter,
    eventBus: RefresherEventBus,
    ip: RefresherIP
  ): void {
    const ipInfoAdd = (elem: HTMLElement) => {
      if (!elem || !elem.dataset.ip || elem.dataset.refresherIp) return false
      const ip_data = ip.ISPData(elem.dataset.ip)

      const text = document.createElement('span')
      text.className = 'ip refresherUserData'
      const format = ip.format(ip_data)
      text.innerHTML = `<span>${
        format.length > 100 ? format.substring(0, 97) + '...' : format
      }</span>`
      text.title = format

      const fl = elem.querySelector('.fl')
      if (fl) {
        const flIpQuery = fl.querySelector('.ip')

        if (flIpQuery) {
          fl.insertBefore(text, flIpQuery.nextSibling)
        }
      } else {
        elem.appendChild(text)
      }

      elem.dataset.refresherIp = ip_data && ip_data.name && format
    }

    const IdInfoAdd = (elem: HTMLElement) => {
      if (!elem || !elem.dataset.uid || elem.dataset.refresherId) return false

      const img = elem.querySelector('img')
      if (!img || img.src.indexOf('dc/w/images/nik.gif') === -1) {
        return false
      }

      const text = document.createElement('span')
      text.className = 'ip refresherUserData'
      text.innerHTML = `<span>(${elem.dataset.uid})</span>`
      text.title = elem.dataset.uid

      const fl = elem.querySelector('.fl')
      if (fl) {
        const flIpQuery = fl.querySelector('.ip')

        if (flIpQuery) {
          fl.insertBefore(text, flIpQuery.nextSibling)
        }
      } else {
        elem.appendChild(text)
      }

      elem.dataset.refresherId = 'true'
    }

    const memoAdd = (elem: HTMLElement) => {
      if (!elem.dataset.refresherMemoHandler) {
        elem.addEventListener('contextmenu', () => {
          const nick = elem.dataset.nick || ''
          const uid = elem.dataset.uid || ''
          const ip = elem.dataset.ip || ''

          this.memory.selected = {
            nick,
            uid,
            ip
          }
          this.memory.lastSelect = Date.now()
        })

        elem.dataset.refresherMemoHandler = 'true'
      }

      if (!elem || elem.dataset.refresherMemo) return false

      let memo = null

      if (elem.dataset.uid) {
        memo = this.data.memos[`UID@${elem.dataset.uid}`]
      }

      if (!memo && elem.dataset.nick) {
        memo = this.data.memos[`NICK@${elem.dataset.nick}`]
      }

      if (!memo && elem.dataset.ip) {
        memo = this.data.memos[`IP@${elem.dataset.ip}`]
      }

      if (!memo || !memo.text) {
        return false
      }

      const text = document.createElement('span')
      text.className = 'ip refresherUserData'
      text.innerHTML = `<span>(${memo.text})</span>`
      text.title = memo.text

      if (memo.color) {
        text.style.color = memo.color
      }

      const fl = elem.querySelector('.fl')
      if (fl) {
        const flIpQuery = fl.querySelector('.ip')

        if (flIpQuery) {
          fl.insertBefore(text, flIpQuery.nextSibling)
        }
      } else {
        elem.appendChild(text)
      }

      elem.dataset.refresherMemo = 'true'
    }

    const elemAdd = (elem: HTMLElement | Document) => {
      const list = elem.querySelectorAll('.ub-writer')
      let iter = list.length

      while (iter--) {
        memoAdd(list[iter] as HTMLElement)
        ipInfoAdd(list[iter] as HTMLElement)
        IdInfoAdd(list[iter] as HTMLElement)
      }
    }

    this.memory.always = filter.add(
      '.ub-writer',
      (elem: HTMLElement) => {
        memoAdd(elem)
        ipInfoAdd(elem)
        IdInfoAdd(elem)
      },
      {
        neverExpire: true
      }
    )
    filter.runSpecific(this.memory.always)

    this.memory.contextMenu = eventBus.on(
      'refresherUserContextMenu',
      (nick: string, uid: string, ip: string) => {
        this.memory.selected = {
          nick,
          uid,
          ip
        }
        this.memory.lastSelect = Date.now()
      }
    )
    console.log(this.data.memos)

    this.memory.requestBlock = eventBus.on('refresherUpdateUserMemo', () => {
      if (Date.now() - this.memory.lastSelect > 10000) {
        return
      }

      let type = 'NICK'
      let value = this.memory.selected.nick

      if (this.memory.selected.uid) {
        type = 'UID'
        value = this.memory.selected.uid
      } else if (this.memory.selected.ip) {
        type = 'IP'
        value = this.memory.selected.ip
      }

      if (!value || value.length < 1) {
        return
      }

      if (!this.data.memos) {
        this.data.memos = {}
      }

      console.log(this.data.memos)

      memoAsk(type, value)
        .then(obj => {
          this.data.memos[`${type}@${value}`] = obj
        })
        .catch(e => {
          console.log(e)
        })
    })

    elemAdd(document)
  },
  revoke (filter: RefresherFilter): void {
    if (this.memory.always) {
      filter.remove(this.memory.always, true)
    }

    const lists = document.querySelectorAll('.refresherUserData')

    lists.forEach(elem => {
      elem.parentElement?.removeChild(elem)
    })
  }
}
