import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { StyleSheet, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'

import ChannelsScreen from '../screens/ChannelsScreen'

import Colors from '../constants/colors'
import navigationStyles from '../constants/navigationStyles'

const Drawer = createDrawerNavigator()

interface Props {
  logout: () => void
}

const AuthenticatedStack = ({ logout }: Props) => {
  const onLogout = async () => {
    await AsyncStorage.removeItem('token')
    logout()
  }
  return (
    <Drawer.Navigator
      initialRouteName='Channels'
      screenOptions={navigationStyles}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label='Log out'
              onPress={onLogout}
              labelStyle={{ color: '#fff' }}
              icon={() => <MaterialIcons name='logout' size={24} color='#fff' />}
            />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen name='Channels' component={ChannelsScreen} />
    </Drawer.Navigator>
  )
}

export default AuthenticatedStack
