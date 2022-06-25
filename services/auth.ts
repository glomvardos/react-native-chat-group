import axios, { AxiosError } from 'axios'
import axiosInstance, { ServerError } from './axiosInstance'

class Auth {
  async signup({ email, password, firstName, lastName }: UserTypes) {
    const newUser = {
      email,
      password,
      firstName,
      lastName,
    }
    try {
      return await axiosInstance.post('/auth/signup', newUser)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>
        if (serverError && serverError.response?.status === 403) {
          throw new Error(serverError.response.data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }
    }
  }

  async signin({ email, password }: LoginTypes) {
    try {
      return await axiosInstance.post('/auth/signin', { email, password })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>
        if (serverError && serverError.response?.status === 401) {
          throw new Error(serverError.response.data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }
    }
  }
}

export default new Auth()
