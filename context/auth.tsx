// import { createContext, useContext, useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// interface Props {
//   children: React.ReactNode
// }
// interface AuthTypes {
//   token: string | null
//   storeToken: (token: string) => void
//   logout: () => void
// }

// const authContext = createContext<AuthTypes>({
//   token: null,
//   storeToken: () => null,
//   logout: () => null,
// })

// export const useAuthContext = (): AuthTypes => useContext(authContext)

// const AuthProvider = ({ children }: Props) => {
//   const [token, setToken] = useState<AuthTypes['token']>(null)

//   const getToken = async () => {
//     const token = await AsyncStorage.getItem('token')
//     setToken(token)
//   }

//   const storeToken = async (token: string) => {
//     await AsyncStorage.setItem('token', token)
//     setToken(token)
//   }

//   const logout = async () => {
//     await AsyncStorage.removeItem('token')
//     setToken(null)
//   }

//   useEffect(() => {
//     getToken()
//   }, [])

//   const ctx = {
//     token,
//     storeToken,
//     logout,
//   }
//   return <authContext.Provider value={ctx}>{children}</authContext.Provider>
// }

// export default AuthProvider
