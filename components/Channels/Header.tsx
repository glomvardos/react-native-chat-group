import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Colors from '../../constants/colors'
import { SimpleLineIcons } from '@expo/vector-icons'

interface Props {
  text: String
  handleDrawer: () => void
}

const Header = ({ text, handleDrawer }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Pressable onPress={handleDrawer}>
          <SimpleLineIcons name='menu' size={24} color='white' />
        </Pressable>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Pressable style={styles.button}>
        <Feather name='plus' size={24} color='#fff' />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  button: {
    backgroundColor: Colors.darkGray,
    borderRadius: 8,
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
  },
})
