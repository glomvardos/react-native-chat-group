import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import Colors from '../../constants/colors'
import useGetData from '../../hooks/useGetData'
import LoginScreen from '../../screens/Auth/LoginScreen'
import SignupScreen from '../../screens/Auth/SignupScreen'
import RoomScreen from '../../screens/Room/RoomScreen'
import { authUser } from '../../store/auth'
import DrawerStack from './DrawerStack'

export type RootStackParams = {
  Login: undefined
  Signup: undefined
  Home: undefined
  AllChannels: undefined
  Room: { channelId: number }
}

interface Props {
  isAuth: boolean
  logout?: () => void
}

const Stack = createNativeStackNavigator<RootStackParams>()

const NativeStack = ({ isAuth, logout }: Props) => {
  const setUser = useSetRecoilState<UserTypes | null>(authUser)

  const { data: user } = useGetData({ url: '/users/user', key: 'user' })

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user])

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bgBlack } }}
    >
      {isAuth && (
        <>
          <Stack.Screen name='Home' children={() => <DrawerStack logout={logout!} />} />
          <Stack.Screen
            name='Room'
            component={RoomScreen}
            options={{
              headerShown: true,
              headerTintColor: '#fff',
              headerStyle: { backgroundColor: Colors.textIconBg },
              headerShadowVisible: false,
            }}
          />
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
