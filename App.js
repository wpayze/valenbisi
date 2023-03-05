import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/Tabs';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}