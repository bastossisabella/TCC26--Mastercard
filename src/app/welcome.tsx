import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/master.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Experiências que {"\n"}
         despertam suas{"\n"}
        paixões
      </Text>

      <View style={styles.buttons}>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.primaryText}>
            Primeiro acesso
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
        >
          <Text style={styles.secondaryText}>
            Já tenho uma conta
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  logo: {
 width: 320,
    height: 270,
    marginTop: 30,
  },

  description: {
    color: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
      fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },

  buttons: {
    width: "100%",
    position: "absolute",
    bottom: 65,
    alignItems: "center",
  },


  primaryButton:{
    width: "89%",
    height: 45,
    backgroundColor: "#ff7300",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    top: -18,
    paddingVertical: 17,
    marginBottom: 15,

  },

  primaryText: {
    color: "#000000",
    fontSize: 12,
  },

  secondaryText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 10,
    top: -20
  },
});