import { FlatList, Alert } from 'react-native'
import { useRecoilValue } from 'recoil'
import { useSWRConfig } from 'swr'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from './components/Channel'
import channelApi from '../../services/channelApi'
import { token } from '../../store/auth'
import ContentContainer from '../../components/UI/ContentContainer'

interface Props {
  myChannels: ChannelTypes[]
  isLoading: boolean
}

const MyChannelsScreen = ({ myChannels = [], isLoading }: Props) => {
  const accessToken = useRecoilValue(token)
  const { mutate } = useSWRConfig()

  const onDeleteChannel = (channelId: number) => {
    channelApi
      .deleteChannel({ id: channelId, accessToken: accessToken! })
      .then(_ => {
        mutate('allChannels')
        mutate('myChannels')
      })
      .catch(error => {
        Alert.alert('Error', error.message)
      })
  }

  return (
    <ContentContainer paddingRight={0}>
      <RenderIf isTrue={isLoading}>
        <LoadingSpinner />
      </RenderIf>
      <RenderIf isTrue={!isLoading && myChannels !== undefined}>
        <FlatList
          bounces={false}
          data={myChannels}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Channel channel={item} onDeleteChannel={onDeleteChannel} />}
        />
      </RenderIf>
    </ContentContainer>
  )
}

export default MyChannelsScreen
