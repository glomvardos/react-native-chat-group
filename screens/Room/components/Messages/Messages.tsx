import { useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Message from './Message'

interface Props {
  messages: MessageTypes[]
}

const Messages = ({ messages = [] }: Props) => {
  // Revese the messages array without using .reverse()
  const reversedMessages = useMemo(() => {
    const reversedMessages = []
    for (let i = messages.length - 1; i >= 0; i--) {
      reversedMessages.push(messages[i])
    }
    return reversedMessages
  }, [messages])

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        inverted={true}
        data={reversedMessages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Message message={item} />}
      />
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
