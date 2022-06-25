import * as yup from 'yup'

class ValidationSchema {
  login() {
    return yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  }

  signup() {
    return yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    })
  }

  createChannel() {
    return yup.object({
      name: yup.string().required().max(20),
    })
  }

  sendMessage() {
    return yup.object({
      message: yup.string().trim().required(),
    })
  }
}
export default new ValidationSchema()
