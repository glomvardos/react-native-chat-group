import { DrawerNavigationOptions } from '@react-navigation/drawer'
import Colors from './colors'

const navigationStyles: DrawerNavigationOptions = {
  drawerStyle: { backgroundColor: Colors.bgBlack },
  drawerLabelStyle: { color: 'white' },
  drawerActiveBackgroundColor: Colors.darkGray,
  headerTitleAlign: 'left',
  headerTintColor: 'white',
  headerTitleStyle: {
    color: '#fff',
    fontSize: 18,
  },
  headerStyle: {
    height: 110,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: Colors.bgBlack,
  },
}

export default navigationStyles
