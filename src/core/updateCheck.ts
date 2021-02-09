import * as store from './store'
import * as Toast from '../components/toast'

setTimeout(async () => {
  const nav =
    typeof chrome !== 'undefined'
      ? chrome
      : typeof browser !== 'undefined'
        ? browser
        : undefined

  if (typeof nav === 'undefined') {
    return
  }

  const key = await store.get('refresher.lastVersion')

  const currentVersion =
    nav &&
    nav.runtime &&
    nav.runtime.getManifest &&
    nav.runtime.getManifest().version

  if (currentVersion && (!key || key !== currentVersion)) {
    Toast.show(
      `DCRefresher가 ${currentVersion}(으)로 업데이트되었습니다. 변경 사항은 여기에서 볼 수 있습니다.`,
      false,
      4000,
      () => {
        window.open(
          'https://github.com/So-chiru/DCRefresher/releases/tag/' +
            currentVersion,
          '_blank'
        )
      }
    )

    store.set('refresher.lastVersion', currentVersion)
  }
}, 5000)
