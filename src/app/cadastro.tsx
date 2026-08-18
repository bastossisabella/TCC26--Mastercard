import { useState } from "react";

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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.back}
        onPress={() => router.push("/welcome")}
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
      <Text style={styles.description}>Dados Pessoais</Text>

      {/* Campos */}
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Número de telefone"
          placeholderTextColor="#888"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          maxLength={15}
        />

        {/* Data de nascimento */}
        <View style={styles.dataContainer}>
          <TextInput
            style={styles.dataInput}
            placeholder="DD"
            placeholderTextColor="#888"
            value={dia}
            onChangeText={setDia}
            keyboardType="number-pad"
            maxLength={2}
            textAlign="center"
          />

          <TextInput
            style={styles.dataInput}
            placeholder="MM"
            placeholderTextColor="#888"
            value={mes}
            onChangeText={setMes}
            keyboardType="number-pad"
            maxLength={2}
            textAlign="center"
          />

          <TextInput
            style={styles.dataInput}
            placeholder="AAAA"
            placeholderTextColor="#888"
            value={ano}
            onChangeText={setAno}
            keyboardType="number-pad"
            maxLength={4}
            textAlign="center"
          />
        </View>
      </View>

      {/* Botão confirmar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dados")}
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
    width: 340,
    height: 260,
    marginTop: 20,
  },

  description: {
    width: "100%",
    color: "#888888",
    fontSize: 25,
    textAlign: "center",
    marginTop: -68,
    marginBottom: 30,
  },

  inputsContainer: {
    width: "100%",
    marginTop: 64,
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

  dataContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  dataInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 5,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    fontSize: 14,
  },

  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff9500",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
  },

  buttonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "500",
  },
});