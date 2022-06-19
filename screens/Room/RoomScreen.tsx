import { RouteProp, useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { RootStackParams } from '../../Routes/navigators/NativeStack'
import { channels } from '../../store/channels'

type RoomScreenRouteProp = RouteProp<RootStackParams, 'Room'>

const RoomScreen = () => {
  const { params } = useRoute<RoomScreenRouteProp>()
  const allChannels = useRecoilValue<ChannelTypes[] | []>(channels)

  const selectedChannel = allChannels.find(channel => channel.id === params.channelId)
  console.log(selectedChannel)
  return (
    <View>
      <Text>{selectedChannel?.name}</Text>
    </View>
  )
}

export default RoomScreen

const styles = StyleSheet.create({})
