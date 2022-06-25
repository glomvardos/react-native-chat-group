import { SafeAreaView, StyleSheet, StatusBar, Platform, FlatList, View, Alert } from 'react-native'
import { useRecoilValue } from 'recoil'
import { mutate } from 'swr'
import RenderIf from '../../components/UI/RenderIf'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Channel from '../../components/Channels/Channel'
import useGetData from '../../hooks/useGetData'
import channelApi from '../../services/channelApi'
import { token } from '../../store/auth'
import Colors from '../../constants/colors'

const MyChannelsScreen = () => {
  const accessToken = useRecoilValue(token)
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
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
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
      </View>
    </SafeAreaView>
  )
}

export default MyChannelsScreen

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
