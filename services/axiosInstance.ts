import axios from 'axios'
import { Platform } from 'react-native'

export type ServerError = { message: string }

const instance = axios.create({
  baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
})

export default instance
