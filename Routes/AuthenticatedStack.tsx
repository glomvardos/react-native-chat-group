import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import navigationStyles from '../constants/navigationStyles'
import TopTabsNavigation from '../components/Channels/TopTabsNavigation'

const Drawer = createDrawerNavigator()

interface Props {
  logout: () => void
}

const AuthenticatedStack = ({ logout }: Props) => {
  const navigate = useNavigation()

  const onLogout = async () => {
    await AsyncStorage.removeItem('token')
    navigate.dispatch(DrawerActions.closeDrawer())
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
    </Drawer.Navigator>
  )
}

export default AuthenticatedStack
