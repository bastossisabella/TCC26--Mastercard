import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

const ofertas = [
  {
    id: "aproveite",
    title: "Bacio di Latte em dobro!",
    description:
      "O inverno fica mais gostoso com Bacio di Latte em dobro.",
    image: require("../../assets/bacio.jpg"),
  },
  {
    id: "sobremesa",
    title: "Uma pequena lembrança para adoçar o dia",
    description:
      "Um mini Quadrato Cioccolato comprando um prato participante.",
    image: require("../../assets/ccolato.jpg"),
  },
  {
    id: "outback",
    title: "Outback + Havanna = sobremesa perfeita",
    description:
      "Ganhe um Havanna Thunder ao comprar um prato principal ou aperitivo.",
    image: require("../../assets/outback.jpg"),
  },
  {
    id: "china",
    title: "20% OFF no site do China in Box",
    description: "20% de desconto no China in Box.",
    image: require("../../assets/china.jpg"),
  },
  {
    id: "japonesa",
    title: "Gurumê — A culinária japonesa que você merece",
    description:
      "20% OFF em compras acima de R$120 apenas na primeira compra.",
    image: require("../../assets/gurume.jpeg"),
  },
  {
    id: "encontros",
    title: "Surpreenda Restaurantes",
    description: "Surpreenda Restaurantes 2X1 com Mastercard.",
    image: require("../../assets/encontros.jpeg"),
  },
];

type Oferta = (typeof ofertas)[number];

function ImagemProporcional({
  source,
  label,
}: {
  source: number;
  label: string;
}) {
  const [proporcao, setProporcao] = useState(1);

  return (
    <Image
      source={source}
      contentFit="contain"
      accessibilityLabel={label}
      onLoad={(evento) => {
        const largura = evento.source?.width;
        const altura = evento.source?.height;

        if (
          typeof largura === "number" &&
          typeof altura === "number" &&
          Number.isFinite(largura) &&
          Number.isFinite(altura) &&
          largura > 0 &&
          altura > 0
        ) {
          setProporcao(largura / altura);
        }
      }}
      style={[
        styles.offerImage,
        { aspectRatio: proporcao },
      ]}
    />
  );
}

export default function Ofertas() {
  const router = useRouter();

  function abrirOferta(oferta: Oferta) {
    router.push({
      pathname: "/recarga",
      params: { id: oferta.id },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      <View style={styles.header}>
        <Image
          source={require("../../assets/master.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Mastercard"
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>
          PARA O SEU DIA
        </Text>

        <Text style={styles.title}>
          Ofertas e experiências
        </Text>

        <Text style={styles.subtitle}>
          Toque na imagem para conhecer os detalhes da oferta.
        </Text>

        {ofertas.map((oferta) => (
          <View
            key={oferta.id}
            style={styles.offerSection}
          >
            <Text style={styles.offerTitle}>
              {oferta.title}
            </Text>

            <Text style={styles.offerDescription}>
              {oferta.description}
            </Text>

            <Pressable
              onPress={() => abrirOferta(oferta)}
              accessibilityRole="button"
              accessibilityLabel={`Ver detalhes de ${oferta.title}`}
              style={({ pressed }) => [
                styles.imageCard,
                pressed && styles.pressed,
              ]}
            >
              <ImagemProporcional
                source={oferta.image}
                label={oferta.title}
              />
            </Pressable>
          </View>
        ))}

        <View style={styles.campaignSection}>
          <Text style={styles.campaignTitle}>
            Campanha Mastercard
          </Text>

          <Text style={styles.offerDescription}>
            Experiências para transformar encontros em boas
            lembranças.
          </Text>

          <View style={styles.imageCard}>
            <ImagemProporcional
              source={require("../../assets/encontros.jpeg")}
              label="Campanha Mastercard"
            />
          </View>
        </View>

        <Text style={styles.notice}>
          Conteúdos demonstrativos. Consulte as condições
          oficiais antes de utilizar qualquer benefício.
        </Text>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <Pressable
          onPress={() => router.replace("/inicio")}
          accessibilityRole="button"
          accessibilityLabel="Início"
          style={({ pressed }) => [
            styles.navigationItem,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="home-outline"
            size={25}
            color="#A5A5A5"
          />

          <Text style={styles.navigationText}>
            Início
          </Text>
        </Pressable>

        <View
          style={styles.navigationItem}
          accessibilityLabel="Ofertas, página atual"
        >
          <Ionicons
            name="pricetag-outline"
            size={25}
            color="#FF8200"
          />

          <Text style={styles.activeNavigationText}>
            Ofertas
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/explorar")}
          accessibilityRole="button"
          accessibilityLabel="Explorar"
          style={({ pressed }) => [
            styles.navigationItem,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="restaurant-outline"
            size={26}
            color="#A5A5A5"
          />

          <Text style={styles.navigationText}>
            Explorar
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/reservar")}
          accessibilityRole="button"
          accessibilityLabel="Reservas"
          style={({ pressed }) => [
            styles.navigationItem,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="receipt-outline"
            size={25}
            color="#A5A5A5"
          />

          <Text style={styles.navigationText}>
            Reservas
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050505",
  },

  header: {
    minHeight: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#363636",
  },

  logo: {
    width: 70,
    height: 38,
  },

  scroll: {
    flex: 1,
  },

  content: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 32,
  },

  eyebrow: {
    color: "#FF8200",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 9,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "700",
  },

  subtitle: {
    color: "#A5A5A5",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 9,
    marginBottom: 30,
  },

  offerSection: {
    marginBottom: 30,
  },

  offerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
  },

  offerDescription: {
    color: "#A5A5A5",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 14,
  },

  imageCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#151515",
  },

  offerImage: {
    width: "100%",
  },

  campaignSection: {
    marginTop: 6,
    marginBottom: 26,
  },

  campaignTitle: {
    color: "#FF8200",
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "700",
  },

  notice: {
    color: "#A5A5A5",
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 4,
  },

  bottomNavigation: {
    minHeight: 75,
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 8,
    backgroundColor: "#0D0D0D",
    borderTopWidth: 1,
    borderTopColor: "#363636",
    flexDirection: "row",
  },

  navigationItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navigationText: {
    color: "#A5A5A5",
    fontSize: 10,
    marginTop: 4,
  },

  activeNavigationText: {
    color: "#FF8200",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },

  pressed: {
    opacity: 0.75,
  },
});