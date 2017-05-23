<template>
  <main>
    <h1 class="tlt"
        v-show="isHomePage">
            <span>T</span><span>e</span><span>x</span><span>t</span>
            <span>I</span><span>n</span><span>v</span><span>e</span><span>r</span><span>s</span><span>e</span>
          </h1>
    <router-view></router-view>
    <router-link to="/"
                 v-if="!isHomePage">
      <div class="menu ripple">
        <i class="material-icons middle">subdirectory_arrow_left</i>
        <span class="middle">Back</span>
      </div>
    </router-link>
  </main>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    let titles = document.querySelectorAll('.tlt > span')
    setTimeout(() => this.changeTlt(titles), 1000)
    setInterval(() => this.changeTlt(titles), 4000)
  },
  computed: {
    isHomePage () {
      return this.$route.name === 'Menu'
    }
  },
  methods: {
    changeTlt (titles) {
      let count = 500
      titles.forEach((ele) => {
        setTimeout(() => {
          if (ele.className === 'rotateY180') {
            ele.className = ''
          } else {
            ele.className = 'rotateY180'
          }
        }, count += 150)
      })
    }
  }
}

</script>

<style>
h1.tlt>span {
  display: inline-block;
  -webkit-transition: transform 1.5s;
  transition: transform 1.5s;
}

.tlt {
  font-size: 2em;
  margin: 110px 0px 90px 0px;
  -webkit-transition: transform 0.5s;
  transition: transform 0.5s;
}

.rotateY180 {
  /*text-transform: none;*/
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
</style>
