import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

export default function Login() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.replace("/welcome")}
      >
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/master.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Bem-vindo(a)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail ou número de telefone"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a sua senha"
          placeholderTextColor="#888"
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/recuperar-senha")}
        >
          <Text style={styles.forgot}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 30,
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
    width: 280,
    height: 240,
  },

  description: {
    color: "#747272",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "normal",
    marginTop: -59,
    marginBottom: 100,
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
    marginBottom: 37,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff9500",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 37,
  },

  buttonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },

  forgot: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 15,
  },
});