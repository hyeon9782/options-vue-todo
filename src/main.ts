import './assets/main.css'

import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(Vuex)

app.mount('#app')

app.config.errorHandler = (err: any) => {
  console.log(err)
}
