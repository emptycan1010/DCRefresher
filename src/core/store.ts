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

export const get = (key: string | null): Promise<unknown> => {
  if (!str) {
    throw new Error("This browser doesn't support storage API.")
  }

  return new Promise<unknown>(resolve =>
    (str.sync || str.local).get(key, (v: { [index: string]: unknown }) => {
      resolve(key === null ? v : v[key])
    })
  )
}

export const all = (): Promise<unknown> => {
  return get(null)
}

export const clear = (): Promise<void> => {
  if (!str) {
    throw new Error("This browser doesn't support storage API.")
  }

  return new Promise<void>(resolve => {
    ;(str.sync || str.local).clear(() => {
      resolve()
    })
  })
}

export const module = {
  set (module: string, key: string, value: unknown): void {
    return set(`refresher.module:${module}-${key}`, value)
  },

  setGlobal (module: string, dump: unknown): void {
    return set(`refresher.module:${module}`, dump)
  },

  async get (module: string, key?: string): Promise<unknown> {
    let result = await get(
      key ? `refresher.module:${module}-${key}` : `refresher.module:${module}`
    )

    if (typeof result === 'string' && (result as string).indexOf('{') == 0) {
      result = JSON.parse(result as string)
    }

    return result
  }
}
