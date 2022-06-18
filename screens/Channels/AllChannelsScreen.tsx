import { SafeAreaView, StyleSheet, StatusBar, Platform, FlatList, View } from 'react-native'
import Colors from '../../constants/colors'
import useGetData from '../../hooks/useGetData'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from '../../components/Channels/Channel'

const AllChannelsScreen = () => {
  const { data, error, isLoading } = useGetData({ url: '/channels/channels', key: 'allChannels' })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <RenderIf isTrue={isLoading}>
          <LoadingSpinner />
        </RenderIf>
        <RenderIf isTrue={!isLoading && data}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Channel channel={item} />}
          />
        </RenderIf>
      </View>
    </SafeAreaView>
  )
}

export default AllChannelsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    padding: 15,
    paddingRight: 0,
  },
  button: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: Platform.select({ android: 27, ios: 29 }),
    height: Platform.select({ android: 27, ios: 29 }),
    marginRight: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
