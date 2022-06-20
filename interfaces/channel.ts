interface ChannelTypes {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  channelOwner: number
  users: UserTypes[]
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
