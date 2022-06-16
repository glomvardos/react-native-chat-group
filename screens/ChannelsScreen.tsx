import { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, StatusBar, Platform, Pressable, FlatList, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import Colors from '../constants/colors'
import CreateChannel from '../components/Channels/CreateChannel'
import useGetData from '../hooks/useGetData'
import RenderIf from '../components/UI/RenderIf'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Channel from '../components/Channels/Channel'

const ChannelsScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigation()
  const { data, error, isLoading } = useGetData({ url: '/channels/channels', key: 'channels' })

  useLayoutEffect(() => {
    navigate.setOptions({
      title: 'Channels',
      headerRight: () => (
        <Pressable style={styles.button} onPress={() => setShowModal(prevState => !prevState)}>
          <Feather name='plus' size={21} color='#fff' />
        </Pressable>
      ),
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <CreateChannel showModal={showModal} setShowModal={setShowModal} />
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
        {/* <RenderIf isTrue={!isLoading && error}></RenderIf> */}
      </View>
    </SafeAreaView>
  )
}

export default ChannelsScreen

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
