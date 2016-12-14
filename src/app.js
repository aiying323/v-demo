var Vue = require('vue')
var App = require('./app.vue')

new Vue({
  el: '#app',
  render: (createElement) => createElement(App)
})