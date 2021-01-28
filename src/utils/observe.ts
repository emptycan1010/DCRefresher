export const find = (elem: string, parent: HTMLElement) =>
  new Promise<NodeListOf<Element>>((resolve, reject) => {
    const parentFind = parent.querySelectorAll(elem)
    if (parentFind.length) {
      resolve(parentFind)
    }

    let tout = 0

    const observer = new MutationObserver(muts => {
      let executed = false
      let iter = muts.length
      while (iter--) {
        if (!muts[iter].addedNodes.length) continue
        executed = true
        break
      }

      if (!executed) return
      const lists = document.querySelectorAll(elem)
      if (!lists.length) return

      resolve(lists)
      observer.disconnect()

      if (tout) {
        clearTimeout(tout)
      }
    })

    observer.observe(parent || document.documentElement, {
      childList: true,
      subtree: true
    })

    tout = setTimeout(() => {
      if (!observer) return
      observer.disconnect()
      reject('Too long execution.')
    }, 3000)
  })

export const listen = (elem: string, parent: HTMLElement, cb: Function) => {
  const parentFind = parent.querySelectorAll(elem)
  if (parentFind.length) {
    cb(parentFind)
  }

  const observer = new MutationObserver(muts => {
    let executed = false
    let iter = muts.length
    while (iter--) {
      if (!muts[iter].addedNodes.length) continue
      executed = true
      break
    }

    if (!executed) return
    const lists = document.querySelectorAll(elem)
    if (!lists || !lists.length) return

    cb(lists)
  })

  observer.observe(parent || document.documentElement, {
    childList: true,
    subtree: true
  })

  return observer
}
