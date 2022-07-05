import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { MaterialIcons } from '@expo/vector-icons'

import UserIcon from '../UI/UserIcon'
import { authUser } from '../../../../store/auth'
import RenderIf from '../../../../components/UI/RenderIf'
import Colors from '../../../../constants/colors'
import alertDialogs from '../../../../utils/alert-dialogs'
import stringMethods from '../../../../utils/string-methods'
import MyAppText from '../../../../components/UI/MyAppText'

interface Props {
  user: ChannelTypes['users'][0] | undefined
  roomName: string
  onRemoveUser: (userId: number) => void
}

const User = ({ user, roomName, onRemoveUser }: Props) => {
  const loggedInUser = useRecoilValue(authUser)
  const isTheLoggedInUser = user?.id === loggedInUser?.id

  const fullName = stringMethods.capitalizeWords(`${user?.firstName} ${user?.lastName}`)
  const capitalizeRoomName = stringMethods.capitalizeWords(roomName)

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <UserIcon text={`${user?.firstName} ${user?.lastName}`} />
        <MyAppText
          propStyles={{ ...styles.text, ...{ marginHorizontal: 8 } }}
        >{`${user?.firstName} ${user?.lastName}`}</MyAppText>
        <RenderIf isTrue={isTheLoggedInUser}>
          <MyAppText propStyles={styles.text}>(you)</MyAppText>
        </RenderIf>
      </View>
      <RenderIf isTrue={!isTheLoggedInUser && !!user?.id}>
        <Pressable
          onPress={() =>
            alertDialogs.confirmRemoveUser(() => onRemoveUser(user?.id!), fullName, capitalizeRoomName)
          }
        >
          <MaterialIcons name='delete' size={24} color={Colors.error} />
        </Pressable>
      </RenderIf>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
})
