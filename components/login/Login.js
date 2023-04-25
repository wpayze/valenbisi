import React, {useContext} from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { AppContext } from '../../context/AppContext';

const Login = () => {
  
  const { setState } = useContext(AppContext);

  const handleLogin = () => {
    setState(prev => ({ ...prev, isLoggedIn: true }));
  };

  return (
    <View>
      <View style={styles.formGroup}>
        <Text>Usuario</Text>
        <TextInput style={styles.inputs} />
      </View>

      <View style={styles.formGroup}>
        <Text>Contraseña</Text>
        <TextInput style={styles.inputs} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin() }
      >
        <Text style={styles.text}>Iniciar Sesi&oacute;n</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#13132C",
    padding: 10,
    margin: 20,
  },
  text: {
    color: "#fff",
  },
  inputs: {
    backgroundColor: "#fff",
  },
});

export default Login;
