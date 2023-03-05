import Home from "./home/Home";
import Favorites from "./favorites/Favorites";
import Stops from "./stops/Stops";
import Settings from "./settings/Settings";

import { Entypo, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "./landing/Landing";
import Login from "./login/Login";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  const [usuario, setUsuario] = useState();

  return (
    <>
      {usuario ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Stops"
            component={Stops}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="bicycle" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="heart" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
        >
          <Tab.Screen name="Landing" component={Landing} />
          <Tab.Screen name="Login" component={() => <Login setUsuario={setUsuario} />}/>
        </Stack.Navigator>
      )}
    </>
  );
};

export default Tabs;
