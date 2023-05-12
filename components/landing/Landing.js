import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import AuthService from '../../services/AuthService'
import { useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Landing = ({ navigation }) => {
  const { setState } = useContext(AppContext)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = await AuthService.isLoggedIn()

      if (isLoggedIn) setState((prev) => ({ ...prev, isLoggedIn: true }))
    }
    checkLoggedIn()
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/landing.jpg')}
        resizeMode='cover'
        style={styles.image}
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.text}>Comenzar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#262659',
    padding: 10,
    borderRadius: 32
  },
  text: {
    color: '#fff'
  },
  logo: {
    width: '100%',
    resizeMode: 'stretch',
    height: 100
  }
})

export default Landing
