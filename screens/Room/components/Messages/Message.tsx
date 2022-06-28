import moment from 'moment'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import RenderIf from '../../../../components/UI/RenderIf'
import Colors from '../../../../constants/colors'
import { authUser } from '../../../../store/auth'
import stringMethods from '../../../../utils/string-methods'

interface Props {
  message: MessageTypes
  marginBottom: number
}

const Message = ({ message, marginBottom }: Props) => {
  const user = useRecoilValue(authUser)
  const isMessageFromMe = message.userId === user?.id
  const userInitials = stringMethods.getInitialLetters(`${message.user.firstName} ${message.user.lastName}`)
  return (
    <View
      style={[
        styles.container,
        isMessageFromMe ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' },
      ]}
    >
      <View
        style={[
          styles.userIconContainer,
          isMessageFromMe
            ? { transform: [{ translateY: marginBottom === 0 ? 0 : -9 }] }
            : { transform: [{ translateY: marginBottom === 0 ? 9 : 0 }] },
        ]}
      >
        <Text style={styles.userIconText}>{userInitials}</Text>
      </View>
      <View style={styles.messageContainer}>
        <RenderIf isTrue={!isMessageFromMe}>
          <Text style={styles.messageFromText}>{message.user.firstName}</Text>
        </RenderIf>
        <View
          style={[
            styles.textContainer,
            isMessageFromMe
              ? { backgroundColor: Colors.blue, marginRight: 10, marginBottom: marginBottom }
              : { backgroundColor: Colors.darkGray, marginLeft: 10, marginBottom: marginBottom },
          ]}
        >
          <Text style={styles.text}>{message.message}</Text>
          <Text style={styles.messageDateText}>{moment(message.createdAt).format('DD/MM/YY - HH:mm')}</Text>
        </View>
      </View>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  userIconContainer: {
    backgroundColor: Colors.textIconBg,
    borderRadius: 9999,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  messageContainer: {
    maxWidth: '70%',
  },
  messageFromText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
  },
  textContainer: {
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
    fontSize: 15,
  },
  text: {
    color: '#fff',
  },
  messageDateText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 8,
  },
})
