export default {
  name: 'test',
  description: '유저, 컨텐츠 등의 보고 싶지 않은 컨텐츠들을 삭제합니다.',
  author: { name: 'Sochiru', url: '' },
  url: /gall\.dcinside\.com\/(mgallery\/|mini\/)?board\/(view|lists)/g,
  data: {},
  enable: true,
  default_enable: true,
  require: ['filter', 'eventBus', 'block', 'dom'],
  func (): void {
    
  },

  revoke (): void {}
}
