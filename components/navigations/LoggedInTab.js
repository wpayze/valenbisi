import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../home/Home'
import CloseStops from '../closeStops/CloseStops'
import Favorites from '../favorites/Favorites'
import Stops from '../stops/Stops'
import Settings from '../settings/Settings'

import { Entypo, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'
import QRCodeReader from '../qr/QRCodeReader'

const LoggedInTab = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Inicio'
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name='home' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Paradas'
        component={Stops}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='bicycle' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Cercanas'
        component={CloseStops}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='md-compass' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Favoritas'
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='heart' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='QR'
        component={QRCodeReader}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='qrcode' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Opciones'
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default LoggedInTab
