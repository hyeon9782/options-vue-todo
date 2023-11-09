import './assets/main.css'

import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

async function deferRender() {
  const { worker } = await import('@/mocks/browser')
  worker.start()
}

deferRender().then(() => {
  const app = createApp(App)

  app.use(router)

  app.component('font-awesome-icon', FontAwesomeIcon)

  app.use(VueApexCharts)

  app.use(store)

  app.mount('#app')

  app.config.errorHandler = (err: any) => {
    console.log(err)
  }
})
