import { useState } from 'react'
import { Alert } from 'react-native'

import { useFormik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import AuthFormContainer from '../../components/UI/AuthFormContainer'
import Button from '../../components/UI/Button'
import LoginSignupLink from '../../components/UI/LoginSignupLink'
import TextField from '../../components/UI/TextField'
import TextFieldLabel from '../../components/UI/TextFieldLabel'

import { RootStackParams } from '../../Routes/navigators/NativeStack'
import { useSnackbarContext } from '../../context/snackbar'
import { SnackbarStates } from '../../enums/snackbar'
import validationSchema from '../../utils/validation-schema'
import auth from '../../services/auth'

const SignupScreen = () => {
  const { dispatch } = useSnackbarContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema.signup,
    onSubmit: async values => {
      setIsLoading(true)
      auth
        .signup({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          password: values.password.trim(),
          email: values.email.trim(),
        })
        .then(_ => {
          dispatch({
            type: SnackbarStates.SUCCESS,
            payload: { message: 'You have been successfully signed up!' },
          })
          navigation.replace('Login')
        })
        .catch(error => Alert.alert('Error', error.message))
        .finally(() => setIsLoading(false))
    },
  })

  return (
    <AuthFormContainer>
      <TextFieldLabel text='First name' />
      <TextField
        hasError={formik.touched.firstName && formik.errors.firstName ? true : false}
        placeholder='Enter first name'
        onChangeText={formik.handleChange('firstName')}
        onBlur={formik.handleBlur('firstName')}
        value={formik.values.firstName}
      />
      <TextFieldLabel text='Last name' />
      <TextField
        hasError={formik.touched.lastName && formik.errors.lastName ? true : false}
        placeholder='Enter last name'
        onChangeText={formik.handleChange('lastName')}
        onBlur={formik.handleBlur('lastName')}
        value={formik.values.lastName}
      />
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
      <LoginSignupLink text='Already have an account' route='Login' />
      <Button text='Signup' isLoading={isLoading} onPressHandler={formik.handleSubmit} />
    </AuthFormContainer>
  )
}

export default SignupScreen
