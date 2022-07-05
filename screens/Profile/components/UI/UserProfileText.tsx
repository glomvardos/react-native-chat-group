import { StyleSheet, Text, View } from 'react-native'
import MyAppText from '../../../../components/UI/MyAppText'

interface Props {
  textLeft: string
  textRight: string
}

const UserProfileText = ({ textLeft, textRight }: Props) => {
  return (
    <View style={styles.container}>
      <MyAppText fontWeight='bold' propStyles={{ ...styles.textLeft, ...styles.text }}>
        {textLeft}
      </MyAppText>
      <MyAppText propStyles={styles.text}>{textRight}</MyAppText>
    </View>
  )
}

export default UserProfileText

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  textLeft: {
    width: 120,
  },
})
