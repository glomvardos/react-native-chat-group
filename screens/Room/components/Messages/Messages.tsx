import { useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Message from './Message'

interface Props {
  messages: ChannelTypes['messages']
}

const Messages = ({ messages = [] }: Props) => {
  const [scrollIndex, setScrollIndex] = useState<number>(0)
  const flatListRef = useRef<FlatList>(null)
  // Revese the messages array without using .reverse()
  const reversedMessages = useMemo(() => {
    const reversedMessages = []
    for (let i = messages.length - 1; i >= 0; i--) {
      reversedMessages.push(messages[i])
    }

    reversedMessages.sort((a: { createdAt: string }, b: { createdAt: string }) =>
      b.createdAt.localeCompare(a.createdAt)
    )

    return reversedMessages
  }, [messages])

  useEffect(() => {
    if (scrollIndex !== 0) {
      flatListRef.current?.scrollToIndex({ index: scrollIndex, animated: false })
    }
  }, [scrollIndex])

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        bounces={false}
        inverted={true}
        data={reversedMessages}
        onScrollToIndexFailed={() => {
          setScrollIndex(0)
        }}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Message
            setScrollIndex={setScrollIndex}
            index={index}
            message={item}
            marginBottom={index === 0 ? 0 : 20}
          />
        )}
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
