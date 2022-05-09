import { StyleSheet, Text } from 'react-native'

interface Props {
  text: string
}

const TextFieldLabel = ({ text }: Props) => {
  return <Text style={styles.text}>{text}</Text>
}

export default TextFieldLabel

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
})
