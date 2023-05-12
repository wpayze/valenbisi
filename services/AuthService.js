import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthService = {
  login: async (username, password) => {
    const usersDB = await AsyncStorage.getItem('users')
    const defaultUser = { username: 'admin', password: 'admin' }
    let users = usersDB ? [...JSON.parse(usersDB), defaultUser] : [defaultUser]

    const foundUser = users.find(u => u.username === username)
    users = users.filter(u => u.username === defaultUser.username)

    if (foundUser && foundUser.password !== password) {
      return false
    }

    if (!foundUser) {
      users.push({ username, password })
    }

    AuthService.user = { username, password }
    await AsyncStorage.setItem('users', JSON.stringify(users))
    await AsyncStorage.setItem(
      'accessToken',
      JSON.stringify({ username, password })
    )
    return true
  },
  logout: async () => {
    await AsyncStorage.removeItem('accessToken')
  },
  getToken: async () => {
    const token = await AsyncStorage.getItem('accessToken')
    return JSON.parse(token)
  },
  isLoggedIn: async () => {
    const token = await AuthService.getToken()
    AuthService.user = token
    return token !== null
  },
  user: null
}

export default AuthService
