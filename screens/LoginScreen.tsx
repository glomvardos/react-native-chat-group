import { useFormik } from 'formik'
import { StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import Button from '../components/UI/Button'
import TextField from '../components/UI/TextField'
import TextFieldLabel from '../components/UI/TextFieldLabel'
import TextTitle from '../components/UI/TextTitle'
import Colors from '../constants/colors'

const LoginScreen = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: values => {},
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
        <Button text='Login' onPressHandler={formik.handleSubmit} />
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
