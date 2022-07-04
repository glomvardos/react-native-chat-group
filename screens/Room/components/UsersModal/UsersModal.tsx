import { StyleSheet } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../../constants/colors'
import Users from './Users'

interface Props {
  selectedChannel: ChannelTypes | undefined
  showUsersModal: boolean
  setShowUsersModal: React.Dispatch<React.SetStateAction<boolean>>
  onRemoveUser: (userId: number) => void
}

const UsersModal = ({ selectedChannel, showUsersModal, setShowUsersModal, onRemoveUser }: Props) => {
  return (
    <ReactNativeModal
      animationIn='slideInRight'
      animationOut='slideOutRight'
      isVisible={showUsersModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      backdropTransitionOutTiming={0}
      hasBackdrop={true}
      onBackdropPress={() => setShowUsersModal(false)}
      style={styles.modal}
    >
      <SafeAreaView style={styles.container}>
        <Users selectedChannel={selectedChannel} onRemoveUser={onRemoveUser} />
      </SafeAreaView>
    </ReactNativeModal>
  )
}

export default UsersModal

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    width: '80%',
    padding: 20,
  },
})
