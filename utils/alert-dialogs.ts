import { Alert } from 'react-native'

class AlertDialogs {
  confirmDeleteAccount(onDeleteAccount: () => void) {
    return Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDeleteAccount },
      ],
      { cancelable: true }
    )
  }
  confirmDeleteMessage(onDeleteMessage: () => void) {
    return Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDeleteMessage },
      ],
      { cancelable: true }
    )
  }
}

export default new AlertDialogs()
