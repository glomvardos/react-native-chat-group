import { useRecoilValue } from 'recoil'
import useSWR from 'swr'
import axios from '../services/axiosInstance'
import { token } from '../store/auth'

interface UseGetDataTypes {
  url: string
  key: string
}

const useGetData = ({ url, key }: UseGetDataTypes) => {
  const accessToken = useRecoilValue(token)

  const fetcher = async () => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  }

  const { data, error } = useSWR(key, accessToken ? fetcher : null, {
    refreshInterval: url.startsWith('/messages') ? 1000 : undefined,
  })
  const isLoading = !data

  return {
    data,
    error,
    isLoading,
  }
}

export default useGetData
