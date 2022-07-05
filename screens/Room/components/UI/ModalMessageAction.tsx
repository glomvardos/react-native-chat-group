import { Pressable, StyleSheet } from 'react-native'
import MyAppText from '../../../../components/UI/MyAppText'

interface Props {
  onPressHandler: () => void
}

const ModalMessageAction = ({ onPressHandler }: Props) => {
  return (
    <Pressable onPress={onPressHandler}>
      <MyAppText>Cancel</MyAppText>
    </Pressable>
  )
}

export default ModalMessageAction

const styles = StyleSheet.create({})
