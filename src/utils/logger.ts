export default (...inputs: unknown[]): void => {
  inputs.map((str: unknown) => {
    if (typeof str === 'object') {
      str = JSON.stringify(str)
    }
  })

  console.log(
    `🔧 %c${new Date().toLocaleTimeString('en-US')} %c:`,
    `color: #888;`,
    `color: unset;`,
    ...inputs
  )
}
