import { StyleSheet, Text, View, useWindowDimensions, Pressable } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Colors from '../../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../../Routes/navigators/NativeStack'
import stringMethods from '../../../utils/string-methods'
import SwipeAction from '../../../components/UI/SwipeAction'

interface Props {
  channel: ChannelTypes
  onDeleteChannel?: (id: number) => void
}

const Channel = ({ channel, onDeleteChannel }: Props) => {
  const iconName = stringMethods.getInitialLetters(channel.name)
  const { width } = useWindowDimensions()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

  return (
    <Pressable
      onPress={() => navigation.navigate('Room', { channelId: channel.id })}
      style={({ pressed }) => [styles.button, pressed && styles.iosButtonPressed]}
      android_ripple={{ color: Colors.textIconBg }}
    >
      <Swipeable
        enabled={onDeleteChannel ? true : false}
        renderRightActions={() => (
          <SwipeAction onDeletePressHandler={() => onDeleteChannel && onDeleteChannel(channel.id)} />
        )}
      >
        <View style={styles.container}>
          <View style={styles.textIconContainer}>
            <Text style={styles.textIcon}>{iconName}</Text>
          </View>
          <Text style={[styles.text, { fontSize: width < 400 ? 17 : 22 }]}>{channel.name.toUpperCase()}</Text>
        </View>
      </Swipeable>
    </Pressable>
  )
}

export default Channel

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  iosButtonPressed: {
    opacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textIconContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.textIconBg,
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textIcon: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  swipeContainer: {
    backgroundColor: Colors.error,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})
