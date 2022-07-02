import axios, { AxiosError } from 'axios'
import axiosInstance, { ServerError } from './axiosInstance'

class MessagesApi {
  // POST
  async createMessage({ accessToken, message, channelId }: CreateMessageTypes) {
    try {
      return await axiosInstance.post(
        '/messages/message',
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

  // PATCH
  async editMessage({ accessToken, messageId, message }: EditMessageTypes) {
    try {
      await axiosInstance.patch(
        `/messages/message/${messageId}`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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

  // DELETE
  async deleteMessage({ accessToken, messageId }: DeleteMessageTypes) {
    try {
      await axiosInstance.delete(`/messages/message/${messageId}`, {
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

export default new MessagesApi()
