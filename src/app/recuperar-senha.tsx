import { useState } from "react";

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");

  function enviarEmail() {
    if (email.trim() === "") {
      Alert.alert("Atenção", "Digite seu e-mail.");
      return;
    }

    router.push("/recuperar-codigo");
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <Image
        source={require("../../assets/master.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.line} />

      <Text style={styles.title}>
        Esqueci minha senha
      </Text>

      <Text style={styles.description}>
        Insira o seu e-mail para trocar a sua senha no{" "}
        <Text style={styles.masterText}>Mastercard</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={enviarEmail}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.privacyButton}>
        <Text style={styles.privacyText}>
          POLÍTICAS DE PRIVACIDADE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 30,
    alignItems: "center",
  },

  back: {
    position: "absolute",
    left: 25,
    top: 45,
    zIndex: 10,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "200",
  },

  logo: {
    width: "90%",
    height: 260,
    marginTop: -40,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#888888",
    marginTop: -69,
    marginBottom: 25,
  },

  title: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "left",
    marginTop: 40,
  },

  description: {
    width: "100%",
    color: "#888888",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 40,
  },

  masterText: {
    color: "#ff9500",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 14,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEFF00",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 25,
  },

  buttonText: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "500",
    lineHeight: 30,
  },

  privacyButton: {
    position: "absolute",
    bottom: 35,
  },

  privacyText: {
    color: "#888888",
    fontSize: 10,
    textDecorationLine: "underline",
  },
});