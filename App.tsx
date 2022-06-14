import { StatusBar } from 'expo-status-bar'
import Routes from './Routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
import { Suspense, useEffect } from 'react'
import SnackbarProvider from './context/snackbar'
import CustomSnackbar from './components/UI/CustomSnackbar'
import { RecoilRoot } from 'recoil'
import { Text } from 'react-native'

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
    <Suspense fallback={<Text>Loading...</Text>}>
      <RecoilRoot>
        <SnackbarProvider>
          <StatusBar style='light' />
          <Routes />
          <CustomSnackbar />
        </SnackbarProvider>
      </RecoilRoot>
    </Suspense>
  )
}

export default App
