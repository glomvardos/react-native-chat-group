import { Suspense, useEffect } from 'react'
import { Text, LogBox, AppState, AppStateStatus } from 'react-native'
import { RecoilRoot } from 'recoil'
import { StatusBar } from 'expo-status-bar'
import Routes from './routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
import { SWRConfig } from 'swr'
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
    <SWRConfig
      value={{
        provider: () => new Map(),
        isVisible: () => true,
        initFocus(callback) {
          let appState = AppState.currentState

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
              callback()
            }
            appState = nextAppState
          }

          const subscription: any = AppState.addEventListener('change', onAppStateChange)
          return () => {
            subscription.remove()
          }
        },
      }}
    >
      <Suspense fallback={<Text>Loading...</Text>}>
        <RecoilRoot>
          <StatusBar style='light' />
          <Routes />
          {/* <CustomSnackbar /> */}
        </RecoilRoot>
      </Suspense>
    </SWRConfig>
  )
}

export default App
