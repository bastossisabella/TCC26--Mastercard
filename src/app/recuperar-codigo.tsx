import { useRef, useState } from "react";

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

export default function RecuperarCodigo() {
  const [codigo, setCodigo] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputs = useRef<Array<TextInput | null>>([]);

  function alterarNumero(texto: string, posicao: number) {
    const numero = texto.replace(/\D/g, "").slice(-1);
    const novoCodigo = [...codigo];

    novoCodigo[posicao] = numero;
    setCodigo(novoCodigo);

    if (numero && posicao < 5) {
      inputs.current[posicao + 1]?.focus();
    }
  }

  function apagarNumero(posicao: number) {
    if (codigo[posicao] === "" && posicao > 0) {
      inputs.current[posicao - 1]?.focus();
    }
  }

  function continuar() {
    const codigoCompleto = codigo.join("");

    if (codigoCompleto.length !== 6) {
      Alert.alert(
        "Código incompleto",
        "Digite os seis números do código."
      );

      return;
    }

    router.push("/trocar");
  }

  function reenviarCodigo() {
    Alert.alert(
      "Código reenviado",
      "Enviamos um novo código para seu e-mail."
    );
  }

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.back}
        onPress={() =>
          router.replace("/recuperar-senha")
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

      {/* Linha */}
      <View style={styles.line} />

      {/* Título */}
      <Text style={styles.title}>
        Código de validação
      </Text>

      {/* Explicação */}
      <Text style={styles.description}>
        Enviamos um código de verificação temporário para o seu e-mail.
      </Text>

      {/* Campos do código */}
      <View style={styles.codigoContainer}>
        {codigo.map((numero, posicao) => (
          <TextInput
            key={posicao}
            ref={(input) => {
              inputs.current[posicao] = input;
            }}
            style={styles.codigoInput}
            value={numero}
            onChangeText={(texto) =>
              alterarNumero(texto, posicao)
            }
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                apagarNumero(posicao);
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
          />
        ))}
      </View>

      {/* Botão continuar */}
      <TouchableOpacity
        style={styles.button}
        onPress={continuar}
      >
        <Text style={styles.buttonText}>
          Continuar
        </Text>
      </TouchableOpacity>

      {/* Reenviar */}
      <Text style={styles.resendTitle}>
        Não recebeu o código?
      </Text>

      <Text style={styles.resendDescription}>
        Verifique sua caixa de Spam ou Promoções, ou tente reenviar o código.
      </Text>

      <TouchableOpacity onPress={reenviarCodigo}>
        <Text style={styles.resendButton}>
          Reenviar código
        </Text>
      </TouchableOpacity>

      {/* Política de privacidade */}
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

  title: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "left",
  },

  description: {
    width: "100%",
    color: "#888888",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 30,
  },

  codigoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  codigoInput: {
    width: 43,
    height: 50,
    borderWidth: 1,
    borderColor: "#A5A5A5",
    borderRadius: 7,
    backgroundColor: "#080808",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
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

  resendTitle: {
    width: "100%",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 35,
  },

  resendDescription: {
    width: "100%",
    color: "#888888",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },

  resendButton: {
    color: "#ff9100",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 15,
    textDecorationLine: "underline",
  },

  privacyButton: {
    position: "absolute",
    bottom: 25,
  },

  privacyText: {
    color: "#888888",
    fontSize: 10,
    textDecorationLine: "underline",
  },
});