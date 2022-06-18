import axios, { AxiosError } from 'axios'
import axiosInstance from './axiosInstance'

type ServerError = { message: string }
class ChannelApi {
  // POST
  async createChannel({ channelName, accessToken }: createChannelTypes) {
    try {
      return await axiosInstance.post(
        '/channels/create-channel',
        {
          name: channelName,
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
        if (serverError && (serverError.response?.status === 403 || serverError.response?.status === 400)) {
          throw new Error(serverError.response.data.message)
        } else {
          throw new Error('Something went wrong')
        }
      }
    }
  }

  // DELETE
  async deleteChannel({ id, accessToken }: deleteChannelTypes) {
    try {
      return await axiosInstance.delete(`/channels/delete-channel/${id}`, {
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

export default new ChannelApi()
