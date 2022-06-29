import axios, { AxiosError } from 'axios'
import axiosInstance, { ServerError } from './axiosInstance'

class UserApi {
  // POST
  async deleteUser({ accessToken }: TokenType) {
    try {
      return await axiosInstance.delete('/users/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
}

export default new UserApi()
