import { StatusBar } from 'expo-status-bar'
import AuthProvider from './context/auth'
import Routes from './Routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import SnackbarProvider from './context/snackbar'
import CustomSnackbar from './components/UI/CustomSnackbar'

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn)

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync()
    }, 2000)
  }, [])

  return (
    <AuthProvider>
      <SnackbarProvider>
        <StatusBar style='light' />
        <Routes />
        <CustomSnackbar />
      </SnackbarProvider>
    </AuthProvider>
  )
}

export default App
