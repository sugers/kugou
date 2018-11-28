import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Newsong from '@/views/newSong/newsong'
import Rankdetail from '@/views/newSong/detail/rankdetail'
import Songlistdetail from '@/views/newSong/detail/sonlistdetail'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'Newsong',
      component:Newsong
    },
    {
      path: '/rankdetail',
      name: 'Rankdetail',
      component:Rankdetail
    },
    {
      path: '/sonlistdetail',
      name: 'Songlistdetail',
      component:Songlistdetail
    }
  ]
})
