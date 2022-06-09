import { atom, selector } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthState {
  token: string | null
}

export const token = atom<AuthState['token']>({
  key: 'token',
  default: AsyncStorage.getItem('token').then(token => token),
})

export const saveToken = selector<AuthState['token']>({
  key: 'saveToken',
  get: ({ get }) => get(token),
  set: ({ set }, newToken) => set(token, newToken),
})

export const clearToken = selector<AuthState['token']>({
  key: 'logout',
  get: ({ get }) => get(token),
  set: ({ set }) => set(token, null),
})
