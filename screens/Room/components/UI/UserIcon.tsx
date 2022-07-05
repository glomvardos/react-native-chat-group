import { StyleSheet, View } from 'react-native'
import MyAppText from '../../../../components/UI/MyAppText'
import Colors from '../../../../constants/colors'
import stringMethods from '../../../../utils/string-methods'

interface Props {
  isMessageFromMe?: boolean
  marginBottom?: number
  text: string
}

const UserIcon = ({ text, isMessageFromMe, marginBottom }: Props) => {
  const userInitials = stringMethods.getInitialLetters(text)

  const transformStyle =
    isMessageFromMe === undefined
      ? {}
      : isMessageFromMe
      ? { transform: [{ translateY: marginBottom === 0 ? 0 : -9 }] }
      : { transform: [{ translateY: marginBottom === 0 ? 9 : 0 }] }

  return (
    <View style={[styles.userIconContainer, transformStyle]}>
      <MyAppText propStyles={styles.userIconText}>{userInitials}</MyAppText>
    </View>
  )
}

export default UserIcon

const styles = StyleSheet.create({
  userIconContainer: {
    backgroundColor: Colors.textIconBg,
    borderRadius: 9999,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    color: '#fff',
    textTransform: 'uppercase',
  },
})
