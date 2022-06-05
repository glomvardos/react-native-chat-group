import { NavigationContainer } from '@react-navigation/native'
import { useAuthContext } from '../context/auth'
import AuthenticatedStack from './AuthenticatedStack'
import UnAuthenticatedStack from './UnAuthenticatedStack'

const Routes = () => {
  const { token } = useAuthContext()
  return (
    <NavigationContainer>
      {token && <AuthenticatedStack />}
      {!token && <UnAuthenticatedStack />}
    </NavigationContainer>
  )
}

export default Routes
