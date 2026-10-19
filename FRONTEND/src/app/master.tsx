import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const animacao = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]);

    animacao.start();

    const timer = setTimeout(() => {
      router.replace("/inicio");
    }, 2800);

    return () => {
      clearTimeout(timer);
      animacao.stop();
    };
  }, [opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
        <Image
          source={require("../../assets/master.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 230,
    height: 160,
  },
});