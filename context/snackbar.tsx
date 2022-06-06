import { createContext, useContext, useReducer } from 'react'
import Colors from '../constants/colors'
import { SnackbarStates } from '../enums/snackbar'
import { SnackbarAction, SnackbarState } from '../interfaces/snackbar'

interface Props {
  children: React.ReactNode
}

interface SnackbarTypes {
  snackbarState: SnackbarState
  dispatch: React.Dispatch<SnackbarAction>
}

const snackbarContext = createContext<SnackbarTypes>({
  snackbarState: {
    showSnackbar: false,
    message: '',
    color: '',
    duration: 0,
  },
  dispatch: () => null,
})

const initialState: SnackbarState = {
  showSnackbar: false,
  message: '',
  color: '',
  duration: 3000,
}

const reducer = (state: SnackbarState, action: SnackbarAction) => {
  switch (action.type) {
    case SnackbarStates.SUCCESS:
      return {
        showSnackbar: true,
        color: Colors.success,
        ...action.payload,
      }
    case SnackbarStates.ERROR:
      return {
        showSnackbar: true,
        color: Colors.error,
        ...action.payload,
      }
    case SnackbarStates.CLOSE:
      return {
        ...state,
        showSnackbar: false,
      }
    default:
      return state
  }
}

export const useSnackbarContext = (): SnackbarTypes => useContext(snackbarContext)

const SnackbarProvider = ({ children }: Props) => {
  const [snackbarState, dispatch] = useReducer(reducer, initialState)
  const ctx = {
    snackbarState,
    dispatch,
  }
  return <snackbarContext.Provider value={ctx}>{children}</snackbarContext.Provider>
}

export default SnackbarProvider
