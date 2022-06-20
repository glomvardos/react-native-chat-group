import { atom, selector } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthTypes {
  token: string | null
  user: UserTypes | null
}

export const token = atom<AuthTypes['token']>({
  key: 'token',
  default: AsyncStorage.getItem('token').then(token => token),
})

export const authUser = atom<AuthTypes['user']>({
  key: 'authUser',
  default: null,
})

export const saveToken = selector<AuthTypes['token']>({
  key: 'saveToken',
  get: ({ get }) => get(token),
  set: ({ set }, newToken) => set(token, newToken),
})

export const clearToken = selector<AuthTypes['token']>({
  key: 'logout',
  get: ({ get }) => get(token),
  set: ({ set }) => set(token, null),
})
