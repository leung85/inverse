<template>
  <section>
    <div v-show="isTutorial">
      <tutorial v-on:onemore="oneMoreTutorial"
                v-on:finish="finishTutorial"
                :topic="tutorialTopic"></tutorial>
    </div>
    <div v-show="!isTutorial">
      <div class="counter">
        <span>count: <span id="score">{{count}}</span></span>
        <span>highest: <span id="high_score">{{highest}}</span></span>
      </div>
      <timer :limit="timeLimit"
             ref="timer"
             v-on:timeout="timeout"></timer>
      <section id="topic"
               v-show="!isReady">
        <h1 id="question"
            v-bind:style="{fontFamily: font}">{{topic.question}}</h1>
        <div class="choice"
             v-bind:style="{fontFamily: font}"
             v-for="choice in topic.choices"
             v-on:click="checkAnswer(choice)">
          <div v-bind:class="{a : isPlaying}">
            {{choice}}
            <span v-show="isGameOver">
                                       <i class="material-icons middle green"
                                          v-if="isCorrect(choice)">done</i>
                                       <i class="material-icons middle red"
                                          v-else>clear</i>
                               </span>
          </div>
        </div>
      </section>
      <h1>{{message}}</h1>
      <div v-if="isGameOver && !submited">
        Name:
        <input id="name"
               type="text"
               name="name"
               v-model="name">
        <span class="menu ripple middle"
              v-on:click="send()">
                                <i class="material-icons middle">send</i>
                                <span class="middle">Send</span>
        </span>
      </div>
      <div class="menu ripple"
           v-if="isGameOver"
           v-on:click="replay">
        <i class="material-icons middle">replay</i>
        <span class="middle">Re-Play</span>
      </div>
    </div>
  </section>
</template>

<script>
import Timer from './Timer'
import Tutorial from './Tutorial'

const possible = 'abcdefghijklmnopqrstuvwxyz'
export default {
  name: 'game',
  data () {
    return {
      count: 0,
      highest: localStorage.highest,
      numOfchoices: 3,
      words: [],
      topic: {},
      isTutorial: localStorage.tutorial === '1',
      tutorialTopic: {},
      stage: 'ready',
      message: '',
      readyTime: 3,
      timeLimit: this.readyTime,
      font: localStorage.font,
      lock: false,
      name: localStorage.name,
      submited: false
    }
  },
  components: {
    'timer': Timer,
    'tutorial': Tutorial
  },
  created () {
    this.$firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
        // ...
      console.error('Error ' + errorCode + ': ' + errorMessage)
    })
  },
  mounted () {
    fetch('./static/words.json')
      .then(response => response.json())
      .then(json => {
        this.words = this.shuffle(json.words)
        if (this.isTutorial) {
          this.tutorialTopic = this.getTopic()
        } else {
          this.ready()
        }
      })
  },
  computed: {
    isPlaying () {
      return this.stage === 'playing'
    },
    isGameOver () {
      return this.stage === 'gameover'
    },
    isReady () {
      return this.stage === 'ready'
    }
  },
  methods: {
    ready () {
      this.submited = false
      this.stage = 'ready'
      this.message = 'Ready'
      this.timeLimit = this.readyTime
      this.count = 0
      this.$refs.timer.start()
    },
    start () {
      this.lock = false
      this.stage = 'playing'
      this.message = ''
      this.timeLimit = localStorage.timelimit
      this.next()
    },
    next () {
      this.$refs.timer.stop()
      this.$refs.timer.reset()
      this.topic = this.getTopic()
      this.$refs.timer.start()
      this.lock = false
    },
    gameOver () {
      this.stage = 'gameover'
      this.message = 'Game Over'
    },
    replay () {
      this.ready()
    },
    oneMoreTutorial () {
      this.tutorialTopic = this.getTopic()
    },
    finishTutorial () {
      this.isTutorial = false
      this.ready()
    },
    timeout () {
      switch (this.stage) {
        case 'ready':
          this.start()
          break
        case 'playing':
          this.gameOver()
          break
      }
    },
    getTopic () {
      let word = this.words.shift()
      let choices = this.genChoices(word)
      return {
        question: word,
        choices: choices
      }
    },
    checkAnswer (choice) {
      if (this.lock) {
        return
      }
      this.lock = true
      if (this.topic.question === choice) {
        this.count++
        this.next()
      } else {
        this.$refs.timer.stop()
        this.gameOver()
      }
      if (this.count > parseInt(localStorage.highest)) {
        this.highest = this.count
        localStorage.highest = this.highest
      }
    },
    isCorrect (word) {
      return (this.topic.question === word)
    },
    genChoices (word) {
      let choices = []
      for (var i = 0; i < this.numOfchoices; i++) {
        choices.push(word)
      }
      for (var j = 0; j < this.numOfchoices - 1; j++) {
        let index = Math.floor(Math.random() * this.numOfchoices)
        choices[index] = this.randomReplace(word)
      }
      return choices
    },
    randomReplace (word) {
      let char = ''
      let index = Math.floor(Math.random() * word.length)
      char += possible.charAt(Math.floor(Math.random() * possible.length))
      word = word.substr(0, index) + char + word.substr(index + 1)
      return word
    },
    shuffle (array) {
      let currentIndex = array.length
      let temporaryValue
      let randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      return array
    },
    send () {
      if (this.sending) {
        return
      }
      this.sending = true
      let leaderboard = this.$firebase.database().ref('leaderboard').push()
      let currentdate = new Date().toISOString()
      localStorage.lastSubmitScore = parseInt(this.count)
      leaderboard.set({
        name: this.name,
        score: parseInt(this.count),
        time: currentdate
      }).then(() => {
        this.message = 'submited'
        this.submited = true
        this.sending = false
      })
    }
  }
}

</script>
<style scoped>
#question {
  font-size: 2em
}

.choice {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-size: 1.5em;
  margin: 16px;
  border-radius: 15px
}

.red {
  color: red;
}

.green {
  color: green;
}

.a {
  text-transform: none;
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
  unicode-bidi: bidi-override;
  direction: rtl;
}

input#name {
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 2px solid black;
  width: 130px;
  font-family: inherit;
}
</style>
