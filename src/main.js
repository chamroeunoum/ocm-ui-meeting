import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueQrcodeReader from "vue3-qrcode-reader"

import KhmerNumber from './plugins/KhmerNumber.js'

import NaiveUI from 'naive-ui'

import App from './App.vue'

import "tailwindcss/tailwind.css"

import "./app.css"

import store from './store'

import router from './router.js'

import HtmlToPaper from "./plugins/htmltopeper.js"

const pinia = createPinia()
const app = createApp(App)

// app.config.errorHandler = (err, vm, info) => {
//   // handle error
//   // `info` is a Vue-specific error info, e.g. which lifecycle hook
//   // the error was found in
// }

// app.config.warnHandler = function(msg, vm, trace) {
//   // `trace` is the component hierarchy trace
// }

app.use(VueAxios, axios)
app.use(VueQrcodeReader)
app.use(NaiveUI)
app.use(HtmlToPaper)
app.use(pinia)
app.use(KhmerNumber)
app.use(store)
app.use(router)
app.mount('#app')