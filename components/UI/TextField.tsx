import { TextInput, StyleSheet, Platform } from 'react-native'
import Colors from '../../constants/colors'

interface Props {
  paddingVertical?: number
  width?: '90%' | '100%'
  hasError?: boolean
  [key: string]: any
}

const TextField = ({ hasError, paddingVertical = 14, width = '100%', ...restProps }: Props) => {
  return (
    <TextInput
      style={[
        styles.input,
        {
          paddingVertical: Platform.select({ android: 10, ios: paddingVertical }),
          borderColor: hasError ? 'red' : 'transparent',
          width,
        },
        ,
      ]}
      {...restProps}
    />
  )
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
    elevation: 5,
    marginBottom: 10,
  },
})
