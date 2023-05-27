import type { App } from 'vue'
import AppDrawer from './AppDrawer.vue'
import AppLayoutVue from './AppLayout.vue'
import InputView from './InputView.vue'
import AppLogo from './AppLogo.vue'
import AppButton from './AppButton.vue'
import SnackBar from './SnackBar.vue'
import BarChart from './charts/BarChart.vue'
import ProgressBar from './ProgressBar.vue'
import CardView from './CardView.vue'
import CapsuleViewVue from './CapsuleView.vue'
import IconButton from './IconButton.vue'
import BadgeView from './BadgeView.vue'
import SearchInput from './SearchInput.vue'
import DataTable from './DataTable.vue'
import AppModal from './modals/AppModal.vue'
import BackdropLoader from './BackdropLoader.vue'
import HeaderText from './HeaderText.vue'
import AvatarView from './AvatarView.vue'
import CardHeader from './CardHeader.vue'
import AppCheckbox from './AppCheckbox.vue'

export default function registerComponent(app: App): void {
  app
    .component('app-drawer', AppDrawer)
    .component('app-layout', AppLayoutVue)
    .component('app-input', InputView)
    .component('app-logo', AppLogo)
    .component('app-btn', AppButton)
    .component('app-snackbar', SnackBar)
    .component('app-bar-chart', BarChart)
    .component('app-progress-bar', ProgressBar)
    .component('app-card', CardView)
    .component('app-card-header', CardHeader)
    .component('app-capsule', CapsuleViewVue)
    .component('app-icon-btn', IconButton)
    .component('app-badge', BadgeView)
    .component('app-search-input', SearchInput)
    .component('app-data-table', DataTable)
    .component('app-modal', AppModal)
    .component('app-backdrop-loader', BackdropLoader)
    .component('app-header-text', HeaderText)
    .component('app-avatar', AvatarView)
    .component('app-checkbox', AppCheckbox)
}
