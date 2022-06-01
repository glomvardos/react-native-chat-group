import { useFormik } from 'formik'
import { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Button from '../components/UI/Button'
import TextField from '../components/UI/TextField'
import TextFieldLabel from '../components/UI/TextFieldLabel'
import TextTitle from '../components/UI/TextTitle'
import Colors from '../constants/colors'
import auth from '../services/auth'
import validationSchema from '../utils/validation-schema'

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema.login,
    onSubmit: async values => {
      setIsLoading(true)
      auth
        .signin({ password: values.password.trim(), email: values.email.trim() })
        .then(res => {
          console.log(res)
        })
        .catch(error => Alert.alert('Error', error.message))
        .finally(() => setIsLoading(false))
    },
  })

  return (
    <View style={styles.container}>
      <TextTitle text='Chat Group' />
      <View style={styles.form}>
        <TextFieldLabel text='Email' />
        <TextField
          hasError={formik.touched.email && formik.errors.email ? true : false}
          keyboardType='email-address'
          placeholder='Enter email'
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        <TextFieldLabel text='Password' />
        <TextField
          hasError={formik.touched.password && formik.errors.password ? true : false}
          secureTextEntry
          placeholder='Enter password'
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
        <Button text='Login' isLoading={isLoading} onPressHandler={formik.handleSubmit} />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: 30,
    backgroundColor: Colors.darkGray,
    width: '85%',
    height: 300,
    borderRadius: 10,
  },
})
