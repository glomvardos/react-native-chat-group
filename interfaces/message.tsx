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
interface DeleteMessageTypes extends TokenType {
  messageId: number
}
interface EditMessageTypes extends TokenType {
  messageId: number
  message: string
}
