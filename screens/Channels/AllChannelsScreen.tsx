import { FlatList } from 'react-native'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import useGetData from '../../hooks/useGetData'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from './components/Channel'
import { channels } from '../../store/channels'
import ContentContainer from '../../components/UI/ContentContainer'

const AllChannelsScreen = () => {
  const setChannels = useSetRecoilState<ChannelTypes[] | []>(channels)
  const { data, error, isLoading } = useGetData({ url: '/channels/channels', key: 'allChannels' })

  useEffect(() => {
    if (data) {
      setChannels(data)
    }
  }, [data])
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
          renderItem={({ item }) => <Channel channel={item} />}
        />
      </RenderIf>
    </ContentContainer>
  )
}

export default AllChannelsScreen
