import { SnackbarStates } from '../enums/snackbar'

export interface SnackbarAction {
  type: SnackbarStates
  payload: {
    message: string
    duration?: number
  }
}

export interface SnackbarState {
  showSnackbar: boolean
  message: string
  color: string
  duration?: number
}
