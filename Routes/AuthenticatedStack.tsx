import { DrawerActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NativeStack from './navigators/NativeStack'

interface Props {
  logout: () => void
}

const AuthenticatedStack = ({ logout }: Props) => {
  const navigate = useNavigation()

  const onLogout = async () => {
    await AsyncStorage.removeItem('token')
    navigate.dispatch(DrawerActions.closeDrawer())
    logout()
  }

  return <NativeStack isAuth={true} logout={onLogout} />
}

export default AuthenticatedStack
