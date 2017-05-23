<template>
  <nav>
    <router-link to="game">
      <div class="menu ripple">
        <i class="material-icons middle">play_arrow</i>
        <span class="middle">Play</span>
      </div>
    </router-link>
    <router-link to="settings">
      <div class="menu ripple">
        <i class="material-icons middle">settings</i>
        <span class="middle">Settings</span>
      </div>
    </router-link>
    <router-link to="score">
      <div class="menu ripple">
        <img class="middle"
             src="../assets/leaderboard.svg"
             title="Leaderboard"
             width="28.8">
        <span class="middle">Score</span>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'settings'
}

</script>

<style scoped>

</style>
