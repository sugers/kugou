import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Newsong from '@/views/newSong/newsong'
import Rankdetail from '@/views/newSong/detail/rankdetail'
import Songlistdetail from '@/views/newSong/detail/sonlistdetail'
import Singerinfodetail from '@/views/newSong/detail/singerinfordetail'
import Singersong from '@/views/newSong/detail/singersong'
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
    },
    {
      path: '/singerinfo',
      name: 'Singerinfodetail',
      component: Singerinfodetail,
    },
    {
      path: '/singersong',
      name: 'Singersong',
      component:Singersong
    }
  ]
})
