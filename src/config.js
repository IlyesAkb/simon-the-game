export default {
  buttons: [
    {
      id: 1,
      color: '#c82727',
      sound: 'https://raw.githubusercontent.com/kellyk/javascript-simon/master/sounds/1.mp3',
      active: false
    },
    {
      id: 2,
      color: '#2c47cd',
      sound: 'https://raw.githubusercontent.com/kellyk/javascript-simon/master/sounds/2.mp3',
      active: false
    },
    {
      id: 3,
      color: '#39c32d',
      sound: 'https://raw.githubusercontent.com/kellyk/javascript-simon/master/sounds/3.mp3',
      active: false
    },
    {
      id: 4,
      color: '#cbba2b',
      sound: 'https://raw.githubusercontent.com/kellyk/javascript-simon/master/sounds/4.mp3',
      active: false
  
    },
  ],
  difficulty: [
    {name: 'Легкая', speed: 1500},
    {name: 'Средняя', speed: 1000},
    {name: 'Тяжелая', speed: 400},
  ],
  animationTime: 400,
  messages: {
    watch: 'Запомни последовательность',
    failed: 'Проиграл',
    repeat: 'Повтори последовательность',
  }
}