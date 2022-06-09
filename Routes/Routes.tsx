import { NavigationContainer } from '@react-navigation/native'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { clearToken, token } from '../store/auth'
import AuthenticatedStack from './AuthenticatedStack'
import UnAuthenticatedStack from './UnAuthenticatedStack'

const Routes = () => {
  const accessToken = useRecoilValue(token)
  const logout = useSetRecoilState(clearToken)

  return (
    <NavigationContainer>
      {accessToken && <AuthenticatedStack logout={() => logout(null)} />}
      {!accessToken && <UnAuthenticatedStack />}
    </NavigationContainer>
  )
}

export default Routes
