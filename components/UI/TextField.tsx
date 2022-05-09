import { TextInput, StyleSheet, Platform } from 'react-native'
import Colors from '../../constants/colors'

interface Props {
  hasError: boolean
  [key: string]: any
}

const TextField = ({ hasError, ...restProps }: Props) => {
  return <TextInput style={[styles.input, hasError && { borderColor: 'red' }]} {...restProps} />
}

export default TextField

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 10 : 14,
    elevation: 5,
    marginBottom: 10,
  },
})
