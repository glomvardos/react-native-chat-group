import { useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Swipeable, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { useRecoilValue } from 'recoil'
import moment from 'moment'
import RenderIf from '../../../../components/UI/RenderIf'
import Colors from '../../../../constants/colors'
import { authUser, token } from '../../../../store/auth'
import SwipeAction from '../../../../components/UI/SwipeAction'
import messageApi from '../../../../services/messageApi'
import alertDialogs from '../../../../utils/alert-dialogs'
import UserIcon from '../UI/UserIcon'
import { useSWRConfig } from 'swr'

interface Props {
  message: MessageTypes
  marginBottom: number
  index: number
  setScrollIndex: React.Dispatch<React.SetStateAction<number>>
}

const Message = ({ message, marginBottom, index, setScrollIndex }: Props) => {
  const [messageValue, setMessageValue] = useState<string>(message.message)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const inputRef = useRef<TextInput>(null)
  const swipeableRef = useRef<Swipeable>(null)
  const accessToken = useRecoilValue(token)
  const user = useRecoilValue(authUser)
  const isMessageFromMe = message.userId === user?.id
  const { mutate } = useSWRConfig()
  let inputTimer: NodeJS.Timeout
  let indexTimer: NodeJS.Timeout

  const onDeleteMessage = () => {
    messageApi
      .deleteMessage({ messageId: message.id, accessToken: accessToken! })
      .then(_ => {
        mutate('channelMessages')
      })
      .catch(error => {
        Alert.alert('Error', error.message)
      })
  }

  const onEditMessage = () => {
    setIsEdit(true)

    inputTimer = setTimeout(() => {
      inputRef.current?.focus?.()
    }, 50)
    indexTimer = setTimeout(() => {
      setScrollIndex(index)
    }, 100)
  }

  const onBlurMessage = () => {
    setIsEdit(false)
    setScrollIndex(0)
    swipeableRef.current?.close?.()

    if (messageValue.trim() !== message.message.trim() && messageValue.trim() !== '') {
      messageApi
        .editMessage({ messageId: message.id, message: messageValue, accessToken: accessToken! })
        .then(_ => {
          mutate('channelMessages')
        })
        .catch(error => {
          Alert.alert('Error', error.message)
        })
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(inputTimer)
      clearTimeout(indexTimer)
    }
  }, [])

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        enabled={isMessageFromMe ? true : false}
        shouldCancelWhenOutside={true}
        renderRightActions={() => (
          <SwipeAction
            isMessage={true}
            marginBottom={marginBottom}
            onDeletePressHandler={() => alertDialogs.confirmDeleteMessage(onDeleteMessage)}
            onEditPressHandler={onEditMessage}
          />
        )}
      >
        <View
          style={[
            styles.container,
            isMessageFromMe ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' },
          ]}
        >
          <UserIcon
            text={`${message.user.firstName} ${message.user.lastName}`}
            isMessageFromMe={isMessageFromMe}
            marginBottom={marginBottom}
          />

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
              <TextInput
                spellCheck={false}
                ref={inputRef}
                style={styles.text}
                value={messageValue}
                onChangeText={text => setMessageValue(text)}
                onBlur={onBlurMessage}
                multiline
                editable={isEdit}
                autoFocus={true}
              />
              <Text style={styles.messageDateText}>
                {moment(message.createdAt).format('DD/MM/YY - HH:mm')}
              </Text>
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export default Message

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  messageContainer: {
    position: 'relative',
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
  swipeContainer: {
    backgroundColor: Colors.error,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})
