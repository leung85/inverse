import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
import Settings from '@/components/Settings'
import Game from '@/components/Game'
import Score from '@/components/Score'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  }

  ]
})
