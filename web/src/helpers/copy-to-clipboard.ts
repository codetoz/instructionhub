import { IS_IOS } from './environment-info'

type CopyToClipboard = (text: string) => Promise<void>
type CopyToClipboardFactory = (
  window: Window,
  document: Document,
) => CopyToClipboard

const textCopyEl = document.createElement('textArea') as HTMLTextAreaElement
textCopyEl.setAttribute('readonly', '')
textCopyEl.tabIndex = -1
textCopyEl.style.position = 'absolute!important'
textCopyEl.style.width = '0'
textCopyEl.style.height = '0'
textCopyEl.style.overflow = 'hidden'
textCopyEl.style.clip = 'rect(0, 0, 0, 0)'
textCopyEl.style.zIndex = '-1'

const copyToClipboardFactory: CopyToClipboardFactory = (window, document) => {
  const prepareCopyEl = (text: string) => {
    textCopyEl.value = text
    document.body.appendChild(textCopyEl)
  }

  const selectText = () => {
    if (IS_IOS) {
      const range = document.createRange()
      range.selectNodeContents(textCopyEl)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    } else {
      textCopyEl.select()
    }
    textCopyEl.setSelectionRange(0, 999999)
  }

  const copyTextToClipboard = () => {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      return navigator.clipboard.writeText(textCopyEl.value)
    } else {
      const successful = document.execCommand('copy')
      document.body.removeChild(textCopyEl)
      if (!successful) {
        throw new Error('copy command was unsuccessful')
      }
    }
  }

  return async text => {
    prepareCopyEl(text)
    selectText()
    copyTextToClipboard()
  }
}

// TODO: Doesn't work in Samsung Internet
export const copyToClipboard = copyToClipboardFactory(window, document)
