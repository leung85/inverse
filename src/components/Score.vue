<template>
  <section>
    <h1>Score</h1>
    <div>{{message}}</div>
    <h4>Top 50</h4>
    <ul>
      <li v-if="loading">Loading...</li>
      <li v-else
          v-for="(leader, index) in leaders">
        <span>{{index + 1}}. {{leader.name}}  - {{leader.score}}</span>
      </li>
    </ul>
  </section>
</template>
<script>

export default {
  name: 'score',
  data () {
    return {
      leaders: [],
      loading: true,
      message: 'Your highest Score: ' + localStorage.highest
    }
  },
  created () {
    this.ref = this.$firebase.database().ref('leaderboard')// this.$firebaseDb.ref('leaderboard')
    this.ref.orderByChild('score').limitToLast(50)
      .on('value', (snapshot) => {
        let leaders = []
        snapshot.forEach((childSnapshot) => {
          leaders.unshift(childSnapshot.val())
        })
        this.leaders = leaders
        this.loading = false
      })
  },
  destroyed () {
    this.ref.off()
  }
}
</script>
<style scoped>
ul {
  text-align: center;
  padding: 10px;
  list-style-type: none;
  height: 250px;
  overflow: hidden;
  overflow-y: auto;
  margin: 0px;
  margin-bottom: 16px;
}
</style>
