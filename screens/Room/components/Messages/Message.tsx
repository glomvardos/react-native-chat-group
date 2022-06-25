import { StyleSheet, Text, View } from 'react-native'

interface Props {
  message: MessageTypes
}

const Message = ({ message }: Props) => {
  return (
    <View>
      <Text style={styles.text}>{message.message}</Text>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
})
