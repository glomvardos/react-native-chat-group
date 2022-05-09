import { View, Text, StyleSheet } from 'react-native'

interface Props {
  text: string
}

const TextTitle = ({ text }: Props) => {
  return <Text style={styles.text}>{text}</Text>
}

export default TextTitle

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 25,
    color: '#fff',
  },
})
