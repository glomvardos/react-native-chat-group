import { StyleSheet } from 'react-native'
import MyAppText from './MyAppText'

interface Props {
  text: string
}

const TextTitle = ({ text }: Props) => {
  return <MyAppText propStyles={styles.text}>{text}</MyAppText>
}

export default TextTitle

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 25,
    color: '#fff',
  },
})
