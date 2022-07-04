import { ScrollView, StyleSheet } from 'react-native'
import User from './User'

interface Props {
  selectedChannel: ChannelTypes | undefined
  onRemoveUser: (userId: number) => void
}

const Users = ({ selectedChannel, onRemoveUser }: Props) => {
  const displayUsers = selectedChannel?.users.map(user => (
    <User key={user.id} user={user} roomName={selectedChannel?.name} onRemoveUser={onRemoveUser} />
  ))

  return <ScrollView bounces={false}>{displayUsers}</ScrollView>
}

export default Users

const styles = StyleSheet.create({})
