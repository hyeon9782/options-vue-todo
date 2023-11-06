import './assets/main.css'

import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueApexCharts)

app.use(Vuex)

app.mount('#app')

app.config.errorHandler = (err: any) => {
  console.log(err)
}
