import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../../../../constants/colors'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const MessageModal = ({ showModal, setShowModal }: Props) => {
  return (
    <Modal animationType='fade' transparent={true} visible={showModal}>
      <Pressable style={styles.centeredView} onPress={() => setShowModal(false)}>
        <Pressable style={styles.modalView}>
          <Pressable></Pressable>
          <Pressable></Pressable>
          <Pressable>
            <Text>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default MessageModal

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
  },
  modalView: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
  },
})
