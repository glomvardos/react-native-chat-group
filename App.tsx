import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import HomeScreen from './screens/HomeScreen'

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <HomeScreen />
    </>
  )
}
