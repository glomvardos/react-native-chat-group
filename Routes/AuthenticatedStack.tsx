import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { StyleSheet, Pressable, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import HomeScreen from '../screens/HomeScreen'
import Colors from '../constants/colors'
import navigationStyles from '../constants/navigationStyles'
import { MaterialIcons } from '@expo/vector-icons'

const Drawer = createDrawerNavigator()

interface Props {
  logout: () => void
}

const AuthenticatedStack = ({ logout }: Props) => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={navigationStyles}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label='Log out'
              onPress={logout}
              labelStyle={{ color: '#fff' }}
              icon={() => <MaterialIcons name='logout' size={24} color='#fff' />}
            />
          </DrawerContentScrollView>
        )
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Channels',
          headerRight: () => (
            <Pressable style={styles.button}>
              <Feather name='plus' size={21} color='#fff' />
            </Pressable>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default AuthenticatedStack

const styles = StyleSheet.create({
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
