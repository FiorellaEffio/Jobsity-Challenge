import Vue from 'vue'
import Router from 'vue-router'
import VideoEditor from '@/components/VideoEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VideoEditor',
      component: VideoEditor
    }
  ]
})
