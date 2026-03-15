import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

// 1. IMPORTAR ESTILOS DE Tailwind
import './assets/main.css'

// 2. ESTILOS DE PRIMEVUE

import 'primevue/resources/themes/saga-blue/theme.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.mount('#app')
