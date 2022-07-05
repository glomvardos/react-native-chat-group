import { useEffect, useLayoutEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Feather } from '@expo/vector-icons'

import AllChannelsScreen from '../AllChannelsScreen'
import Colors from '../../../constants/colors'
import MyChannelsScreen from '../MyChannelsScreen'
import CreateChannel from './CreateChannel'
import useGetData from '../../../hooks/useGetData'
import { useSetRecoilState } from 'recoil'
import { channels } from '../../../store/channels'
import Search from '../../../components/Search/Search'

const Tab = createMaterialTopTabNavigator()

const TopTabsNavigation = () => {
  const setChannels = useSetRecoilState<ChannelTypes[] | []>(channels)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [searchedAllChannels, setSearchedAllChannels] = useState<ChannelTypes[] | []>([])
  const [searchedMyChannels, setSearchedMyChannels] = useState<ChannelTypes[] | []>([])
  const navigation = useNavigation()

  const { data: allChannels, isLoading: isAllChannelsLoading }: ChannelsSwrTypes = useGetData({
    url: '/channels/channels',
    key: 'allChannels',
  })

  const { data: myChannels, isLoading: isMyChannelsLoading }: ChannelsSwrTypes = useGetData({
    url: '/channels/user-channels',
    key: 'myChannels',
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Channels',
      headerRight: () => (
        <View style={styles.headerBtnsContainer}>
          <Search
            setSearchedAllChannels={setSearchedAllChannels}
            setSearchedMyChannels={setSearchedMyChannels}
            allChannels={allChannels}
            myChannels={myChannels}
          />
          <Pressable style={styles.button} onPress={() => setShowModal(prevState => !prevState)}>
            <Feather name='plus' size={21} color='#fff' />
          </Pressable>
        </View>
      ),
    })
  }, [allChannels, myChannels])

  useEffect(() => {
    if (allChannels && myChannels) {
      setChannels(allChannels)
      setSearchedAllChannels(allChannels)
      setSearchedMyChannels(myChannels)
    }
  }, [allChannels, myChannels])

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
          children={() => (
            <AllChannelsScreen isLoading={isAllChannelsLoading} allChannels={searchedAllChannels} />
          )}
          options={{
            title: 'All Channels',
          }}
        />
        <Tab.Screen
          name='MyChannels'
          children={() => (
            <MyChannelsScreen isLoading={isMyChannelsLoading} myChannels={searchedMyChannels} />
          )}
          options={{ title: 'My Channels' }}
        />
      </Tab.Navigator>
    </>
  )
}

export default TopTabsNavigation

const styles = StyleSheet.create({
  headerBtnsContainer: {
    flexDirection: 'row',
  },
  inputContainer: {},
  button: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: 40,
    marginHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
