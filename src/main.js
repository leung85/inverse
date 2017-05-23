// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueFire from 'vuefire'
// import firebase from 'firebase'
import VueFirebase from './plugin/vue-firebase'

// Vue.use(VueFire)
// Vue.config.productionTip = false
// var config = {
//   apiKey: 'AIzaSyBEgaTGYQOUcf_1rYm3GjBOt4fqkTbpXNA',
//   authDomain: 'inverse-cb4f5.firebaseapp.com',
//   databaseURL: 'https://inverse-cb4f5.firebaseio.com',
//   storageBucket: 'inverse-cb4f5.appspot.com',
//   messagingSenderId: '715071482302'
// }
// var firebaseApp = firebase.initializeApp(config)

// var db = firebaseApp.database()
Vue.use(VueFirebase)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      if (window.ga) {
        window.ga('set', 'page', to.path)
        window.ga('send', 'pageview')
      }
    }
  }
})

if (!localStorage.font) {
  localStorage.setItem('font', 'monospace')
}
if (!localStorage.highest) {
  localStorage.setItem('highest', 0)
}
if (!localStorage.name) {
  localStorage.setItem('name', 'Anonymous')
}
if (!localStorage.lastSubmitScore) {
  localStorage.setItem('lastSubmitScore', 0)
}
if (!localStorage.last) {
  localStorage.setItem('last', 0)
}
if (!localStorage.mode) {
  localStorage.setItem('mode', '0')
}
if (!localStorage.timelimit) {
  localStorage.setItem('timelimit', 4)
}

if (!localStorage.tutorial) {
  localStorage.setItem('tutorial', 1)
}
