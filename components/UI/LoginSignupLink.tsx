import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Pressable, StyleSheet, View } from 'react-native'
import { RootStackParams } from '../../routes/navigators/NativeStack'
import MyAppText from './MyAppText'

interface Props {
  text: string
  route: 'Login' | 'Signup'
}

const LoginSignupLink = ({ text, route }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  return (
    <View style={styles.container}>
      <MyAppText propStyles={styles.text}>{text}</MyAppText>
      <Pressable onPress={() => navigation.navigate(route)}>
        <MyAppText propStyles={styles.btnText}>{route}</MyAppText>
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
