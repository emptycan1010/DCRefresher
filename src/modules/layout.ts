const updateWindowSize = (
  forceActive: boolean,
  active: Number,
  width: Number
) => {
  if (typeof active === 'string') {
    active = Number(active)
  }

  if (forceActive || active >= width) {
    if (document.documentElement.className.indexOf('refresherCompact') === -1) {
      document.documentElement.classList.add('refresherCompact')
    }
  } else {
    if (document.documentElement.className.indexOf('refresherCompact') > -1) {
      document.documentElement.classList.remove('refresherCompact')
    }
  }
}

export default {
  name: '레이아웃 수정',
  description: '디시 레이아웃을 변경할 수 있도록 도와줍니다.',
  author: { name: 'Sochiru', url: '' },
  url: /board\/lists/g,
  status: {
    activePixel: 900,
    forceCompact: false,
    hideGalleryView: false,
    hideUselessView: false,
    pushToRight: false,
    removeNotice: false,
    removeDCNotice: false
  },
  memory: {
    uuid: null,
    uuiddc: null,
    resize: () => {}
  },
  settings: {
    activePixel: {
      name: '컴팩트 모드 활성화 조건',
      desc: '브라우저 가로가 이 값 보다 작을 경우 컴팩트 모드를 활성화합니다.',
      type: 'range',
      default: 900,
      min: 100,
      step: 1,
      max: window.screen.width,
      unit: 'px',
      advanced: false
    },

    forceCompact: {
      name: '컴팩트 모드 강제 사용',
      desc: '항상 컴팩트 모드를 사용하도록 설정합니다.',
      type: 'check',
      default: false,
      advanced: false
    },

    hideGalleryView: {
      name: '갤러리 뷰 숨기기',
      desc: '갤러리 정보, 최근 방문 갤러리 영역을 숨깁니다.',
      type: 'check',
      default: false
    },

    hideUselessView: {
      name: '잡다 링크 숨기기',
      desc:
        '이슈줌, 타갤 개념글, 뉴스, 힛갤등의 컨텐츠를 오른쪽 영역에서 숨깁니다.',
      type: 'check',
      default: false
    },

    pushToRight: {
      name: '본문 영역 전체로 확장',
      desc: '"잡다 링크 숨기기" 옵션이 켜진 경우 본문 영역을 확장합니다.',
      type: 'check',
      default: false
    },

    removeNotice: {
      name: '갤러리 공지 숨기기',
      desc: '글 목록에서 공지사항을 숨깁니다.',
      type: 'check',
      default: false
    },

    removeDCNotice: {
      name: '디시 공지 숨기기',
      desc: '글 목록에서 운영자의 게시글을 숨깁니다.',
      type: 'check',
      default: false
    }
  },
  enable: true,
  default_enable: true,
  require: ['filter'],
  update: {
    activePixel (this: RefresherModule, value: Number) {
      updateWindowSize(this.status.forceCompact, value, window.innerWidth)
    },

    forceCompact (this: RefresherModule, value: boolean) {
      updateWindowSize(value, this.status.activePixel, window.innerWidth)
    },

    hideGalleryView (value: boolean) {
      document.documentElement.classList[value ? 'add' : 'remove'](
        'refresherHideGalleryView'
      )
    },

    hideUselessView (value: boolean) {
      document.documentElement.classList[value ? 'add' : 'remove'](
        'refresherHideUselessView'
      )
    },

    pushToRight (value: boolean) {
      document.documentElement.classList[value ? 'add' : 'remove'](
        'refresherPushToRight'
      )
    },

    removeNotice (
      this: RefresherModule,
      value: boolean,
      filter: RefresherFilter
    ) {
      if (!this.memory!.uuid && value) {
        this.memory!.uuid = filter.add(
          `.gall_list .us-post b`,
          (elem: HTMLElement) => {
            if (
              elem.parentElement!.parentElement!.parentElement! &&
              elem.parentElement!.parentElement!
            ) {
              elem.parentElement!.parentElement!.parentElement!.removeChild(
                elem.parentElement!.parentElement!
              )
            }
          },
          {
            neverExpire: true
          }
        )
      } else if (this.memory!.uuid && !value) {
        filter.remove(this.memory!.uuid)
      }
    },

    removeDCNotice (
      this: RefresherModule,
      value: boolean,
      filter: RefresherFilter
    ) {
      if (!this.memory!.uuiddc && value) {
        this.memory!.uuiddc = filter.add(
          `.gall_list .ub-content .ub-writer`,
          (elem: HTMLElement) => {
            let adminAttribute = elem.getAttribute('user_name')

            if (!adminAttribute || adminAttribute !== '운영자') {
              return
            }

            if (
              elem.parentElement!.parentElement! &&
              elem.parentElement!
            ) {
              elem.parentElement!.parentElement!.removeChild(
                elem.parentElement!
              )
            }
          },
          {
            neverExpire: true
          }
        )
      } else if (this.memory!.uuiddc && !value) {
        filter.remove(this.memory!.uuiddc)
      }
    }
  },
  func (filter: RefresherFilter) {
    this.memory.resize = () =>
      updateWindowSize(
        this.status.forceCompact,
        this.status.activePixel,
        window.innerWidth
      )
    window.addEventListener('resize', this.memory.resize)
    this.memory.resize()

    this.update.hideGalleryView(this.status.hideGalleryView)
    this.update.hideUselessView(this.status.hideUselessView)
    this.update.pushToRight(this.status.pushToRight)

    this.update.removeNotice.bind(this)(this.status.removeNotice, filter)
    this.update.removeDCNotice.bind(this)(this.status.removeDCNotice, filter)
  },

  revoke (filter: RefresherFilter) {
    window.removeEventListener('resize', this.memory.resize)

    this.update.hideGalleryView(false)
    this.update.hideUselessView(false)
    this.update.pushToRight(false)

    this.update.removeNotice.bind(this)(false, filter)
    this.update.removeDCNotice.bind(this)(false, filter)
  }
}
