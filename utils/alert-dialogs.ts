import { Alert } from 'react-native'

class AlertDialogs {
  confirmDeleteAccount(onDeleteAccount: () => void) {
    return Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: onDeleteAccount },
    ])
  }
}

export default new AlertDialogs()
