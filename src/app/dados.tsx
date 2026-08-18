import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function Cadastro() {
  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/master.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Dados do cartão</Text>

      {/* Campos */}
      <View style={styles.inputsContainer}>
        {/* Número do cartão */}
        <Text style={styles.label}>Número do cartão</Text>

        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={19}
        />

        {/* Data de expiração */}
        <Text style={styles.label}>Data de expiração</Text>

        <TextInput
          style={styles.inputExpiration}
          placeholder="00/00"
          placeholderTextColor="#888"
          keyboardType="numeric"
          maxLength={5}
        />

        {/* Apelido do cartão */}
        <Text style={styles.label}>Apelido do cartão</Text>

        <TextInput
          style={styles.input}
          placeholder="Apelido do cartão"
          placeholderTextColor="#888"
          autoCapitalize="words"
          autoCorrect={false}
        />
      </View>

      {/* Botão finalizar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>Finalizar</Text>
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
    height: 220,
    marginTop: 20,
  },

  title: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginTop: -35,
  },

  inputsContainer: {
    width: "100%",
  },

  label: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 42,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 22,
  },

  inputExpiration: {
    width: 100,
    height: 42,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 22,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff9500",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "500",
  },
});
