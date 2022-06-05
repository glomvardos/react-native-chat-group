import { StatusBar } from 'expo-status-bar'
import AuthProvider from './context/auth'
import Routes from './Routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

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
      <StatusBar style='light' />
      <Routes />
    </AuthProvider>
  )
}

export default App
