import { createPinia } from 'pinia'
import type { App } from 'vue'
import { VueFire, VueFireFirestoreOptionsAPI, VueFireAuth } from 'vuefire'
import router from '../router'
import { app as firebaseApp } from '@/database'

export default function registerPlugins(app: App): void {
  app.use(createPinia())
  app.use(router).use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth(), VueFireFirestoreOptionsAPI()]
  })
}
