import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Landing from '../landing/Landing'
import Login from '../login/Login'

const NotLoggedStack = () => {
  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

  return (
    <Stack.Navigator>
      <Tab.Screen
        name='Landing'
        component={Landing}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}

export default NotLoggedStack
