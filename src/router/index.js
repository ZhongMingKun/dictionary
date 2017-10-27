import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search'
import Side from '../components/BuShouList'
import Spell from '../components/PinyinList'
import History from '../components/History'
import Sidedetail from '../components/Sidedetail'
import Spelldetail from '../components/Spelldetail'
import Fontdetail from '../components/Fontdetail'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {path: '/search', name: 'Search', component: Search},
    {path: '/side', name: 'Side', component: Side},
    {path: '/spell', name: 'Spell', component: Spell},
    {path: '/history', name: 'History', component: History},
    {
      path: '/sidedetail',
      name: 'Sidedetail',
      component: Sidedetail,
      children: [
        {path: '/fontdetail', component: Fontdetail}
      ]
    },
    {
      path: '/spelldetail',
      name: 'Spelldetail',
      component: Spelldetail,
      children: [
        {path: '/fontdetail', component: Fontdetail}
      ]
    }
  ]
})
