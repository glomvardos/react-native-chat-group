import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../../Routes/UnAuthenticatedStack'

interface Props {
  text: string
  route: 'Login' | 'Signup'
}

const LoginSignupLink = ({ text, route }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Don't have an account?</Text>
      <Pressable onPress={() => navigation.navigate(route)}>
        <Text style={styles.btnText}>{route}</Text>
      </Pressable>
    </View>
  )
}

export default LoginSignupLink

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
  },
  btnText: {
    color: '#1C9BEF',
    marginLeft: 4,
  },
})
