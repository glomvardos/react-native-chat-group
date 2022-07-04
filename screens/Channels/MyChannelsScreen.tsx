import { FlatList, Alert } from 'react-native'
import { useRecoilValue } from 'recoil'
import { useSWRConfig } from 'swr'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from './components/Channel'
import useGetData from '../../hooks/useGetData'
import channelApi from '../../services/channelApi'
import { token } from '../../store/auth'
import ContentContainer from '../../components/UI/ContentContainer'

const MyChannelsScreen = () => {
  const accessToken = useRecoilValue(token)
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useGetData({ url: '/channels/user-channels', key: 'myChannels' })

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
      <RenderIf isTrue={!isLoading && data}>
        <FlatList
          bounces={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Channel channel={item} onDeleteChannel={onDeleteChannel} />}
        />
      </RenderIf>
      {/* <RenderIf isTrue={!isLoading && error}></RenderIf> */}
    </ContentContainer>
  )
}

export default MyChannelsScreen
