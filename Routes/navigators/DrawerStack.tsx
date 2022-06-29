import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import navigationStyles from '../../constants/navigationStyles'
import TopTabsNavigation from '../../screens/Channels/components/TopTabsNavigation'
import ProfileScreen from '../../screens/Profile/ProfileScreen'

const Drawer = createDrawerNavigator()

interface Props {
  logout: () => void
}

const DrawerStack = ({ logout }: Props) => {
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
      <Drawer.Screen
        name='Channels'
        component={TopTabsNavigation}
        options={{ drawerIcon: () => <Octicons name='broadcast' size={24} color='#fff' /> }}
      />
      <Drawer.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ drawerIcon: () => <FontAwesome5 name='user-circle' size={24} color='#fff' /> }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerStack
