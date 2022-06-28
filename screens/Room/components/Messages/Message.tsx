import { StyleSheet, Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import Colors from '../../../../constants/colors'
import { authUser } from '../../../../store/auth'

interface Props {
  message: MessageTypes
}

const Message = ({ message }: Props) => {
  const user = useRecoilValue(authUser)
  const isMessageFromMe = message.userId === user?.id
  return (
    <View>
      <Text
        style={[
          styles.text,
          isMessageFromMe
            ? { alignSelf: 'flex-end', backgroundColor: Colors.blue }
            : { alignSelf: 'flex-start' },
        ]}
      >
        {message.message}
      </Text>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
})
