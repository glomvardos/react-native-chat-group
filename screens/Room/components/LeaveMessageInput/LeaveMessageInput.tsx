import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native'

import React from 'react'
import Colors from '../../../../constants/colors'
import TextField from '../../../../components/UI/TextField'
import { useHeaderHeight } from '@react-navigation/elements'

const LeaveMessageInput = () => {
  const headerHeight = useHeaderHeight()

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
      behavior={Platform.select({ android: 'height', ios: 'padding' })}
    >
      <TextField hasError={false} multiline />
      <View style={{ marginBottom: 10 }} />
    </KeyboardAvoidingView>
  )
}

export default LeaveMessageInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.textIconBg,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})
