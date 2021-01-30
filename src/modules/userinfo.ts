export default {
  name: '유저 정보',
  description: '유동, 반고닉 사용자의 IP, 아이디 정보를 표시합니다.',
  author: { name: 'Sochiru', url: '' },
  url: /gall\.dcinside\.com\/(mgallery\/|mini\/)?board\/(view|lists)/g,
  status: false,
  memory: {
    always: ''
  },
  enable: true,
  default_enable: true,
  require: ['filter', 'ip'],
  func (filter: RefresherFilter, ip: RefresherIP): void {
    const ipInfoAdd = (elem: HTMLElement) => {
      if (!elem || !elem.dataset.ip || elem.dataset.refresherIp) return false
      const ip_data = ip.ISPData(elem.dataset.ip)

      const text = document.createElement('span')
      text.className = 'ip refresherIP'
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
      text.className = 'ip refresherIP'
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

    const elemAdd = (elem: HTMLElement | Document) => {
      const list = elem.querySelectorAll('.ub-writer')
      let iter = list.length

      while (iter--) {
        ipInfoAdd(list[iter] as HTMLElement)
        IdInfoAdd(list[iter] as HTMLElement)
      }
    }

    this.memory.always = filter.add(
      '.ub-writer',
      (elem: HTMLElement) => {
        ipInfoAdd(elem)
        IdInfoAdd(elem)
      },
      {
        neverExpire: true
      }
    )
    filter.runSpecific(this.memory.always)

    elemAdd(document)
  },
  revoke (filter: RefresherFilter): void {
    if (this.memory.always) {
      filter.remove(this.memory.always, true)
    }

    const lists = document.querySelectorAll('.refresherIP')

    lists.forEach(elem => {
      elem.parentElement?.removeChild(elem)
    })
  }
}
