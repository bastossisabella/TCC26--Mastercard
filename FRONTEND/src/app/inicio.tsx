import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  Modal,
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

const RESERVAS_KEY = "@mastercard:reservas";

type Reserva = {
  id: string;
  restaurante: string;
  dataHora: string;
  pessoas: number;
  status: "simulada" | "pendente" | "confirmada" | "cancelada";
};

function reservaValida(valor: unknown): valor is Reserva {
  if (typeof valor !== "object" || valor === null) {
    return false;
  }

  const reserva = valor as Partial<Reserva>;

  return (
    typeof reserva.id === "string" &&
    typeof reserva.restaurante === "string" &&
    reserva.restaurante.trim().length > 0 &&
    typeof reserva.dataHora === "string" &&
    Number.isFinite(Date.parse(reserva.dataHora)) &&
    typeof reserva.pessoas === "number" &&
    Number.isInteger(reserva.pessoas) &&
    reserva.pessoas > 0 &&
    (
      reserva.status === "simulada" ||
      reserva.status === "pendente" ||
      reserva.status === "confirmada" ||
      reserva.status === "cancelada"
    )
  );
}

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

// Descrições demonstrativas para substituir pelos dados reais.
const partners = [
  {
    name: "Fasano",
    initials: "FASANO",
    color: "#102017",
    textColor: "#CFAC64",
    description:
      "Uma experiência sofisticada para aproveitar um jantar especial.",
  },
  {
    name: "D.O.M.",
    initials: "D.O.M.",
    color: "#101010",
    textColor: "#FFFFFF",
    description:
      "Uma proposta gastronômica para descobrir novos sabores.",
  },
  {
    name: "Maní",
    initials: "MANÍ",
    color: "#0A1720",
    textColor: "#E3AA42",
    description:
      "Uma experiência acolhedora para compartilhar bons momentos à mesa.",
  },
  {
    name: "Evvai",
    initials: "EVVAI",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma proposta contemporânea para explorar novas combinações.",
  },
];

type Partner = (typeof partners)[number];

export default function Master() {
  const { nome } = useLocalSearchParams<{
    nome?: string | string[];
  }>();

  const nomeRecebido = Array.isArray(nome) ? nome[0] : nome;

  const primeiroNome =
    nomeRecebido?.trim().split(/\s+/)[0] || "Usuário";

  const [currentSlide, setCurrentSlide] = useState(0);

  const [parceiroSelecionado, setParceiroSelecionado] =
    useState<Partner | null>(null);

  const [proximaReserva, setProximaReserva] =
    useState<Reserva | null>(null);

  const [carregandoReservas, setCarregandoReservas] =
    useState(true);

  const [erroReservas, setErroReservas] = useState(false);

  const currentItem = carouselItems[currentSlide];

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      async function carregarReservas() {
        setCarregandoReservas(true);
        setErroReservas(false);

        try {
          const dados = await AsyncStorage.getItem(RESERVAS_KEY);
          const resultado: unknown = dados ? JSON.parse(dados) : [];

          if (!Array.isArray(resultado)) {
            throw new Error("Formato de reservas inválido.");
          }

          const agora = Date.now();

          const futuras = resultado
            .filter(reservaValida)
            .filter(
              (reserva) =>
                reserva.status !== "cancelada" &&
                Date.parse(reserva.dataHora) > agora
            )
            .sort(
              (a, b) =>
                Date.parse(a.dataHora) - Date.parse(b.dataHora)
            );

          if (ativo) {
            setProximaReserva(futuras[0] ?? null);
          }
        } catch {
          if (ativo) {
            setProximaReserva(null);
            setErroReservas(true);
          }
        } finally {
          if (ativo) {
            setCarregandoReservas(false);
          }
        }
      }

      void carregarReservas();

      return () => {
        ativo = false;
      };
    }, [])
  );

  const textoStatus = proximaReserva
    ? {
        simulada: "Reserva simulada",
        pendente: "Pendente",
        confirmada: "Confirmada",
        cancelada: "Cancelada",
      }[proximaReserva.status]
    : "";

  const corStatus =
    proximaReserva?.status === "confirmada"
      ? COLORS.green
      : COLORS.orange;

  function previousSlide() {
    setCurrentSlide(
      (current) =>
        (current - 1 + carouselItems.length) % carouselItems.length
    );
  }

  function nextSlide() {
    setCurrentSlide(
      (current) => (current + 1) % carouselItems.length
    );
  }

  function fecharModalParceiro() {
    setParceiroSelecionado(null);
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
                accessibilityRole="button"
                accessibilityLabel="Destaque anterior"
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
                accessibilityRole="button"
                accessibilityLabel="Próximo destaque"
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
                  onPress={() => setParceiroSelecionado(partner)}
                  accessibilityRole="button"
                  accessibilityLabel={`Ver informações de ${partner.name}`}
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
                      { backgroundColor: partner.color },
                    ]}
                  >
                    <Text
                      style={[
                        styles.partnerInitials,
                        { color: partner.textColor },
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

              {proximaReserva && !carregandoReservas && (
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
              )}
            </View>

            {carregandoReservas ? (
              <View style={styles.reservationCard}>
                <Text style={styles.sectionSubtitle}>
                  Carregando suas reservas...
                </Text>
              </View>
            ) : erroReservas ? (
              <View style={styles.reservationCard}>
                <Text style={styles.restaurantName}>
                  Não foi possível carregar suas reservas
                </Text>

                <Text style={styles.emptyDescription}>
                  Tente abrir esta página novamente.
                </Text>
              </View>
            ) : proximaReserva ? (
              <LinearGradient
                colors={["#1B1B1B", "#101010"]}
                style={styles.reservationCard}
              >
                <View style={styles.reservationHeader}>
                  <View style={styles.restaurantLogo}>
                    <Ionicons
                      name="restaurant-outline"
                      size={27}
                      color={COLORS.orange}
                    />
                  </View>

                  <View style={styles.restaurantInformation}>
                    <Text style={styles.restaurantName}>
                      {proximaReserva.restaurante}
                    </Text>

                    <View style={styles.statusContainer}>
                      <Text
                        style={[
                          styles.statusText,
                          { color: corStatus },
                        ]}
                      >
                        {textoStatus}
                      </Text>

                      <Ionicons
                        name={
                          proximaReserva.status === "confirmada"
                            ? "checkmark-circle-outline"
                            : "time-outline"
                        }
                        size={18}
                        color={corStatus}
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
                        {new Date(
                          proximaReserva.dataHora
                        ).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
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
                        {new Date(
                          proximaReserva.dataHora
                        ).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
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
                        {proximaReserva.pessoas}{" "}
                        {proximaReserva.pessoas === 1
                          ? "pessoa"
                          : "pessoas"}
                      </Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => router.push("/reservar")}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.reservationButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.reservationButtonText}>
                    Ver minhas reservas
                  </Text>
                </Pressable>
              </LinearGradient>
            ) : (
              <LinearGradient
                colors={["#1B1B1B", "#101010"]}
                style={styles.reservationCard}
              >
                <View style={styles.emptyReservation}>
                  <View style={styles.emptyIcon}>
                    <Ionicons
                      name="calendar-outline"
                      size={34}
                      color={COLORS.orange}
                    />
                  </View>

                  <Text style={styles.emptyTitle}>
                    Você ainda não tem reservas
                  </Text>

                  <Text style={styles.emptyDescription}>
                    Quando você fizer uma reserva, ela aparecerá
                    aqui. Explore os restaurantes e planeje
                    sua próxima experiência.
                  </Text>
                </View>

                <Pressable
                  onPress={() => router.push("/explorar")}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.reservationButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.reservationButtonText}>
                    Explorar restaurantes
                  </Text>
                </Pressable>
              </LinearGradient>
            )}
          </View>
        </ScrollView>

        {/* Navegação inferior */}
        <View style={styles.bottomNavigation}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Início"
            style={styles.navigationItem}
          >
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
            accessibilityRole="button"
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
            accessibilityRole="button"
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
            accessibilityRole="button"
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

      {/* Modal dos restaurantes */}
      <Modal
        visible={parceiroSelecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={fecharModalParceiro}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={fecharModalParceiro}
            accessibilityRole="button"
            accessibilityLabel="Fechar informações do restaurante"
          />

          {parceiroSelecionado && (
            <View
              style={styles.modalCard}
              accessibilityViewIsModal
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTitle}>
                  Conheça o parceiro
                </Text>

                <Pressable
                  onPress={fecharModalParceiro}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                  style={({ pressed }) => [
                    styles.modalClose,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={COLORS.white}
                  />
                </Pressable>
              </View>

              <ScrollView
                style={styles.modalScroll}
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={[
                    styles.modalBrand,
                    {
                      backgroundColor:
                        parceiroSelecionado.color,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalBrandText,
                      {
                        color:
                          parceiroSelecionado.textColor,
                      },
                    ]}
                  >
                    {parceiroSelecionado.initials}
                  </Text>
                </View>

                <Text
                  style={styles.modalName}
                  accessibilityRole="header"
                >
                  {parceiroSelecionado.name}
                </Text>

                <View style={styles.modalBadge}>
                  <Ionicons
                    name="restaurant-outline"
                    size={16}
                    color={COLORS.orange}
                  />
                  <Text style={styles.modalBadgeText}>
                    Experiência gastronômica
                  </Text>
                </View>

                <Text style={styles.modalSectionTitle}>
                  Sobre o restaurante
                </Text>

                <Text style={styles.modalDescription}>
                  {parceiroSelecionado.description}
                </Text>

                <View style={styles.divider} />

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="location-outline"
                    size={23}
                    color={COLORS.orange}
                  />

                  <View style={styles.modalInfoTexts}>
                    <Text style={styles.modalInfoLabel}>
                      Endereço
                    </Text>
                    <Text style={styles.modalDescription}>
                      Endereço a cadastrar
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="time-outline"
                    size={23}
                    color={COLORS.orange}
                  />

                  <View style={styles.modalInfoTexts}>
                    <Text style={styles.modalInfoLabel}>
                      Funcionamento
                    </Text>
                    <Text style={styles.modalDescription}>
                      Horários a cadastrar
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfoRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={23}
                    color={COLORS.orange}
                  />

                  <View style={styles.modalInfoTexts}>
                    <Text style={styles.modalInfoLabel}>
                      Reservas
                    </Text>
                    <Text style={styles.modalDescription}>
                      Disponibilidade a consultar
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalNotice}>
                  Conteúdo demonstrativo. As informações
                  reais do restaurante serão adicionadas depois.
                </Text>
              </ScrollView>

              <View style={styles.modalFooter}>
                <Pressable
                  onPress={fecharModalParceiro}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.modalButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.modalButtonText}>
                    Voltar ao início
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>
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
    backgroundColor: "rgba(255,130,0,0.12)",
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
    flexShrink: 1,
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
    textAlign: "center",
  },
  detailDivider: {
    width: 1,
    height: 48,
    backgroundColor: COLORS.border,
  },
  reservationButton: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
    textAlign: "center",
  },
  emptyReservation: {
    alignItems: "center",
    paddingVertical: 12,
  },
  emptyIcon: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(255,130,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyDescription: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
    textAlign: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  modalCard: {
    width: "100%",
    maxWidth: 480,
    maxHeight: "90%",
    flexShrink: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalHeaderTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  modalScroll: {
    flexShrink: 1,
  },
  modalContent: {
    padding: 22,
  },
  modalBrand: {
    minHeight: 130,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBrandText: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 2,
    textAlign: "center",
  },
  modalName: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "700",
    marginTop: 22,
  },
  modalBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#2A1C0F",
  },
  modalBadgeText: {
    flexShrink: 1,
    color: COLORS.orange,
    fontSize: 12,
  },
  modalSectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 10,
  },
  modalDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
  },
  modalInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 20,
  },
  modalInfoTexts: {
    flex: 1,
  },
  modalInfoLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  modalNotice: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  modalFooter: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalButton: {
    minHeight: 50,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "700",
  },
});