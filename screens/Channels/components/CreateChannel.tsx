import { useFormik } from 'formik'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { Alert, Modal, Pressable, StyleSheet, Text } from 'react-native'
import { useRecoilValue } from 'recoil'
import Colors from '../../../constants/colors'
import channelApi from '../../../services/channelApi'
import { token } from '../../../store/auth'
import validationSchema from '../../../utils/validation-schema'
import Button from '../../../components/UI/Button'
import TextField from '../../../components/UI/TextField'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateChannel = ({ showModal, setShowModal }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const accessToken = useRecoilValue(token)
  const { mutate } = useSWRConfig()

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema.createChannel,
    onSubmit: values => {
      setIsLoading(true)
      channelApi
        .createChannel({ channelName: values.name, accessToken: accessToken! })
        .then(_ => {
          mutate('allChannels')
          mutate('myChannels')
          formik.resetForm()
          setShowModal(false)
        })
        .catch(error => Alert.alert('Error', error.message))
        .finally(() => setIsLoading(false))
    },
  })

  return (
    <Modal animationType='fade' visible={showModal} transparent={true} onRequestClose={() => {}}>
      <Pressable style={styles.centeredView} onPress={() => setShowModal(false)}>
        <Pressable style={styles.modalView}>
          <Text style={styles.text}>Create Channel</Text>
          <TextField
            placeholder='Channel name'
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            value={formik.values.name}
            hasError={formik.errors.name && formik.touched.name ? true : false}
          />
          <Button text='Submit' isLoading={isLoading} onPressHandler={formik.handleSubmit} />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default CreateChannel

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
