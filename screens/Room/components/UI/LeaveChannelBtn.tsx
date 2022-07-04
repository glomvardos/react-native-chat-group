import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  onPressHandler: () => void
}

const LeaveChannelBtn = ({ onPressHandler }: Props) => {
  return (
    <Pressable style={({ pressed }) => pressed && styles.iosPressed} onPress={onPressHandler}>
      <Text style={styles.headerRightText}>Leave</Text>
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
