import config from '@/config'

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function prepareButtons() {
  return config.buttons.map(button => {
    button.sound = new Audio(button.sound)
    return button
  })
}