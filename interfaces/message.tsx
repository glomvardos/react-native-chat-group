interface MessageTypes {
  id: number
  createdAt: string
  message: string
  userId: number
  channelId: number
  user: {
    firstName: string
    lastName: string
  }
}

interface CreateMessageTypes extends TokenType {
  message: string
  channelId: number
}
