import './assets/main.css'

import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import { store } from './store'

async function deferRender() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('@/mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

deferRender().then(() => {
  const app = createApp(App)

  app.use(router)

  app.use(VueApexCharts)

  app.use(store)

  app.mount('#app')

  app.config.errorHandler = (err: any) => {
    console.log(err)
  }
})
