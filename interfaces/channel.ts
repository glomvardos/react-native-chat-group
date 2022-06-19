interface ChannelTypes {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  channelOwner: number
  user: UserTypes[]
}

interface createChannelTypes extends TokenType {
  channelName: string
}

interface deleteChannelTypes extends TokenType {
  id: number
}
