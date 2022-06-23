import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

import Colors from '../../../../constants/colors'
import TextField from '../../../../components/UI/TextField'
import SendMessageBtn from '../Buttons/SendMessageBtn'

const LeaveMessageInput = () => {
  const headerHeight = useHeaderHeight()

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
      behavior={Platform.select({ android: 'height', ios: 'padding' })}
    >
      <View style={styles.messageWrapper}>
        <TextField placeholder='Leave message' multiline paddingVertical={20} width='90%' />
        <SendMessageBtn />
      </View>

      <View style={{ marginBottom: 10 }} />
    </KeyboardAvoidingView>
  )
}

export default LeaveMessageInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textIconBg,

    paddingTop: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    paddingHorizontal: Platform.select({ android: 15, ios: 20 }),
    alignItems: 'center',
  },
})
