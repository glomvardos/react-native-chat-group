import { Pressable, StyleSheet, Animated, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Colors from '../../constants/colors'
import { useEffect, useRef, useState } from 'react'
import RenderIf from '../UI/RenderIf'

interface Props {
  setSearchedAllChannels: React.Dispatch<React.SetStateAction<ChannelTypes[] | []>>
  setSearchedMyChannels: React.Dispatch<React.SetStateAction<ChannelTypes[] | []>>
  allChannels: ChannelTypes[] | []
  myChannels: ChannelTypes[] | []
}

const Search = ({
  setSearchedAllChannels,
  setSearchedMyChannels,
  allChannels = [],
  myChannels = [],
}: Props) => {
  const [search, setSearch] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const expanded = useRef(new Animated.Value(40)).current

  useEffect(() => {
    Animated.timing(expanded, {
      toValue: isSearching ? 150 : 40,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isSearching])

  useEffect(() => {
    if (search.length > 1) {
      const filteredAllChannels = allChannels.filter(channel =>
        channel.name.toLowerCase().startsWith(search.toLowerCase())
      )
      const filteredMyChannels = myChannels.filter(channel =>
        channel.name.toLowerCase().startsWith(search.toLowerCase())
      )
      setSearchedAllChannels(filteredAllChannels)
      setSearchedMyChannels(filteredMyChannels)
    } else {
      setSearchedAllChannels(allChannels)
      setSearchedMyChannels(myChannels)
    }
  }, [search])

  const onPressSearchIcon = () => setIsSearching(prevState => !prevState)

  return (
    <Animated.View style={[styles.inputContainer, { maxWidth: expanded }]}>
      <RenderIf isTrue={isSearching}>
        <TextInput
          value={search}
          onChangeText={newText => setSearch(newText)}
          placeholder='Search'
          placeholderTextColor='#fff'
          style={styles.input}
        />
      </RenderIf>
      <Pressable onPress={onPressSearchIcon}>
        <Feather name='search' size={21} color='#fff' />
      </Pressable>
    </Animated.View>
  )
}

export default Search

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
  },
  input: {
    color: '#fff',
    alignSelf: 'center',
    width: '85%',
  },
})
