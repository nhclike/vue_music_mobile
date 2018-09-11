import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/test'
import Recommend from '@/components/recommend/recommend'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import SingerDetail from '@/components/singer-detail/singer-detail'
import Disc from '@/components/disc/disc'
import TopList from '@/components/top-list/top-list'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      component: Recommend,
      children:[{
        path:'disc',
        component:Disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children:[{
        path:'detail',
        component:SingerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children:[{
        path:'toplist',
        component:TopList
      }]
    },
    {
      path: '/search',
      component: Search,
      children:[{
        path:'detail',
        component:SingerDetail
      }]
    }

  ]
})
