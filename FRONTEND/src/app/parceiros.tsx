import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Modal,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

const COLORS = {
  background: "#050505",
  surface: "#151515",
  surfaceLight: "#1F1F1F",
  border: "#363636",
  orange: "#FF8200",
  white: "#FFFFFF",
  muted: "#A5A5A5",
};

// Informações demonstrativas para substituir pelos dados reais.
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
      "Uma proposta de experiência gastronômica para conhecer novos sabores.",
  },
  {
    name: "Maní",
    initials: "MANÍ",
    color: "#0A1720",
    textColor: "#E3AA42",
    description:
      "Um ambiente acolhedor para compartilhar uma refeição especial.",
  },
  {
    name: "Evvai",
    initials: "EVVAI",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma experiência contemporânea para quem gosta de descobrir combinações.",
  },
  {
    name: "A Figueira Rubaiyat",
    initials: "A FR",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma opção para reunir pessoas e aproveitar uma refeição com tranquilidade.",
  },
  {
    name: "Aguzzo Jardins",
    initials: "AGUZZO",
    color: "#101010",
    textColor: "#E8CDA1",
    description:
      "Uma sugestão para encontros, almoços e jantares especiais.",
  },
  {
    name: "Basilicata",
    initials: "BASILICATA",
    color: "#0A1720",
    textColor: "#E8CDA1",
    description:
      "Uma experiência acolhedora para aproveitar bons momentos à mesa.",
  },
  {
    name: "Cabruca",
    initials: "CABRUCA",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma sugestão para explorar sabores e compartilhar experiências.",
  },
  {
    name: "Casa Manzano",
    initials: "CASA MANZANO",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Um espaço para celebrar encontros e ocasiões especiais.",
  },
  {
    name: "Cór Gastronomia",
    initials: "CÓR GASTRONOMIA",
    color: "#101010",
    textColor: "#E8CDA1",
    description:
      "Uma proposta gastronômica para quem busca uma experiência diferente.",
  },
  {
    name: "Di Paolo Pinheiros",
    initials: "DI PAOLO PINHEIROS",
    color: "#0A1720",
    textColor: "#E8CDA1",
    description:
      "Uma sugestão para refeições em família ou encontros entre amigos.",
  },
  {
    name: "Espetto Carioca",
    initials: "ESPETTO CARIOCA",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma experiência descontraída para compartilhar com os amigos.",
  },
  {
    name: "Harry's Bar",
    initials: "HARRY'S BAR",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma sugestão para aproveitar um encontro em um ambiente especial.",
  },
  {
    name: "Ícone Asiático",
    initials: "ÍCONE ASIÁTICO",
    color: "#101010",
    textColor: "#E8CDA1",
    description:
      "Uma proposta de experiência para explorar novos sabores.",
  },
  {
    name: "Jacarandá",
    initials: "JACARANDÁ",
    color: "#0A1720",
    textColor: "#E8CDA1",
    description:
      "Uma sugestão para aproveitar uma refeição em boa companhia.",
  },
  {
    name: "La Parrilla Argentina",
    initials: "LA PARRILLA ARG",
    color: "#102017",
    textColor: "#E8CDA1",
    description:
      "Uma opção para reunir pessoas em torno de uma refeição especial.",
  },
];

type Partner = (typeof partners)[number];

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Parceiros() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [parceiroSelecionado, setParceiroSelecionado] =
    useState<Partner | null>(null);

  const parceirosFiltrados = partners.filter((partner) =>
    normalizar(partner.name).includes(normalizar(busca.trim()))
  );

  function abrirModal(parceiro: Partner) {
    Keyboard.dismiss();
    setParceiroSelecionado(parceiro);
  }

  function fecharModal() {
    setParceiroSelecionado(null);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={COLORS.white}
          />
        </Pressable>

        <Image
          source={require("../../assets/master.png")}
          style={styles.mastercardLogo}
          resizeMode="contain"
        />
      </View>

      {/* Busca */}
      <View style={styles.searchArea}>
        <Text style={styles.title}>Parceiros</Text>

        <Text style={styles.subtitle}>
          Experiências escolhidas para você
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={22}
            color={COLORS.muted}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar parceiro"
            placeholderTextColor={COLORS.muted}
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Buscar parceiro"
          />

          {busca.length > 0 && (
            <Pressable
              onPress={() => setBusca("")}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Limpar busca"
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.muted}
              />
            </Pressable>
          )}
        </View>

        <Text style={styles.resultsText}>
          {parceirosFiltrados.length}{" "}
          {parceirosFiltrados.length === 1
            ? "parceiro disponível"
            : "parceiros disponíveis"}
        </Text>
      </View>

      {/* Lista de parceiros */}
      <FlatList
        style={styles.list}
        data={parceirosFiltrados}
        keyExtractor={(item) => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.partnersList}
        columnWrapperStyle={styles.partnersRow}
        renderItem={({ item: partner }) => (
          <Pressable
            onPress={() => abrirModal(partner)}
            accessibilityRole="button"
            accessibilityLabel={`Ver informações de ${partner.name}`}
            style={({ pressed }) => [
              styles.partnerCard,
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
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={38}
              color={COLORS.muted}
            />

            <Text style={styles.emptyText}>
              Nenhum parceiro encontrado.
            </Text>
          </View>
        }
      />

      {/* Informações do restaurante selecionado */}
      <Modal
        visible={parceiroSelecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <SafeAreaView style={styles.modalOverlay}>
          {/* Fundo clicável para fechar */}
          <Pressable
            style={styles.modalBackdrop}
            onPress={fecharModal}
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
                  onPress={fecharModal}
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
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalContent}
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
                    size={15}
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

                <View style={styles.modalDivider} />

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

                    <Text style={styles.modalInfoValue}>
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

                    <Text style={styles.modalInfoValue}>
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

                    <Text style={styles.modalInfoValue}>
                      Disponibilidade a consultar
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalNotice}>
                  Conteúdo demonstrativo. As informações
                  reais do restaurante serão adicionadas
                  depois.
                </Text>
              </ScrollView>

              <View style={styles.modalFooter}>
                <Pressable
                  onPress={fecharModal}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.modalButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.modalButtonText}>
                    Voltar aos parceiros
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

  header: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    position: "absolute",
    left: 20,
    padding: 6,
  },

  mastercardLogo: {
    width: 70,
    height: 38,
  },

  searchArea: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },

  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "700",
  },

  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 6,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 48,
    marginTop: 24,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: {
    flex: 1,
    minWidth: 0,
    color: COLORS.white,
    fontSize: 15,
    paddingVertical: 12,
  },

  resultsText: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 20,
    marginBottom: 18,
  },

  list: {
    flex: 1,
  },

  partnersList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  partnersRow: {
    justifyContent: "space-between",
    marginBottom: 20,
  },

  partnerCard: {
    width: "47%",
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  partnerImage: {
    minHeight: 105,
    paddingHorizontal: 10,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  partnerInitials: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "center",
  },

  partnerBottom: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },

  partnerName: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
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
    fontWeight: "500",
  },

  modalSectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "600",
    marginTop: 26,
    marginBottom: 10,
  },

  modalDescription: {
    color: COLORS.muted,
    fontSize: 15,
    lineHeight: 24,
  },

  modalDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
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

  modalInfoValue: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
  },

  modalNotice: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  modalFooter: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  modalButton: {
    minHeight: 50,
    borderRadius: 14,
    padding: 14,
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