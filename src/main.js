import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import i18n from '@/plugins/i18n'

import '@/assets/css/app.scss'
import '@/plugins'
import '@/components'
import '@/styles/app.scss'

Vue.config.productionTip = false

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
