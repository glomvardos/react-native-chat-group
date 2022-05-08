import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native'
import Header from '../components/Home/Header'
import Colors from '../constants/colors'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
      </View>
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
