import { KeyboardAvoidingView, StyleSheet, View, Platform, Keyboard, Alert } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { useFormik } from 'formik'
import { useSWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'

import Colors from '../../../../constants/colors'
import TextField from '../../../../components/UI/TextField'
import SendMessageBtn from '../Buttons/SendMessageBtn'
import validationSchema from '../../../../utils/validation-schema'
import messageApi from '../../../../services/messageApi'
import { token } from '../../../../store/auth'

interface Props {
  channelId: number
}

const LeaveMessageInput = ({ channelId }: Props) => {
  const accessToken = useRecoilValue(token)
  const headerHeight = useHeaderHeight()
  const { mutate } = useSWRConfig()
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: validationSchema.sendMessage,
    onSubmit: values => {
      messageApi
        .createMessage({ accessToken: accessToken!, message: values.message, channelId })
        .then(_ => {
          formik.resetForm()
          Keyboard.dismiss()
          mutate('channelMessages')
        })
        .catch(error => Alert.alert('Error', error.message))
    },
  })

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      style={styles.container}
      behavior={Platform.select({ android: 'height', ios: 'padding' })}
    >
      <View style={styles.messageWrapper}>
        <TextField
          placeholder='Leave message'
          multiline
          paddingVertical={20}
          width='90%'
          onChangeText={formik.handleChange('message')}
          onBlur={formik.handleBlur('message')}
          value={formik.values.message}
        />
        <SendMessageBtn onPressHandler={formik.handleSubmit} />
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
