import { createApp } from 'vue'

import App from './App.vue'
import registerPlugins from './plugins/registerPlugins'

//fonts
import '@fontsource/barlow-condensed'

import './styles/global.css'
import registerComponent from './components'

const app = createApp(App)

registerPlugins(app)
registerComponent(app)

app.mount('#app')
