<template>
  <section>
    <h1>Tutorial</h1>
    <h2>{{message}}</h2>
    <timer limit="10"
           v-show="withTImer"
           v-on:timeout="timeout"
           ref="timer"></timer>
    <!-- Playing -->
    <section id="playing">
      <h1 id="question"
          v-bind:style="{fontFamily: font}">{{topic.question}}</h1>
      <div class="choice"
           v-bind:style="{fontFamily: font}"
           v-for="choice in topic.choices"
           v-on:click="checkAnswer(choice)">
        <div class="a">
          {{choice}}
          <!--<i class="material-icons middle green"
                               v-if="isCorrect(choice)">done</i>
                            <i class="material-icons middle red"
                               v-else>clear</i>-->
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Timer from './Timer'
export default {
  name: 'tutorial',
  props: ['topic'],
  data () {
    return {
      message: 'Find the inverse of below word',
      withTImer: false,
      stage: 1,
      finish: false,
      font: localStorage.font,
      lock: false
    }
  },

  components: {
    'timer': Timer
  },
  created () { },
  mounted () {

  },
  methods: {
    step1 () {
      this.$emit('onemore')
      this.lock = false
    },
    step2 () {
      this.$refs.timer.stop()
      this.stage = 2
      this.$emit('onemore')
      this.withTImer = true
      this.$refs.timer.reset()
      this.$refs.timer.start()
      this.lock = false
    },
    step3 () {
      this.message = 'Exellent!! Lets Begin.'
      localStorage.tutorial = 0
      setTimeout(() => {
        this.$emit('finish')
      }, 1500)
    },
    timeout () {
      this.message = 'Oh! Timeout. Try again'
      this.step2()
    },
    checkAnswer (choice) {
      if (this.lock) {
        return
      }
      this.lock = true
      if (this.topic.question === choice) {
        switch (this.stage) {
          case 1:
            this.message = 'Well Done! Lets try with time limt'
            this.step2()
            break
          case 2:
            this.$refs.timer.stop()
            this.step3()
            break
        }
      } else {
        this.message = 'Oh! Wrong Try again'
        switch (this.stage) {
          case 1:
            this.step1()
            break
          case 2:
            this.step2()
            break
        }
      }
    },
    isCorrect (word) {
      return (this.topic.question === word)
    }
  },
  watch: {
    topic: function (val) {

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
</style>
