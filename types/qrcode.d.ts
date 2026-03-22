declare module 'qrcode' {
  interface QRCodeToCanvasOptions {
    width?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
  }

  function toCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    options?: QRCodeToCanvasOptions
  ): Promise<void>

  export { toCanvas }
  export default { toCanvas }
}
