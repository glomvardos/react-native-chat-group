interface ChannelTypes {
  id: number
  name: string
}

interface createChannelTypes extends TokenType {
  channelName: string
}

interface deleteChannelTypes extends TokenType {
  id: number
}
