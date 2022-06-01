import * as yup from 'yup'

class ValidationSchema {
  login() {
    return yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  }
}

export default new ValidationSchema()
