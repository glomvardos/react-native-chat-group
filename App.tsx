import { Suspense, useEffect } from 'react'
import { Text, LogBox, AppState, AppStateStatus } from 'react-native'
import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'
import { StatusBar } from 'expo-status-bar'
import Routes from './routes/Routes'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'

SplashScreen.preventAutoHideAsync()
  .then(_ => {})
  .catch()

const customFonts = {
  'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
}

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const App = () => {
  const loadFontAsync = async () => {
    await Font.loadAsync(customFonts)
    setTimeout(async () => {
      await SplashScreen.hideAsync()
    }, 2000)
  }

  useEffect(() => {
    loadFontAsync()
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
        </RecoilRoot>
      </Suspense>
    </SWRConfig>
  )
}

export default App
