import Vue from 'vue'
import Router from 'vue-router'
import VideoPlayer from '@/components/VideoPlayer'
import Clip from '@/components/Clip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VideoPlayer',
      component: VideoPlayer
    },
    {
      path: '/',
      name: 'Clip',
      component: Clip
    },

  ]
})
