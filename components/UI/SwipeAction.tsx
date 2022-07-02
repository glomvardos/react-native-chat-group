import { Pressable, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../../constants/colors'
import RenderIf from './RenderIf'

interface Props {
  onDeletePressHandler: () => void
  onEditPressHandler?: () => void
  isMessage?: boolean
  marginBottom?: number
}

const SwipeAction = ({ onDeletePressHandler, onEditPressHandler, isMessage, marginBottom }: Props) => {
  const setIconWidth = {
    width: isMessage ? 35 : 60,
    height: isMessage ? 35 : 60,
    borderRadius: isMessage ? 9999 : 8,
  }

  return (
    <View style={[styles.container, { marginBottom: marginBottom }]}>
      <RenderIf isTrue={!!onEditPressHandler}>
        <Pressable onPress={onEditPressHandler}>
          <View style={[styles.editContainer, setIconWidth]}>
            <AntDesign name='edit' size={isMessage ? 16 : 24} color='#fff' />
          </View>
        </Pressable>
      </RenderIf>

      <Pressable onPress={onDeletePressHandler}>
        <View style={[styles.deleteContainer, setIconWidth]}>
          <AntDesign name='delete' size={isMessage ? 16 : 24} color='#fff' />
        </View>
      </Pressable>
    </View>
  )
}

export default SwipeAction

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  deleteContainer: {
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  editContainer: {
    backgroundColor: Colors.edit,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
})
