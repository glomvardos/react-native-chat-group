import { StyleSheet, Text, View } from 'react-native'

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    padding: 20,
  },
})
