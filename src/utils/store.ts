import { browser } from 'webextension-polyfill-ts'

const str =
  (window.chrome && window.chrome.storage) || (browser && browser.storage)

export const set = (key: string, value: unknown): void => {
  if (!str) {
    throw new Error("This browser doesn't support storage API.")
  }

  const obj: { [index: string]: unknown } = {}
  obj[key] = value
  ;(str.sync || str.local).set(obj)

  return
}

export const get = (key: string): Promise<unknown> => {
  if (!str) {
    throw new Error("This browser doesn't support storage API.")
  }

  return new Promise<unknown>(resolve =>
    (str.sync || str.local).get(key, (v: { [index: string]: unknown }) => {
      resolve(v[key])
    })
  )
}
