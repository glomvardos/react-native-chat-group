import { useEffect, useRef } from 'react'
import { StyleSheet, Text, Animated } from 'react-native'
import { useSnackbarContext } from '../../context/snackbar'
import { SnackbarStates } from '../../enums/snackbar'

const CustomSnackbar = () => {
  const { snackbarState, dispatch } = useSnackbarContext()
  const slideIn = useRef(new Animated.Value(75)).current

  useEffect(() => {
    Animated.timing(slideIn, {
      toValue: snackbarState.showSnackbar ? 0 : 75,
      duration: 500,
      useNativeDriver: true,
    }).start()

    if (snackbarState.showSnackbar) {
      const timerId = setTimeout(() => {
        dispatch({ type: SnackbarStates.CLOSE, payload: { message: '' } })
      }, snackbarState.duration)

      return () => clearTimeout(timerId)
    }
  }, [snackbarState.showSnackbar])

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: snackbarState.color, transform: [{ translateY: slideIn }] },
      ]}
    >
      <Text style={styles.text}>{snackbarState.message}</Text>
    </Animated.View>
  )
}

export default CustomSnackbar

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 9999,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
})
