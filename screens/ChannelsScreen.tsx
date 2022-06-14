import { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, StatusBar, Platform, View, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'

import Colors from '../constants/colors'
import CreateChannel from '../components/Channels/CreateChannel'

const ChannelsScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigation()

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
  button: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: Platform.OS === 'android' ? 27 : 29,
    height: Platform.OS === 'android' ? 27 : 29,
    marginRight: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
