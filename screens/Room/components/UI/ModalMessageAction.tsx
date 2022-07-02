import { Pressable, StyleSheet, Text } from 'react-native'

interface Props {
  onPressHandler: () => void
}

const ModalMessageAction = ({ onPressHandler }: Props) => {
  return (
    <Pressable onPress={onPressHandler}>
      <Text>Cancel</Text>
    </Pressable>
  )
}

export default ModalMessageAction

const styles = StyleSheet.create({})
