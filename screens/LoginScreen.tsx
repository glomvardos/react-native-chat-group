import { useState } from 'react'
import { Alert } from 'react-native'

import { useFormik } from 'formik'

import AuthFormContainer from '../components/UI/AuthFormContainer'
import Button from '../components/UI/Button'
import LoginSignupLink from '../components/UI/LoginSignupLink'
import TextField from '../components/UI/TextField'
import TextFieldLabel from '../components/UI/TextFieldLabel'
import { useAuthContext } from '../context/auth'
import auth from '../services/auth'
import validationSchema from '../utils/validation-schema'

const LoginScreen = () => {
  const { storeToken } = useAuthContext()
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
          storeToken(res?.data.access)
        })
        .catch(error => Alert.alert('Error', error.message))
        .finally(() => setIsLoading(false))
    },
  })

  return (
    <AuthFormContainer>
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
      <LoginSignupLink text="Don't have an account" route='Signup' />
      <Button text='Login' isLoading={isLoading} onPressHandler={formik.handleSubmit} />
    </AuthFormContainer>
  )
}

export default LoginScreen
