import { NavigationContainer } from '@react-navigation/native'
import { useAuthContext } from '../context/auth'
import AuthenticatedStack from './AuthenticatedStack'
import UnAuthenticatedStack from './UnAuthenticatedStack'

const Routes = () => {
  const { token, logout } = useAuthContext()
  return (
    <NavigationContainer>
      {token && <AuthenticatedStack logout={logout} />}
      {!token && <UnAuthenticatedStack />}
    </NavigationContainer>
  )
}

export default Routes
