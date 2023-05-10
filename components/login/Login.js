import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthService from "../../services/AuthService";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = await AuthService.isLoggedIn();

      if (isLoggedIn) setState((prev) => ({ ...prev, isLoggedIn: true }));
    };
    checkLoggedIn();
  }, []);

  const { setState } = useContext(AppContext);

  const handleLogin = async () => {
    const logged = await AuthService.login(username, password);
    if (!logged) {
      setLoginError(true);
      return;
    }
    setState((prev) => ({ ...prev, isLoggedIn: true }));
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  return (
    <View style={styles.section}>
      {loginError && (
        <Text style={styles.errorText}>
          Error de inicio de sesión, contraseña incorrecta.
        </Text>
      )}

      <View style={styles.formGroup}>
        <Text>Usuario</Text>
        <TextInput
          style={styles.inputs}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Contraseña</Text>
        <TextInput
          style={styles.inputs}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.text}>Iniciar Sesi&oacute;n</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Login;
