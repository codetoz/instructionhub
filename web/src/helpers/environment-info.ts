import { UAParser } from 'ua-parser-js'

export const UA =
  // eslint-disable-next-line
  navigator.userAgent || navigator.vendor || (window as any).opera

const parser = new UAParser(UA)

const { name: OS_NAME } = parser.getOS()
const { type: DEVICE_TYPE } = parser.getDevice()

export const IS_IOS =
  OS_NAME === 'iOS' ||
  (window.orientation !== undefined && OS_NAME === 'Mac OS') // for iPadOS

export const isTouchAvailable = window.matchMedia('(pointer: coarse)').matches

export const isPhoneOrTablet =
  IS_IOS || DEVICE_TYPE === 'mobile' || DEVICE_TYPE === 'tablet'
