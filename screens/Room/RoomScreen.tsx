import { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useSWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import RenderIf from '../../components/UI/RenderIf'
import { RootStackParams } from '../../Routes/navigators/NativeStack'
import channelApi from '../../services/channelApi'
import { authUser, token } from '../../store/auth'
import { channels } from '../../store/channels'
import Messages from './components/Messages/Messages'
import LeaveMessageInput from './components/LeaveMessageInput/LeaveMessageInput'
import useGetData from '../../hooks/useGetData'
import JoinRoomMessage from './components/UI/JoinRoomMessage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LeaveChannelBtn from './components/UI/LeaveChannelBtn'
import UsersBtn from './components/UI/UsersBtn'
import UsersModal from './components/UsersModal/UsersModal'

type RoomScreenRouteProp = RouteProp<RootStackParams, 'Room'>

const RoomScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showUsersModal, setShowUsersModal] = useState<boolean>(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()
  const loggedInUser = useRecoilValue(authUser)
  const accessToken = useRecoilValue(token)
  const { mutate, cache } = useSWRConfig()
  const { params } = useRoute<RoomScreenRouteProp>()
  const allChannels = useRecoilValue<ChannelTypes[] | []>(channels)

  const selectedChannel = allChannels.find(channel => channel.id === params.channelId)
  const isAlreadyJoined = selectedChannel?.users.some(user => user.id === loggedInUser?.id)
  const isNotTheChannelOwner = selectedChannel?.channelOwner !== loggedInUser?.id

  const {
    data: messages,
    error,
    isLoading: isMessageLoading,
  } = useGetData({ key: 'channelMessages', url: `/messages/channel-messages/${selectedChannel?.id}` })

  const onPressJoin = () => {
    setIsLoading(true)
    channelApi
      .joinChannel({ roomId: selectedChannel!.id, accessToken: accessToken! })
      .then(_ => {
        mutate('allChannels')
        mutate('myChannels')
      })
      .catch(error => Alert.alert('Error', error.message))
      .finally(() => setIsLoading(false))
  }

  const onPressLeave = (userId: number) => {
    setIsLoading(true)
    channelApi
      .leaveChannel({ roomId: selectedChannel!.id, userId, accessToken: accessToken! })
      .then(_ => {
        mutate('allChannels')
        mutate('myChannels')
        if (loggedInUser?.id === userId) {
          navigation.navigate('AllChannels')
        }
      })
      .catch(error => Alert.alert('Error', error.message))
      .finally(() => setIsLoading(false))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>{selectedChannel?.name}</Text>,
      headerRight: () => (
        <>
          <RenderIf isTrue={!isNotTheChannelOwner}>
            <UsersBtn onPressHandler={() => setShowUsersModal(true)} />
          </RenderIf>
          <RenderIf isTrue={!!isAlreadyJoined && isNotTheChannelOwner}>
            <LeaveChannelBtn onPressHandler={() => onPressLeave(loggedInUser?.id!)} />
          </RenderIf>
        </>
      ),
    })
  }, [isAlreadyJoined])

  useEffect(() => {
    mutate('allChannels')
    mutate('channelMessages')
  }, [])

  useEffect(() => {
    return () => {
      cache.delete('channelMessages')
    }
  }, [])

  return (
    <>
      <UsersModal
        showUsersModal={showUsersModal}
        setShowUsersModal={setShowUsersModal}
        selectedChannel={selectedChannel}
        onRemoveUser={onPressLeave}
      />
      <View style={styles.container}>
        <RenderIf isTrue={isLoading || isMessageLoading}>
          <LoadingSpinner />
        </RenderIf>
        <RenderIf isTrue={!isLoading && !isMessageLoading && !!isAlreadyJoined && !!selectedChannel}>
          <Messages messages={messages} />
          <LeaveMessageInput channelId={selectedChannel!.id} />
        </RenderIf>
        <RenderIf isTrue={!isLoading && !isMessageLoading && !!!isAlreadyJoined}>
          <JoinRoomMessage onPressHandler={onPressJoin} />
        </RenderIf>
      </View>
    </>
  )
}

export default RoomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 20,
  },
})
