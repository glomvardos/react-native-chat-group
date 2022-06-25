import axios, { AxiosError } from 'axios'
import axiosInstance, { ServerError } from './axiosInstance'

class MessagesApi {
  // POST
  async createMessage({ accessToken, message, channelId }: CreateMessageTypes) {
    try {
      return await axiosInstance.post(
        '/messages/create-message',
        { message, channelId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>
        if (serverError && (serverError.response?.status === 403 || serverError.response?.status === 400)) {
          throw new Error(serverError.response.data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }
    }
  }
}

export default new MessagesApi()
