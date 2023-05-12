import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import AuthService from '../../services/AuthService'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Settings = () => {
  const { setState } = useContext(AppContext)

  const handleLogout = async () => {
    await AuthService.logout()
    setState(prev => ({ ...prev, isLoggedIn: false }))
  }

  const user = AuthService.user

  return (
    <View style={styles.container}>
      <Text style={styles.usuario}>Usuario: {user?.username} </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  usuario: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3498db',
    width: '80%',
    padding: 10,
    borderRadius: 5
  }
})

export default Settings
