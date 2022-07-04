interface ChannelTypes {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  channelOwner: number
  users: UserTypes[]
  messages?: MessageTypes[]
}

interface ChannelSwrTypes {
  data: ChannelTypes
  error: Error
  isLoading: boolean
}

interface CreateChannelTypes extends TokenType {
  channelName: string
}

interface DeleteChannelTypes extends TokenType {
  id: number
}
interface RoomIdChannelTypes extends TokenType {
  roomId: number
}
interface LeaveChannelTypes extends TokenType {
  roomId: number
  userId: number
}
