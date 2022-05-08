import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Colors from '../../constants/colors'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Channels</Text>
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
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
