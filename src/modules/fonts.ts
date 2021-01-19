export default {
  name: '폰트 교체',
  description: '페이지에 전반적으로 표시되는 폰트를 교체합니다.',
  author: { name: 'Sochiru', url: '' },
  status: {
    customFonts: 'Noto Sans CJK KR, NanumGothic',
    changeDCFont: true
  },
  memory: {
    uuid: null
  },
  settings: {
    customFonts: {
      name: 'font-family 이름',
      desc:
        '페이지 폰트를 입력된 폰트로 교체합니다. (빈칸으로 둘 시 확장 프로그램 기본 폰트로 설정)',
      default: 'Noto Sans CJK KR, NanumGothic',
      type: 'text'
    },
    changeDCFont: {
      name: '디시인사이드 폰트 교체',
      desc:
        '미리보기 창 같은 DCRefresher의 폰트 뿐만 아니라 디시인사이드의 폰트까지 교체합니다.',
      type: 'check',
      default: true
    }
  },

  update: {
    customFonts: (value: string | boolean) => {
      let fontElement = document.querySelector('#refresherFontStyle')
      if (fontElement && !value) {
        fontElement.parentElement?.removeChild(fontElement)

        return
      }

      if (value && document && document.head) {
        if (!fontElement) {
          fontElement = document.createElement('style')
          fontElement.id = 'refresherFontStyle'
          document.head.appendChild(fontElement)
        }

        fontElement.innerHTML = `.refresherChangeDCFont,.refresherFont .refresher-block-popup,.refresherFont .refresher-frame,.refresherFont .refresher-popup,.refresherChangeDCFont .gall_list,.refresherChangeDCFont button,.refresherChangeDCFont input,.refresherChangeDCFont .view_comment div,.refresherChangeDCFont .view_content_wrap,.refresherChangeDCFont .view_content_wrap a,.refresherChangeDCFont .btn_cmt_close,.refresherChangeDCFont .btn_cmt_close span,.refresherChangeDCFont .btn_cmt_refresh,.refresherChangeDCFont .btn_cmt_open{font-family:${this.status.customFonts},-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif!important}`
      }
    },
    changeDCFont: (vaule: boolean) => {
      document.documentElement.classList[vaule ? 'add' : 'remove'](
        'refresherChangeDCFont'
      )
    }
  },
  enable: true,
  default_enable: true,
  require: [],
  func () {
    document.documentElement.classList.add('refresherFont')
    this.update.changeDCFont(this.status.changeDCFont)
    this.update.customFonts(this.status.customFonts)
  },

  revoke () {
    document.documentElement.classList.remove('refresherFont')
    this.update.changeDCFont(false)
    this.update.customFonts(false)
  }
}
