import { StyleSheet } from 'react-native'
import MyAppText from './MyAppText'

interface Props {
  text: string
}

const TextFieldLabel = ({ text }: Props) => {
  return (
    <MyAppText fontWeight='bold' propStyles={styles.text}>
      {text}
    </MyAppText>
  )
}

export default TextFieldLabel

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 5,
  },
})
