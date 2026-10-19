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
      <Text style={styles.description}>Dados de acesso</Text>

      {/* Campos */}
      <View style={styles.inputsContainer}>
        {/* Nome de usuário */}
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        {/* Senha */}
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        {/* Requisitos da senha */}
        <Text style={styles.sub}>
          De 12 a 24 caracteres;{"\n"}
          1 caractere especial;{"\n"}
          1 letra maiúscula;{"\n"}
          1 número.
        </Text>

        {/* Confirmar senha */}
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
        />
      </View>

      {/* Botão confirmar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/welcome")}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
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
    marginTop: 10,
  },

  description: {
    width: "100%",
    color: "#888888",
    fontSize: 25,
    textAlign: "center",
    marginTop: -40,
    marginBottom: 46,
  },

  inputsContainer: {
    width: "100%",
    marginTop: 10,
  },

  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 20,
  },

  inputSenha: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 14,
  },

  sub: {
    width: "100%",
    color: "#888888",
    fontSize: 13,
    lineHeight: 16,
    textAlign: "left",
    marginTop: 8,
    marginBottom: 20,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff7300",
  borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  buttonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "500",
  },
});