import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Welcome() {
  // Animação da logo
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoProgress = useRef(new Animated.Value(0)).current;

  // Animação de entrada da Terra
  const earthOpacity = useRef(new Animated.Value(0)).current;
  const earthScale = useRef(new Animated.Value(1.08)).current;
  const earthPosition = useRef(new Animated.Value(30)).current;

  // Animação do conteúdo
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentPosition = useRef(new Animated.Value(25)).current;

  // Efeito de luz ligado à própria imagem da Terra
  const lightOpacity = useRef(new Animated.Value(0.08)).current;
  const lightPosition = useRef(new Animated.Value(-7)).current;

  useEffect(() => {
    const entranceAnimation = Animated.sequence([
      // Logo aparece no centro
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      // Logo permanece no centro
      Animated.delay(700),

      // Logo sobe para sua posição final
      Animated.timing(logoProgress, {
        toValue: 1,
        duration: 850,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),

      // Terra, texto e botões aparecem
      Animated.parallel([
        Animated.timing(earthOpacity, {
          toValue: 0.72,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(earthScale, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(earthPosition, {
          toValue: 0,
          duration: 1400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 700,
          delay: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(contentPosition, {
          toValue: 0,
          duration: 700,
          delay: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    entranceAnimation.start();

    /*
     * Essa animação movimenta uma cópia desfocada
     * da própria imagem. Assim, parece que a luz
     * do horizonte está mudando.
     */
    const lightAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(lightOpacity, {
            toValue: 0.25,
            duration: 2600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(lightPosition, {
            toValue: 7,
            duration: 2600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(lightOpacity, {
            toValue: 0.08,
            duration: 2600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(lightPosition, {
            toValue: -7,
            duration: 2600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    const lightTimer = setTimeout(() => {
      lightAnimation.start();
    }, 2500);

    return () => {
      clearTimeout(lightTimer);
      entranceAnimation.stop();
      lightAnimation.stop();
    };
  }, [
    contentOpacity,
    contentPosition,
    earthOpacity,
    earthPosition,
    earthScale,
    lightOpacity,
    lightPosition,
    logoOpacity,
    logoProgress,
  ]);

  /*
   * A logo começa centralizada e termina
   * no topo da página.
   */
  const logoTranslateY = logoProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT / 2 - 110, 0],
  });

  function abrirCadastro() {
    router.push("/cadastro");
  }

  function abrirLogin() {
    router.push("/login");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      <View style={styles.container}>
        {/* Terra com animação de entrada */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.earthContainer,
            {
              opacity: earthOpacity,
              transform: [
                { translateY: earthPosition },
                { scale: earthScale },
              ],
            },
          ]}
        >
          {/*
           * Cópia desfocada da Terra.
           * Apenas ela se movimenta para criar o efeito de luz.
           */}
          <Animated.Image
            source={require("../../assets/earth-sunset.png")}
            style={[
              styles.earthLightImage,
              {
                opacity: lightOpacity,
                transform: [
                  { translateX: lightPosition },
                  { scale: 1.04 },
                ],
              },
            ]}
            resizeMode="cover"
            blurRadius={18}
          />

          {/* Imagem principal da Terra */}
          <Image
            source={require("../../assets/earth-sunset.png")}
            style={styles.earthImage}
            resizeMode="cover"
          />

          {/* Camada para manter o texto legível */}
          <View style={styles.earthDarkOverlay} />
        </Animated.View>

        {/* Logo da Mastercard */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }],
            },
          ]}
        >
          <Image
            source={require("../../assets/master.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Conteúdo da página */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentPosition }],
            },
          ]}
        >
          <View style={styles.hero}>
            <Text style={styles.title}>
              Experiências que{"\n"}
              despertam suas{"\n"}
              paixões
            </Text>
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={abrirCadastro}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Comece a sua jornada
              </Text>
            </Pressable>

            <Pressable
              onPress={abrirLogin}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.loginText}>
                Já tenho uma conta
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },

  container: {
    flex: 1,
    backgroundColor: "#050505",
    overflow: "hidden",
  },

  /*
   * Área ocupada pela imagem da Terra.
   */
  earthContainer: {
    position: "absolute",
    top: 115,
    left: -155,

    width: "150%",
    height: "68%",

    overflow: "hidden",
  },

  /*
   * Imagem desfocada colocada atrás
   * da imagem principal.
   */
  earthLightImage: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    width: "100%",
    height: "100%",
  },

  earthImage: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    width: "100%",
    height: "100%",
  },

  /*
   * Escurece a imagem para o texto
   * permanecer fácil de ler.
   */
  earthDarkOverlay: {
    position: "absolute",

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    backgroundColor: "rgba(0, 0, 0, 0.22)",
  },

  /*
   * Posição final da logo.
   */
  logoContainer: {
    position: "absolute",

    top: 30,
    left: 0,
    right: 0,

    zIndex: 10,

    alignItems: "center",
  },

  logo: {
    width: 132,
    height: 55,
  },

  content: {
    flex: 1,
    paddingTop: 105,
    zIndex: 5,
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 38,
  },

  title: {
    color: "#FFFFFF",

    fontSize: 29,
    lineHeight: 39,
    fontWeight: "700",
    letterSpacing: -0.5,

    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 10,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 18,
    gap: 9,
  },

  primaryButton: {
    width: "100%",
    height: 54,

    borderRadius: 9,
    backgroundColor: "#FF7A00",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#FF7A00",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 4,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  loginButton: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: "#E0E0E0",
    fontSize: 13,
    fontWeight: "400",
  },

  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});