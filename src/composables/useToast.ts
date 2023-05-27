import { reactive, toRefs } from 'vue'

type TColor = 'danger' | 'success' | 'warning' | 'plain'

export const useToast = () => {
  const snackbar = reactive<{
    open: boolean
    message: string
    color: TColor
  }>({
    open: false,
    message: '',
    color: 'success'
  })

  const openSnackbar = (message: string, type: TColor) => {
    snackbar.open = true
    snackbar.message = message
    snackbar.color = type as TColor
  }

  const closeSnackbar = () => {
    snackbar.open = false
  }

  return {
    ...toRefs(snackbar),
    openSnackbar,
    closeSnackbar
  }
}
