import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBEgaTGYQOUcf_1rYm3GjBOt4fqkTbpXNA',
  authDomain: 'inverse-cb4f5.firebaseapp.com',
  databaseURL: 'https://inverse-cb4f5.firebaseio.com',
  storageBucket: 'inverse-cb4f5.appspot.com',
  messagingSenderId: '715071482302'
}
firebase.initializeApp(config)

const VueFirebase = {
  install (Vue, options) {
    Vue.prototype.$firebase = firebase
  }

}
export default VueFirebase
