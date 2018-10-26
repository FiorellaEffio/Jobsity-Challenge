// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/storage'

Vue.use(VueFire)
firebase.initializeApp({
    apiKey: "AIzaSyDnlZbLY3lVtMGrv97W_sLhAXHkMQwPv4M",
    authDomain: "jobsity-challenge.firebaseapp.com",
    databaseURL: "https://jobsity-challenge.firebaseio.com",
    projectId: "jobsity-challenge",
    storageBucket: "jobsity-challenge.appspot.com",
    messagingSenderId: "593566901515"
  })

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = firebase.storage();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
