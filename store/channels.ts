import { atom } from 'recoil'

export const channels = atom<ChannelTypes[] | []>({
  key: 'channels',
  default: [],
})
