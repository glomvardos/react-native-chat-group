import { Pressable, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../constants/colors'

interface Props {
  onPressHandler: () => void
}

const SendMessageBtn = ({ onPressHandler }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPressHandler}>
      <MaterialIcons name='send' size={30} color={Colors.blue} />
    </Pressable>
  )
}

export default SendMessageBtn

const styles = StyleSheet.create({
  container: {
    marginBottom: 7,
    marginLeft: 8,
  },
})
