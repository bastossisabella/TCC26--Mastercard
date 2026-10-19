import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function TrocarSenha() {
  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.back}
        onPress={() =>
          router.replace("/recuperar-codigo")
        }
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../../assets/master.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.line} />

      {/* Título */}
      <Text style={styles.description}>
        Crie sua nova senha
      </Text>

      <Text style={styles.sub}>
        Insira a sua nova senha do{" "}
        <Text style={styles.masterText}>MASTERCARD</Text>
      </Text>

      {/* Campos */}
      <View style={styles.inputsContainer}>
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
        <Text style={styles.cont}>
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
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>
          Confirmar
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
    width: 300,
    height: 250,
    marginTop: -20,
  },


  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#888888",
    marginTop: -20,
    marginBottom: 25,
  },

  description: {
    width: "100%",
    color: "#888888",
    fontSize: 22,
    textAlign: "left",
    marginTop: 10,
  },



  sub: {
    width: "100%",
    color: "#888888",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
    marginTop: 8,
  },

  masterText: {
    color: "#ff8000",
    fontWeight: "700",
  },

  inputsContainer: {
    width: "100%",
    marginTop: 40,
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
    marginBottom: 12,
  },

  cont: {
    width: "100%",
    color: "#888888",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "left",
    marginBottom: 30,
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
