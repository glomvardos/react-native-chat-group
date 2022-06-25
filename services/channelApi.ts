import axios, { AxiosError } from 'axios'
import axiosInstance, { ServerError } from './axiosInstance'

class ChannelApi {
  // POST
  async createChannel({ channelName, accessToken }: CreateChannelTypes) {
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
  async deleteChannel({ id, accessToken }: DeleteChannelTypes) {
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

  // PATCH
  async joinChannel({ roomId, accessToken }: RoomIdChannelTypes) {
    try {
      return await axiosInstance.patch(
        `/channels/join-channel/${roomId}`,
        {},
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
          throw new Error(serverError.response!.data.message)
          // throw new Error('Something went wrong')
        }
      }
    }
  }
}

export default new ChannelApi()
