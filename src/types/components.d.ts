import AppButtonVue from '@/components/AppButton.vue'
import AppDrawerVue from '@/components/AppDrawer.vue'
import AppLayoutVue from '@/components/AppLayout.vue'
import InputViewVue from '@/components/InputView.vue'
import AppLogoVue from '@/components/AppLogo.vue'
import SnackBarVue from '@/components/SnackBar.vue'
import BarChartVue from '@/components/charts/BarChart.vue'
import ProgressBarVue from '@/components/ProgressBar.vue'
import CardViewVue from '@/components/CardView.vue'
import CapsuleViewVue from '@/components/CapsuleView.vue'
import IconButtonVue from '@/components/IconButton.vue'
import BadgeViewVue from '@/components/BadgeView.vue'
import SearchInputVue from '@/components/SearchInput.vue'
import DataTableVue from '@/components/DataTable.vue'
import AppModalVue from '@/components/modals/AppModal.vue'
import BackdropLoaderVue from '@/components/BackdropLoader.vue'
import HeaderTextVue from '@/components/HeaderText.vue'
import AvatarViewVue from '@/components/AvatarView.vue'
import CardHeaderVue from '@/components/CardHeader.vue'
import AppCheckboxVue from '@/components/AppCheckbox.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'app-btn': typeof AppButtonVue
    'app-drawer': typeof AppDrawerVue
    'app-layout': typeof AppLayoutVue
    'app-input': typeof InputViewVue
    'app-logo': typeof AppLogoVue
    'app-snackbar': typeof SnackBarVue
    'app-bar-chart': typeof BarChartVue
    'app-progress-bar': typeof ProgressBarVue
    'app-card': typeof CardViewVue
    'app-capsule': typeof CapsuleViewVue
    'app-icon-btn': typeof IconButtonVue
    'app-badge': typeof BadgeViewVue
    'app-search-input': typeof SearchInputVue
    'app-data-table': typeof DataTableVue
    'app-modal': typeof AppModalVue
    'app-backdrop-loader': typeof BackdropLoaderVue
    'app-header-text': typeof HeaderTextVue
    'app-avatar': typeof AvatarViewVue
    'app-card-header': typeof CardHeaderVue
    'app-checkbox': typeof AppCheckboxVue
  }
}
