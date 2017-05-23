<template>
  <h1 id="timer">{{time}}</h1>
</template>
<script>
export default {
  name: 'timer',
  props: ['limit'],
  data () {
    return {
      time: this.limit
    }
  },
  beforeDestroy () {
    this.stop()
  },
  methods: {
    start () {
      this.interval = setInterval(() => {
        this.time -= 1
        if (this.time === 0) {
          this.stop()
          this.$emit('timeout')
        }
      }, 1000)
    },
    reset () {
      this.time = this.limit
    },
    stop () {
      if (this.interval != null) {
        clearInterval(this.interval)
      }
    }
  },
  watch: {
    limit: function (val) {
      this.reset()
    }
  }
}
</script>
<style scoped>
#timer {
  margin: 0px
}
</style>
