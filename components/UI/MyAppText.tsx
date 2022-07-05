import { Text } from 'react-native'

interface Props {
  children: React.ReactNode
  propStyles?: { [key: string]: any }
  fontWeight?: 'bold' | 'normal'
  [key: string]: any
}

const MyAppText = ({ children, propStyles, fontWeight = 'normal', ...restProps }: Props) => {
  const fontFamily = fontWeight === 'bold' ? 'Lato-Bold' : 'Lato-Regular'

  return (
    <Text style={{ fontFamily, fontWeight: fontWeight, ...propStyles }} {...restProps}>
      {children}
    </Text>
  )
}

export default MyAppText
