import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'

interface Props {
  children: React.ReactNode
  paddingRight?: number
}

const ContentContainer = ({ children, paddingRight = 15 }: Props) => {
  return <View style={[styles.container, { paddingRight: paddingRight }]}>{children}</View>
}

export default ContentContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    padding: 15,
  },
})
