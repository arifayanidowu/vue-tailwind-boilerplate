import type { App } from 'vue'
import AppDrawer from './AppDrawer.vue'
import AppLayoutVue from './AppLayout.vue'
import InputView from './InputView.vue'
import AppLogo from './AppLogo.vue'
import AppButton from './AppButton.vue'
import SnackBar from './SnackBar.vue'

export default function registerComponent(app: App): void {
  app
    .component('app-drawer', AppDrawer)
    .component('app-layout', AppLayoutVue)
    .component('app-input', InputView)
    .component('app-logo', AppLogo)
    .component('app-btn', AppButton)
    .component('app-snackbar', SnackBar)
}
