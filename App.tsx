import { Suspense, useEffect } from 'react'
import { Text, LogBox } from 'react-native'
import { RecoilRoot } from 'recoil'
import { StatusBar } from 'expo-status-bar'
import Routes from './routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
// import CustomSnackbar from './components/UI/CustomSnackbar'

SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn)

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync()
    }, 2000)
  }, [])

  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <RecoilRoot>
        <StatusBar style='light' />
        <Routes />
        {/* <CustomSnackbar /> */}
      </RecoilRoot>
    </Suspense>
  )
}

export default App
