import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const UnAuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  )
}

export default UnAuthenticatedStack
