import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  background: "#050505",
  surface: "#151515",
  surfaceLight: "#1F1F1F",
  border: "#363636",
  orange: "#FF8200",
  red: "#EB001B",
  white: "#FFFFFF",
  muted: "#A5A5A5",
  green: "#45C75A",
};

const carouselItems = [
  {
    label: "EXPERIÊNCIA EM DESTAQUE",
    title: "Restaurantes selecionados para você",
    description:
      "Descubra endereços exclusivos e viva experiências gastronômicas únicas.",
  },
  {
    label: "BENEFÍCIOS MASTERCARD",
    title: "Ofertas especiais para o seu dia",
    description:
      "Aproveite vantagens exclusivas em restaurantes selecionados.",
  },
  {
    label: "CONCIERGE",
    title: "Uma experiência pensada para você",
    description:
      "Conte com nosso atendimento para organizar momentos especiais.",
  },
];

const partners = [
  {
    name: "Fasano",
    initials: "FASANO",
    color: "#102017",
    textColor: "#CFAC64",
  },
  {
    name: "D.O.M.",
    initials: "D.O.M.",
    color: "#101010",
    textColor: "#FFFFFF",
  },
  {
    name: "Maní",
    initials: "MANÍ",
    color: "#132115",
    textColor: "#E3AA42",
  },
  {
    name: "Evvai",
    initials: "EVVAI",
    color: "#0A1720",
    textColor: "#E8CDA1",
  },
];

export default function Master() {
  const { nome } = useLocalSearchParams<{
    nome?: string | string[];
  }>();

  const nomeRecebido = Array.isArray(nome)
    ? nome[0]
    : nome;

  const primeiroNome =
    nomeRecebido?.trim().split(/\s+/)[0] || "Usuário";

  const [currentSlide, setCurrentSlide] = useState(0);

  const currentItem = carouselItems[currentSlide];

  function previousSlide() {
    setCurrentSlide((current) => {
      if (current === 0) {
        return carouselItems.length - 1;
      }

      return current - 1;
    });
  }

  function nextSlide() {
    setCurrentSlide((current) => {
      if (current === carouselItems.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.userArea}>
              <View style={styles.avatar}>
                <Ionicons
                  name="person"
                  size={22}
                  color={COLORS.white}
                />
              </View>

              <View style={styles.greetingArea}>
                <Text style={styles.greeting}>
                  Olá, {primeiroNome}
                </Text>

                <Text style={styles.greetingSubtitle}>
                  O que deseja fazer hoje?
                </Text>
              </View>
            </View>

            <Image
              source={require("../../assets/master.png")}
              style={styles.mastercardLogo}
              resizeMode="contain"
            />
          </View>

          {/* Carrossel */}
          <LinearGradient
            colors={["#202020", "#111111", "#0A0A0A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.carousel}
          >
            {/* Decoração Mastercard */}
            <View style={styles.redCircle} />
            <View style={styles.orangeCircle} />
            <View style={styles.circleOutline} />

            <Text style={styles.carouselLabel}>
              {currentItem.label}
            </Text>

            <Text style={styles.carouselTitle}>
              {currentItem.title}
            </Text>

            <Text style={styles.carouselDescription}>
              {currentItem.description}
            </Text>

            <View style={styles.carouselControls}>
              <Pressable
                onPress={previousSlide}
                style={({ pressed }) => [
                  styles.arrowButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={COLORS.white}
                />
              </Pressable>

              <Pressable
                onPress={nextSlide}
                style={({ pressed }) => [
                  styles.arrowButton,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.white}
                />
              </Pressable>
            </View>

            {/* Indicadores */}
            <View style={styles.pagination}>
              {carouselItems.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentSlide &&
                      styles.activePaginationDot,
                  ]}
                />
              ))}
            </View>
          </LinearGradient>

          {/* Parceiros */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTexts}>
                <Text style={styles.sectionTitle}>
                  Parceiros para o seu dia
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Experiências escolhidas para você
                </Text>
              </View>

              <Pressable
                onPress={() => router.push("/parceiros")}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Ver todos os parceiros"
                style={({ pressed }) => [
                  styles.seeAllButton,
                  pressed && styles.seeAllButtonPressed,
                ]}
              >
                <Text style={styles.seeAllText}>
                  Ver todos
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.partnersList}
            >
              {partners.map((partner, index) => (
                <Pressable
                  key={partner.name}
                  style={({ pressed }) => [
                    styles.partnerCard,
                    index < partners.length - 1 &&
                      styles.partnerCardSpacing,
                    pressed && styles.pressed,
                  ]}
                >
                  <View
                    style={[
                      styles.partnerImage,
                      {
                        backgroundColor: partner.color,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.partnerInitials,
                        {
                          color: partner.textColor,
                        },
                      ]}
                    >
                      {partner.initials}
                    </Text>
                  </View>

                  <View style={styles.partnerBottom}>
                    <Text style={styles.partnerName}>
                      {partner.name}
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={COLORS.muted}
                    />
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Próxima reserva */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTexts}>
                <Text style={styles.sectionTitle}>
                  Próxima reserva
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Acompanhe suas experiências
                </Text>
              </View>

              <Pressable
                onPress={() => router.push("/reservar")}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Ver todas as reservas"
                style={({ pressed }) => [
                  styles.seeAllButton,
                  pressed && styles.seeAllButtonPressed,
                ]}
              >
                <Text style={styles.seeAllText}>
                  Ver todas
                </Text>
              </Pressable>
            </View>

            <LinearGradient
              colors={["#1B1B1B", "#101010"]}
              style={styles.reservationCard}
            >
              <View style={styles.reservationHeader}>
                <View style={styles.restaurantLogo}>
                  <Text style={styles.restaurantLogoText}>
                    FASANO
                  </Text>
                </View>

                <View style={styles.restaurantInformation}>
                  <Text style={styles.restaurantName}>
                    Restaurante Fasano
                  </Text>

                  <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                      Confirmada
                    </Text>

                    <Ionicons
                      name="checkmark-circle-outline"
                      size={18}
                      color={COLORS.green}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.reservationDetails}>
                <View style={styles.detail}>
                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color={COLORS.muted}
                  />

                  <View style={styles.detailTextArea}>
                    <Text style={styles.detailLabel}>
                      Data
                    </Text>

                    <Text style={styles.detailValue}>
                      28 de agosto
                    </Text>
                  </View>
                </View>

                <View style={styles.detailDivider} />

                <View style={styles.detail}>
                  <Ionicons
                    name="time-outline"
                    size={25}
                    color={COLORS.muted}
                  />

                  <View style={styles.detailTextArea}>
                    <Text style={styles.detailLabel}>
                      Horário
                    </Text>

                    <Text style={styles.detailValue}>
                      20h30
                    </Text>
                  </View>
                </View>

                <View style={styles.detailDivider} />

                <View style={styles.detail}>
                  <Ionicons
                    name="people-outline"
                    size={25}
                    color={COLORS.muted}
                  />

                  <View style={styles.detailTextArea}>
                    <Text style={styles.detailLabel}>
                      Pessoas
                    </Text>

                    <Text style={styles.detailValue}>
                      2 pessoas
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                onPress={() => router.push("/reservar")}
                style={({ pressed }) => [
                  styles.reservationButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.reservationButtonText}>
                  Ver detalhes da reserva
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Navegação inferior */}
        <View style={styles.bottomNavigation}>
          <Pressable style={styles.navigationItem}>
            <Ionicons
              name="home-outline"
              size={25}
              color={COLORS.orange}
            />

            <Text style={styles.activeNavigationText}>
              Início
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/ofertas")}
            style={({ pressed }) => [
              styles.navigationItem,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="pricetag-outline"
              size={25}
              color={COLORS.muted}
            />

            <Text style={styles.navigationText}>
              Ofertas
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/explorar")}
            style={({ pressed }) => [
              styles.navigationItem,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="restaurant-outline"
              size={26}
              color={COLORS.muted}
            />

            <Text style={styles.navigationText}>
              Explorar
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/reservar")}
            style={({ pressed }) => [
              styles.navigationItem,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="receipt-outline"
              size={25}
              color={COLORS.muted}
            />

            <Text style={styles.navigationText}>
              Reservas
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  header: {
    minHeight: 95,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,

    backgroundColor: COLORS.surfaceLight,

    borderWidth: 1,
    borderColor: COLORS.border,

    alignItems: "center",
    justifyContent: "center",
  },

  greetingArea: {
    marginLeft: 12,
    flex: 1,
  },

  greeting: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
  },

  greetingSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },

  mastercardLogo: {
    width: 70,
    height: 38,
    marginLeft: 10,
  },

  carousel: {
    minHeight: 320,

    paddingHorizontal: 22,
    paddingVertical: 23,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: COLORS.border,

    overflow: "hidden",
  },

  redCircle: {
    position: "absolute",

    width: 240,
    height: 240,
    borderRadius: 120,

    right: -90,
    bottom: -75,

    backgroundColor: COLORS.red,
    opacity: 0.22,
  },

  orangeCircle: {
    position: "absolute",

    width: 170,
    height: 170,
    borderRadius: 85,

    right: -65,
    bottom: -20,

    backgroundColor: COLORS.orange,
    opacity: 0.14,
  },

  circleOutline: {
    position: "absolute",

    width: 210,
    height: 210,
    borderRadius: 105,

    right: -50,
    top: -30,

    borderWidth: 1,
    borderColor: COLORS.orange,

    opacity: 0.6,
  },

  carouselLabel: {
    color: COLORS.orange,

    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 0.8,
  },

  carouselTitle: {
    maxWidth: 310,

    color: COLORS.white,

    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",

    marginTop: 25,
  },

  carouselDescription: {
    maxWidth: 315,

    color: COLORS.muted,

    fontSize: 14,
    lineHeight: 21,

    marginTop: 12,
  },

  carouselControls: {
    marginTop: 25,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  arrowButton: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.08)",

    alignItems: "center",
    justifyContent: "center",
  },

  exploreButton: {
    minWidth: 120,
    height: 47,

    paddingHorizontal: 24,

    borderRadius: 13,

    backgroundColor: COLORS.orange,

    alignItems: "center",
    justifyContent: "center",
  },

  exploreButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },

  pagination: {
    marginTop: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  paginationDot: {
    width: 20,
    height: 4,

    marginHorizontal: 4,

    borderRadius: 2,

    backgroundColor: "#555555",
  },

  activePaginationDot: {
    width: 36,
    backgroundColor: COLORS.orange,
  },

  section: {
    marginTop: 32,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    marginBottom: 16,
  },

  sectionTexts: {
    flex: 1,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "700",
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },

  seeAllText: {
    color: COLORS.orange,
    fontSize: 13,
    fontWeight: "600",
  },

  seeAllButton: {
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",
  },

  seeAllButtonPressed: {
    opacity: 0.7,
    backgroundColor: "rgba(255, 130, 0, 0.12)",
  },

  partnersList: {
    paddingRight: 20,
  },

  partnerCard: {
    width: 135,

    borderRadius: 16,

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    overflow: "hidden",
  },

  partnerCardSpacing: {
    marginRight: 12,
  },

  partnerImage: {
    height: 105,

    alignItems: "center",
    justifyContent: "center",
  },

  partnerInitials: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
  },

  partnerBottom: {
    minHeight: 48,

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  partnerName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },

  reservationCard: {
    padding: 18,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  reservationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  restaurantLogo: {
    width: 62,
    height: 62,
    borderRadius: 31,

    backgroundColor: "#102017",

    borderWidth: 1,
    borderColor: "#405447",

    alignItems: "center",
    justifyContent: "center",
  },

  restaurantLogoText: {
    color: "#CFAC64",
    fontSize: 11,
    letterSpacing: 1,
  },

  restaurantInformation: {
    flex: 1,
    marginLeft: 14,
  },

  restaurantName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 7,
  },

  statusText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: "600",

    marginRight: 7,
  },

  divider: {
    height: 1,

    backgroundColor: COLORS.border,

    marginVertical: 18,
  },

  reservationDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detail: {
    flex: 1,
    alignItems: "center",
  },

  detailTextArea: {
    alignItems: "center",
    marginTop: 7,
  },

  detailLabel: {
    color: COLORS.muted,
    fontSize: 10,
  },

  detailValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  detailDivider: {
    width: 1,
    height: 48,

    backgroundColor: COLORS.border,
  },

  reservationButton: {
    height: 48,

    marginTop: 20,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: COLORS.orange,

    alignItems: "center",
    justifyContent: "center",
  },

  reservationButtonText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "700",
  },

  bottomNavigation: {
    minHeight: 75,

    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 8,

    backgroundColor: "#0D0D0D",

    borderTopWidth: 1,
    borderTopColor: COLORS.border,

    flexDirection: "row",
  },

  navigationItem: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },

  navigationText: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },

  activeNavigationText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
