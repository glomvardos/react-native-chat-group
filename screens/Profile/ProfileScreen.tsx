import { Alert, Pressable, StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'
import ContentContainer from '../../components/UI/ContentContainer'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authUser, clearToken, token } from '../../store/auth'
import stringMethods from '../../utils/string-methods'
import UserProfileText from './components/UI/UserProfileText'
import alertDialogs from '../../utils/alert-dialogs'
import userApi from '../../services/userApi'
import MyAppText from '../../components/UI/MyAppText'

const ProfileScreen = () => {
  const logout = useSetRecoilState(clearToken)
  const user = useRecoilValue(authUser)
  const accessToken = useRecoilValue(token)
  const userInitials = stringMethods.getInitialLetters(`${user?.firstName} ${user?.lastName}`)

  const onDeleteAccount = () => {
    userApi
      .deleteUser({ accessToken: accessToken! })
      .then(_ => logout(null))
      .catch(error => Alert.alert('Error', error.message))
  }

  return (
    <ContentContainer>
      <View style={styles.headerContainer}>
        <View style={styles.userIconContainer}>
          <MyAppText propStyles={styles.userIconText}>{userInitials}</MyAppText>
        </View>
      </View>
      <View>
        <UserProfileText textLeft='First name:' textRight={user!.firstName} />
        <UserProfileText textLeft='Last name:' textRight={user!.lastName} />
        <UserProfileText textLeft='Email:' textRight={user!.email} />
      </View>
      <View style={styles.footerContainer}>
        <Pressable onPress={() => alertDialogs.confirmDeleteAccount(onDeleteAccount)}>
          <MyAppText propStyles={styles.deleteAccountButtonText}>Delete Acccount</MyAppText>
        </Pressable>
      </View>
    </ContentContainer>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  userIconContainer: {
    backgroundColor: Colors.textIconBg,
    borderRadius: 9999,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconText: {
    color: '#fff',
    fontSize: 50,
    textTransform: 'uppercase',
  },
  footerContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 25,
  },
  deleteAccountButton: {},
  deleteAccountButtonText: {
    color: Colors.error,
    fontSize: 16,
  },
})
