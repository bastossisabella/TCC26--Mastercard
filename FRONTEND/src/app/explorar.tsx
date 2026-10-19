import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

const COLORS = {
  background: "#050505",
  surface: "#141414",
  border: "#303030",
  white: "#FFFFFF",
  muted: "#A5A5A5",
  orange: "#FF8200",
  gold: "#D5B88B",
};

// Fotos ilustrativas.
const fotos = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=85",
];

type Restaurante = {
  id: string;
  nome: string;
  culinaria: string;
  descricao: string;
  foto: string;
};

const dados: [string, string][] = [
  ["Fasano", "Italiana"],
  ["D.O.M.", "Brasileira"],
  ["Maní", "Contemporânea"],

  // Mais 37 exemplos fictícios.
  ["Casa Aurora", "Contemporânea"],
  ["Villa Serena", "Italiana"],
  ["Jardim do Sabor", "Brasileira"],
  ["Mesa Dourada", "Contemporânea"],
  ["Bistrô Lumière", "Francesa"],
  ["Sakura da Vila", "Japonesa"],
  ["Brasa Nobre", "Carnes"],
  ["Terra & Mar", "Frutos do mar"],
  ["Cantina Bellavista", "Italiana"],
  ["Casa do Alecrim", "Brasileira"],
  ["Oliva do Jardim", "Mediterrânea"],
  ["Bistrô das Flores", "Francesa"],
  ["Porto dos Sabores", "Portuguesa"],
  ["Quintal da Serra", "Brasileira"],
  ["Trattoria Solare", "Italiana"],
  ["Maré Serena", "Frutos do mar"],
  ["Nori do Bosque", "Japonesa"],
  ["Varanda do Chef", "Contemporânea"],
  ["Pátio das Oliveiras", "Mediterrânea"],
  ["Fogo & Lenha", "Carnes"],
  ["Casa Magnólia", "Contemporânea"],
  ["Sabores do Vale", "Brasileira"],
  ["Cantina do Lago", "Italiana"],
  ["Bistrô Âmbar", "Francesa"],
  ["Tempero da Terra", "Brasileira"],
  ["Sushi Horizonte", "Japonesa"],
  ["Brasserie do Pátio", "Francesa"],
  ["Villa das Massas", "Italiana"],
  ["Cais do Peixe", "Frutos do mar"],
  ["Casa do Manjericão", "Mediterrânea"],
  ["Parrilla do Campo", "Carnes"],
  ["Jardim Secreto Bistrô", "Contemporânea"],
  ["Raízes da Vila", "Brasileira"],
  ["Trattoria da Praça", "Italiana"],
  ["Flor de Sal Bistrô", "Contemporânea"],
  ["Estação dos Sabores", "Brasileira"],
  ["Solar do Encontro", "Portuguesa"],
];

const restaurantes: Restaurante[] = dados.map(
  ([nome, culinaria], index) => ({
    id: `restaurante-${index + 1}`,
    nome,
    culinaria,
    descricao:
      "Uma sugestão para compartilhar bons momentos e descobrir uma nova experiência à mesa.",
    foto: fotos[index % fotos.length],
  })
);

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function FotoRestaurante({
  uri,
  nome,
}: {
  uri: string;
  nome: string;
}) {
  const [falhou, setFalhou] = useState(false);

  return (
    <View style={styles.photoContainer}>
      {falhou ? (
        <View style={styles.photoFallback}>
          <Ionicons
            name="restaurant-outline"
            size={40}
            color={COLORS.gold}
          />
          <Text style={styles.photoFallbackText}>
            Foto indisponível
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri }}
          style={styles.photo}
          contentFit="cover"
          transition={200}
          accessibilityLabel={`Foto ilustrativa para ${nome}`}
          onError={() => setFalhou(true)}
        />
      )}

      <View style={styles.photoBadge}>
        <Text style={styles.photoBadgeText}>
          IMAGEM ILUSTRATIVA
        </Text>
      </View>
    </View>
  );
}

export default function Explorar() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] =
    useState<Restaurante | null>(null);

  const encontrados = restaurantes.filter((restaurante) =>
    normalizar(
      `${restaurante.nome} ${restaurante.culinaria}`
    ).includes(normalizar(busca.trim()))
  );

  function fecharModal() {
    setSelecionado(null);
  }

  function voltarInicio() {
    // A tela inicial é inicio.tsx.
    // master.tsx é somente a animação de abertura.
    router.dismissTo("/inicio");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />

      <View style={styles.header}>
        <Image
          source={require("../../assets/master.png")}
          contentFit="contain"
          style={styles.logo}
        />
      </View>

      <View style={styles.topContent}>
        <Text style={styles.eyebrow}>
          EXPERIÊNCIAS À MESA
        </Text>

        <Text style={styles.title}>
          Encontre seu próximo lugar
        </Text>

        <Text style={styles.subtitle}>
          Descubra sabores e planeje momentos especiais.
        </Text>

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color={COLORS.muted}
          />

          <TextInput
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar restaurante"
            placeholderTextColor={COLORS.muted}
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Buscar restaurante"
            style={styles.searchInput}
          />

          {busca.length > 0 && (
            <Pressable
              onPress={() => setBusca("")}
              accessibilityRole="button"
              accessibilityLabel="Limpar busca"
              hitSlop={10}
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
          {encontrados.length}{" "}
          {encontrados.length === 1
            ? "restaurante encontrado"
            : "restaurantes encontrados"}
        </Text>
      </View>

      <FlatList
        style={styles.list}
        data={encontrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.cardsContent}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelecionado(item)}
            accessibilityRole="button"
            accessibilityLabel={`Ver detalhes de ${item.nome}`}
            style={({ pressed }) => [
              styles.restaurantCard,
              pressed && styles.pressed,
            ]}
          >
            <FotoRestaurante
              uri={item.foto}
              nome={item.nome}
            />

            <View style={styles.cardInformation}>
              <View style={styles.cardTexts}>
                <Text style={styles.restaurantCategory}>
                  {item.culinaria}
                </Text>

                <Text style={styles.restaurantName}>
                  {item.nome}
                </Text>

                <Text style={styles.cardSubtitle}>
                  Conheça esta experiência
                </Text>
              </View>

              <View style={styles.cardArrow}>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={COLORS.gold}
                />
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={40}
              color={COLORS.muted}
            />

            <Text style={styles.emptyText}>
              Nenhum restaurante encontrado.
            </Text>

            <Pressable
              onPress={() => setBusca("")}
              accessibilityRole="button"
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>
                Limpar busca
              </Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={
          <Text style={styles.listNotice}>
            Catálogo demonstrativo com fotos ilustrativas.
            Os 37 restaurantes adicionados são fictícios.
          </Text>
        }
      />

      {/* Navegação inferior */}
      <View style={styles.bottomNavigation}>
        <Pressable
          onPress={voltarInicio}
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
            color={COLORS.muted}
          />
          <Text style={styles.navigationText}>
            Início
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.navigate("/ofertas")}
          accessibilityRole="button"
          accessibilityLabel="Ofertas"
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

        <View
          style={styles.navigationItem}
          accessibilityLabel="Explorar, página atual"
        >
          <Ionicons
            name="restaurant-outline"
            size={26}
            color={COLORS.orange}
          />
          <Text style={styles.activeNavigationText}>
            Explorar
          </Text>
        </View>

        <Pressable
          onPress={() => router.navigate("/reservar")}
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
            color={COLORS.muted}
          />
          <Text style={styles.navigationText}>
            Reservas
          </Text>
        </Pressable>
      </View>

      {/* Modal de detalhes */}
      <Modal
        visible={selecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={fecharModal}
            accessibilityRole="button"
            accessibilityLabel="Fechar detalhes"
          />

          {selecionado && (
            <View
              style={styles.modalCard}
              accessibilityViewIsModal
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTitle}>
                  Conheça o restaurante
                </Text>

                <Pressable
                  onPress={fecharModal}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                  style={styles.closeButton}
                >
                  <Ionicons
                    name="close"
                    size={23}
                    color={COLORS.white}
                  />
                </Pressable>
              </View>

              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                <FotoRestaurante
                  key={selecionado.id}
                  uri={selecionado.foto}
                  nome={selecionado.nome}
                />

                <View style={styles.modalContent}>
                  <Text style={styles.restaurantCategory}>
                    {selecionado.culinaria}
                  </Text>

                  <Text style={styles.modalTitle}>
                    {selecionado.nome}
                  </Text>

                  <Text style={styles.modalDescription}>
                    {selecionado.descricao}
                  </Text>

                  <View style={styles.divider} />

                  <View style={styles.infoRow}>
                    <Ionicons
                      name="location-outline"
                      size={22}
                      color={COLORS.gold}
                    />
                    <Text style={styles.infoText}>
                      Endereço a cadastrar
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons
                      name="time-outline"
                      size={22}
                      color={COLORS.gold}
                    />
                    <Text style={styles.infoText}>
                      Horários a cadastrar
                    </Text>
                  </View>

                  <Text style={styles.modalNotice}>
                    Conteúdo demonstrativo. A foto não
                    representa necessariamente este restaurante.
                  </Text>
                </View>
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
                    Continuar explorando
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
    height: 82,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    width: 65,
    height: 36,
  },
  topContent: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  eyebrow: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "600",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
  searchContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginTop: 22,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    color: COLORS.white,
    fontSize: 14,
    paddingVertical: 12,
  },
  resultsText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 16,
    marginBottom: 18,
  },
  list: {
    flex: 1,
  },
  cardsContent: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  restaurantCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
  },
  photoContainer: {
    width: "100%",
    aspectRatio: 16 / 10,
    backgroundColor: "#252525",
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  photoFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  photoFallbackText: {
    color: COLORS.muted,
    fontSize: 12,
  },
  photoBadge: {
    position: "absolute",
    bottom: 10,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  photoBadgeText: {
    color: "#E2E2E2",
    fontSize: 8,
    letterSpacing: 1,
  },
  cardInformation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 20,
  },
  cardTexts: {
    flex: 1,
  },
  restaurantCategory: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  restaurantName: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "500",
    letterSpacing: 0.3,
    marginTop: 8,
  },
  cardSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 8,
  },
  cardArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#4B4133",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    paddingVertical: 50,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: "center",
    marginTop: 14,
  },
  clearButton: {
    padding: 14,
    marginTop: 10,
  },
  clearButtonText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "600",
  },
  listNotice: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  bottomNavigation: {
    minHeight: 75,
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 8,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: "#0D0D0D",
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
    opacity: 0.75,
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
    gap: 12,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalHeaderTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },
  closeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: "#292929",
  },
  modalScroll: {
    flexShrink: 1,
  },
  modalContent: {
    padding: 22,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 28,
    lineHeight: 35,
    fontWeight: "500",
    marginTop: 10,
  },
  modalDescription: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  infoText: {
    flex: 1,
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  modalNotice: {
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8,
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
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});