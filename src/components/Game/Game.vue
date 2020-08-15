<template>
  <div class="game">

    <div class="game__field">

      <div
        v-for="button in buttons"
        class="game__button"
        :style="{background: button.color}"
        :class="{active: button.active}"
        @mousedown="mouseDownHandler(button)"
        @mouseup="mouseUpHandler(button)"
      ></div>
    </div>

    <div class="menu">


      <div class="menu__level">
        <h4>Уровень: {{ level }}</h4>
      </div>

      <div class="menu__message">
        <span>{{ message }}</span>
      </div>

      <div
        class="menu__start-button"
        @click="start"
        :class="{disabled: playing, active: !playing}"
      >
        Старт
      </div>

      <h4>Сложность:</h4>
      <ul class="menu__difficulty">
        <li v-for="item in allDifficultyLevels">
          <label>
            <input
              type="radio"
              name="difficulty"
              :value="item.speed"
              :disabled="playing"
              v-model="difficulty"
            />
            {{ item.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { delay, prepareButtons } from './game.functions'

export default {
  name: 'Game',
  data: () => ({
    buttons: [],
    activeButton: null,
    level: 1,
    buttonsOrder: [],
    playerTurn: false,
    difficulty: config.difficulty[0].speed,
    stepNumber: 0,
    playing: false,
    message: ''
  }),
  computed: {
    allDifficultyLevels: () => config.difficulty
  },
  methods: {
    async play() {
      this.message = config.messages.watch
      await delay(1000)
      for (let i = 0; i <= this.level; i++) {
        if (i < this.level) {
          const button = this.getRandomButton()
          this.buttonsOrder.push(button.id)

          await button.sound.play()
          button.active = true

          await delay(config.animationTime)
          button.active = false

          await delay(this.difficulty)
        } else {
          this.playerTurn = true
          this.message = config.messages.repeat
          break
        }
      }
    },
    mouseDownHandler(button) {
      if (this.playerTurn) {
        if (this.activeButton) {
          this.activeButton.sound.pause()
          this.activeButton.sound.currentTime = 0
        }
        button.active = true
        button.sound.play()
        this.activeButton = button
      }
    },
    mouseUpHandler(button) {
      if (this.playerTurn) {
        if (button.id === this.buttonsOrder[this.stepNumber]) {
          button.active = false
          this.stepNumber++
        } else {
          this.playing = false
          this.playerTurn = false
          button.active = false
          this.message = config.messages.failed
          return
        }

        if (this.stepNumber === this.buttonsOrder.length) {
          this.activeButton = null
          this.nextLevel()
        }
      }
    },
    nextLevel() {
      this.playerTurn = false
      this.stepNumber = 0
      this.level++
      this.buttonsOrder = []
      this.play()
    },
    reset() {
      this.buttonsOrder = []
      this.stepNumber = 0
      this.playing = true
      this.playerTurn = false
      this.level = 1
    },
    start() {
      if (!this.playing) {
        this.playing = true
        this.reset()
        this.play()
      }
    },
    getRandomButton() {
      const buttonId = Math.ceil(Math.random() * config.buttons.length)
      return this.buttons.find(button => button.id === buttonId)
    }
  },
  mounted() {
    this.buttons = prepareButtons()
  }
}
</script>

<style scoped lang="sass">
ul
  padding: 0
  margin: 0
  list-style: none

.menu
  text-align: left

  &__message
    height: 16px
    font-size: 16px
    font-weight: bold
    margin: 10px 0
    position: relative

    & span
      position: absolute
      left: 0
      bottom: 0
      white-space: nowrap

  &__start-button
    line-height: 30px
    text-align: center
    border: 2px solid
    font-weight: bold
    margin: 10px 0

    &.disabled
      color: gray
      border-color: gray

    &.active
      cursor: pointer
      color: black
      border-color: black

      &:hover
        color: red
        border-color: red

      &:active
        color: black
        border-color: black

.game
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  align-items: center

  &__field
    height: 308px
    width: 308px
    display: flex
    flex-wrap: wrap
    margin-right: 1rem

  &__button
    height: 150px
    width: 150px

    &:first-of-type.active,
    &:nth-of-type(2).active,
    &:nth-of-type(3).active,
    &:last-of-type.active
      filter: brightness(1.5)

    &:first-of-type:hover,
    &:nth-of-type(2):hover,
    &:nth-of-type(3):hover,
    &:last-of-type:hover
      border-color: black

    &:first-of-type
      border-radius: 100% 0 0 0
      border-top: 4px solid white
      border-left: 4px solid white
    &:nth-of-type(2)
      border-radius: 0 100% 0 0
      border-top: 4px solid white
      border-right: 4px solid white
    &:nth-of-type(3)
      border-radius: 0 0 0 100%
      border-bottom: 4px solid white
      border-left: 4px solid white
    &:last-of-type
      border-radius: 0 0 100% 0
      border-right: 4px solid white
      border-bottom: 4px solid white

</style>