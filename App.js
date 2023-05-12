import { NavigationContainer } from '@react-navigation/native'
import Tabs from './components/Tabs'
import 'react-native-gesture-handler'
import { AppContextProvider } from './context/AppContext'

export default function App () {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppContextProvider>
  )
}
