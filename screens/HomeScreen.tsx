import { SafeAreaView, StyleSheet, Text, StatusBar, Platform, View, Pressable } from 'react-native'
import Colors from '../constants/colors'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
