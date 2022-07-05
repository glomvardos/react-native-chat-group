import { Platform, Pressable, StyleSheet, View } from 'react-native'
import MyAppText from '../../../../components/UI/MyAppText'
import Colors from '../../../../constants/colors'

interface Props {
  onPressHandler: () => void
}

const JoinRoomMessage = ({ onPressHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressHandler}
        android_ripple={{ color: Colors.textIconBg }}
        style={({ pressed }) => [
          styles.button,
          pressed ? { opacity: Platform.select({ android: 1, ios: 0.8 }) } : null,
        ]}
      >
        <MyAppText propStyles={styles.text}>Join Room</MyAppText>
      </Pressable>
    </View>
  )
}

export default JoinRoomMessage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.blue,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
})
