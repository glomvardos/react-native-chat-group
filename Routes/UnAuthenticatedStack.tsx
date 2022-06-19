import NativeStack from './navigators/NativeStack'

const UnAuthenticatedStack = () => {
  return <NativeStack isAuth={false} />
}

export default UnAuthenticatedStack
