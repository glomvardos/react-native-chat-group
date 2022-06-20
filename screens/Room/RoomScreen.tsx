import { useLayoutEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useRecoilValue } from 'recoil'
import { mutate } from 'swr'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import RenderIf from '../../components/UI/RenderIf'
import { RootStackParams } from '../../Routes/navigators/NativeStack'
import channelApi from '../../services/channelApi'
import { authUser, token } from '../../store/auth'
import { channels } from '../../store/channels'

type RoomScreenRouteProp = RouteProp<RootStackParams, 'Room'>

const RoomScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation()
  const loggedInUser = useRecoilValue(authUser)
  const accessToken = useRecoilValue(token)

  const { params } = useRoute<RoomScreenRouteProp>()
  const allChannels = useRecoilValue<ChannelTypes[] | []>(channels)

  const selectedChannel = allChannels.find(channel => channel.id === params.channelId)
  const isAlreadyJoined = selectedChannel?.users.some(user => user.id === loggedInUser?.id)

  const onPressJoin = () => {
    setIsLoading(true)
    channelApi
      .joinChannel({ roomId: selectedChannel!.id, accessToken: accessToken! })
      .then(res => {
        mutate('allChannels')
        mutate('myChannels')
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.headerTitle}>{selectedChannel?.name}</Text>,
      headerRight: () => (
        <RenderIf isTrue={!isAlreadyJoined}>
          <Pressable style={({ pressed }) => pressed && styles.iosPressed} onPress={onPressJoin}>
            <Text style={styles.headerRightText}>Join</Text>
          </Pressable>
        </RenderIf>
      ),
    })
  }, [isAlreadyJoined])

  return (
    <View style={styles.container}>
      <RenderIf isTrue={isLoading}>
        <LoadingSpinner />
      </RenderIf>
      <Text>{selectedChannel?.name}</Text>
      <Text>Test</Text>
    </View>
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
  iosPressed: {
    opacity: 0.5,
  },
  headerRightText: {
    color: '#fff',
    fontSize: 20,
    padding: 3,
  },
})
