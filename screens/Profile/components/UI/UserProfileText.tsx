import { StyleSheet, Text, View } from 'react-native'

interface Props {
  textLeft: string
  textRight: string
}

const UserProfileText = ({ textLeft, textRight }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textLeft, styles.text]}>{textLeft}</Text>
      <Text style={[styles.textRight, styles.text]}>{textRight}</Text>
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
    fontWeight: 'bold',
  },
  textRight: {},
})
