import React from "react";
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from "react-native-web";
import { StyleSheet } from "react-native-web";

const Landing = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
        <Text style={styles.text}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6faff",
    height: "100%"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#262659',
    padding: 10,
    margin: 20
  },
  text: {
    color: "#fff"
  }
});

export default Landing;
