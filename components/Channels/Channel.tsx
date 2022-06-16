import { StyleSheet, Text, View, useWindowDimensions, Animated, Pressable, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../../constants/colors'
import api from '../../services/channelApi'
import { mutate } from 'swr'
import channelApi from '../../services/channelApi'

interface Props {
  channel: ChannelTypes
}

const Channel = ({ channel }: Props) => {
  const splitName = channel.name.split(' ')
  const finalIconName = splitName[0][0].toUpperCase() + (splitName[1]?.[0]?.toUpperCase() ?? '')
  const { width } = useWindowDimensions()

  const deleteChannel = () => {
    channelApi
      .deleteChannel(channel.id)
      .then(_ => {
        mutate('channels')
      })
      .catch(error => {
        Alert.alert('Error', error.message)
      })
  }

  const renderRightActions = (_: Animated.AnimatedInterpolation, __: Animated.AnimatedInterpolation) => {
    return (
      <Pressable onPress={deleteChannel}>
        <View style={styles.swipeContainer}>
          <AntDesign name='delete' size={24} color='#fff' />
        </View>
      </Pressable>
    )
  }

  return (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}>
      <View style={styles.container}>
        <View style={styles.textIconContainer}>
          <Text style={styles.textIcon}>{finalIconName}</Text>
        </View>

        <Text style={[styles.text, { fontSize: width < 400 ? 17 : 22 }]}>{channel.name.toUpperCase()}</Text>
      </View>
    </Swipeable>
  )
}

export default Channel

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
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
