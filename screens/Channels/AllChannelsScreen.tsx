import { FlatList } from 'react-native'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from './components/Channel'
import ContentContainer from '../../components/UI/ContentContainer'

interface Props {
  allChannels: ChannelTypes[]
  isLoading: boolean
}

const AllChannelsScreen = ({ isLoading, allChannels = [] }: Props) => {
  return (
    <ContentContainer paddingRight={0}>
      <RenderIf isTrue={isLoading}>
        <LoadingSpinner />
      </RenderIf>
      <RenderIf isTrue={!isLoading && allChannels !== undefined}>
        <FlatList
          bounces={false}
          data={allChannels}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Channel channel={item} />}
        />
      </RenderIf>
    </ContentContainer>
  )
}

export default AllChannelsScreen
