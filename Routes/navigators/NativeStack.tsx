import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/Auth/LoginScreen'
import SignupScreen from '../../screens/Auth/SignupScreen'
import RoomScreen from '../../screens/Room/RoomScreen'
import DrawerStack from './DrawerStack'

export type RootStackParams = {
  Login: undefined
  Signup: undefined
  Home: undefined
  Room: { channelId: number }
}

interface Props {
  isAuth: boolean
  logout?: () => void
}

const Stack = createNativeStackNavigator<RootStackParams>()

const NativeStack = ({ isAuth, logout }: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth && (
        <>
          <Stack.Screen name='Home' children={() => <DrawerStack logout={logout!} />} />
          <Stack.Screen name='Room' component={RoomScreen} options={{ headerShown: true }} />
        </>
      )}
      {!isAuth && (
        <>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default NativeStack
