import { Text, Pressable, StyleSheet, View, Platform, ActivityIndicator } from 'react-native'
import Colors from '../../constants/colors'

interface Props {
  text: string
  isLoading: boolean
  onPressHandler: () => void
}

const Button = ({ text, isLoading, onPressHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPressHandler}>
        {isLoading ? (
          <ActivityIndicator size='small' color='#fff' />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.bgBlack,
    elevation: 10,
    width: 170,
    paddingVertical: Platform.OS === 'android' ? 14 : 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
})
