import { Pressable, StyleSheet, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

interface Props {
  onPressHandler: () => void
}

const UsersBtn = ({ onPressHandler }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPressHandler}>
      <FontAwesome5 name='user-circle' size={24} color='#fff' />
    </Pressable>
  )
}

export default UsersBtn

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginRight: 8,
    fontSize: 18,
  },
})
