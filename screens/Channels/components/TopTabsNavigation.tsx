import { useLayoutEffect, useState } from 'react'
import { Platform, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Feather } from '@expo/vector-icons'

import AllChannelsScreen from '../AllChannelsScreen'
import Colors from '../../../constants/colors'
import MyChannelsScreen from '../MyChannelsScreen'
import CreateChannel from './CreateChannel'

const Tab = createMaterialTopTabNavigator()

const TopTabsNavigation = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Channels',
      headerRight: () => (
        <Pressable style={styles.button} onPress={() => setShowModal(prevState => !prevState)}>
          <Feather name='plus' size={21} color='#fff' />
        </Pressable>
      ),
    })
  }, [])

  return (
    <>
      <CreateChannel showModal={showModal} setShowModal={setShowModal} />
      <Tab.Navigator
        initialRouteName='AllChannels'
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: 'capitalize',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: Colors.bgBlack,
          },
        }}
      >
        <Tab.Screen
          name='AllChannels'
          component={AllChannelsScreen}
          options={{
            title: 'All Channels',
          }}
        />
        <Tab.Screen name='MyChannels' component={MyChannelsScreen} options={{ title: 'My Channels' }} />
      </Tab.Navigator>
    </>
  )
}

export default TopTabsNavigation

const styles = StyleSheet.create({
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
