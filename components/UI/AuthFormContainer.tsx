import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'
import TextTitle from './TextTitle'

interface Props {
  children: React.ReactNode
}

const AuthFormContainer = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <TextTitle text='Chat Group' />
      <View style={styles.form}>{children}</View>
    </View>
  )
}

export default AuthFormContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 30,
    backgroundColor: Colors.darkGray,
    width: '85%',
    borderRadius: 10,
  },
})
