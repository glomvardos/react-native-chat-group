import { Pressable, StyleSheet } from 'react-native'
import MyAppText from '../../../../components/UI/MyAppText'

interface Props {
  onPressHandler: () => void
}

const LeaveChannelBtn = ({ onPressHandler }: Props) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.iosPressed} onPress={onPressHandler}>
      <MyAppText propStyles={styles.headerRightText}>Leave</MyAppText>
    </Pressable>
  )
}

export default LeaveChannelBtn

const styles = StyleSheet.create({
  iosPressed: {
    opacity: 0.5,
  },
  headerRightText: {
    color: '#fff',
    fontSize: 20,
    padding: 3,
  },
})
