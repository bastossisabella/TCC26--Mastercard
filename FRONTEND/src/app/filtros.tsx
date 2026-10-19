import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useState } from "react";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FilterSectionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
};

const INITIAL_FILTERS = {
  culinaria: ["Italiana"],
  regioes: ["Brasil"],
  ambientes: ["Romântico"],
  preferencias: [] as string[],
};

function FilterSection({
  icon,
  title,
  options,
  selectedOptions,
  onSelect,
}: FilterSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleContainer}>
        <Ionicons name={icon} size={21} color="#ff7300" />

        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      <View style={styles.chipsContainer}>
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option);

          return (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.selectedChip,
                pressed && styles.pressed,
              ]}
            >
              {isSelected && (
                <Ionicons
                  name="checkmark"
                  size={15}
                  color="#FFFFFF"
                />
              )}

              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.selectedChipText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function Filtro() {
  const [culinaria, setCulinaria] = useState<string[]>(
    INITIAL_FILTERS.culinaria
  );

  const [regioes, setRegioes] = useState<string[]>(
    INITIAL_FILTERS.regioes
  );

  const [ambientes, setAmbientes] = useState<string[]>(
    INITIAL_FILTERS.ambientes
  );

  const [preferencias, setPreferencias] = useState<string[]>(
    INITIAL_FILTERS.preferencias
  );

  // Preço começa em R$ 50
  const [preco, setPreco] = useState(50);

  function toggleOption(
    option: string,
    selectedOptions: string[],
    setSelectedOptions: (options: string[]) => void
  ) {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(
          (selected) => selected !== option
        )
      );
      return;
    }

    setSelectedOptions([
      ...selectedOptions,
      option,
    ]);
  }

  function limparFiltros() {
    setCulinaria([]);
    setRegioes([]);
    setAmbientes([]);
    setPreferencias([]);

    // Volta para o preço mínimo
    setPreco(50);
  }

  function aplicarFiltros() {
    const filtrosSelecionados = {
      culinaria,
      regioes,
      ambientes,
      preferencias,
      faixaDePreco: preco,
    };

    console.log(
      "Filtros selecionados:",
      filtrosSelecionados
    );

    // Vai para a página dados-conta
    router.push("/dados-conta");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090909"
      />

      <View style={styles.container}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
                  <Pressable
            onPress={() => router.push("/dados")}
            style={({ pressed }) => [
              styles.headerButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Filtros
          </Text>

          <View style={styles.logo}>
            <View
              style={[
                styles.logoCircle,
                styles.redCircle,
              ]}
            />

            <View
              style={[
                styles.logoCircle,
                styles.orangeCircle,
              ]}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* CULINÁRIA */}
          <FilterSection
            icon="restaurant-outline"
            title="Culinária"
            options={[
              "Italiana",
              "Japonesa",
              "Francesa",
              "Brasileira",
              "Mexicana",
            ]}
            selectedOptions={culinaria}
            onSelect={(option) =>
              toggleOption(
                option,
                culinaria,
                setCulinaria
              )
            }
          />

          {/* PAÍS OU REGIÃO */}
          <FilterSection
            icon="globe-outline"
            title="País ou região"
            options={[
              "Brasil",
              "Estados Unidos",
              "Europa",
              "Ásia",
            ]}
            selectedOptions={regioes}
            onSelect={(option) =>
              toggleOption(
                option,
                regioes,
                setRegioes
              )
            }
          />

          {/* AMBIENTE */}
          <FilterSection
            icon="business-outline"
            title="Ambiente"
            options={[
              "Romântico",
              "Casual",
              "Sofisticado",
              "Ao ar livre",
            ]}
            selectedOptions={ambientes}
            onSelect={(option) =>
              toggleOption(
                option,
                ambientes,
                setAmbientes
              )
            }
          />

          {/* PREFERÊNCIAS */}
          <FilterSection
            icon="star-outline"
            title="Preferências"
            options={[
              "Vegano",
              "Vegetariano",
              "Sem glúten",
              "Halal",
            ]}
            selectedOptions={preferencias}
            onSelect={(option) =>
              toggleOption(
                option,
                preferencias,
                setPreferencias
              )
            }
          />

          {/* FAIXA DE PREÇO */}
          <View
            style={[
              styles.section,
              styles.priceSection,
            ]}
          >
            <View
              style={styles.sectionTitleContainer}
            >
              <Ionicons
                name="cash-outline"
                size={21}
                color="#ff7300"
              />

              <Text style={styles.sectionTitle}>
                Faixa de preço
              </Text>
            </View>

            <Text style={styles.helperText}>
              Selecione o valor máximo desejado
            </Text>

            {/* PREÇO ATUAL */}
            <Text style={styles.priceValue}>
              R$ {preco.toLocaleString("pt-BR")}
            </Text>

            {/* SLIDER */}
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={10000}
              step={50}
              value={preco}
              onValueChange={(value) =>
                setPreco(value)
              }
              minimumTrackTintColor="#ff7300"
              maximumTrackTintColor="#444444"
              thumbTintColor="#ff7300"
            />

            {/* LIMITES */}
            <View style={styles.priceLabels}>
              <Text style={styles.priceLabel}>
                R$ 50
              </Text>

              <Text style={styles.priceLabel}>
                R$ 10.000
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* BOTÕES */}
        <View style={styles.footer}>
          <Pressable
            onPress={limparFiltros}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>
              Limpar filtros
            </Text>
          </Pressable>

          <Pressable
            onPress={aplicarFiltros}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Aplicar filtros
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
    backgroundColor: "#090909",
  },

  container: {
    flex: 1,
    backgroundColor: "#090909",
  },

  header: {
    height: 68,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2B2B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  logo: {
    width: 44,
    height: 28,
    position: "relative",
  },

  logoCircle: {
    position: "absolute",
    top: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  redCircle: {
    left: 2,
    backgroundColor: "#EB001B",
  },

  orangeCircle: {
    right: 2,
    backgroundColor: "#ff7300",
    opacity: 0.94,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 28,
  },

  section: {
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#242424",
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#4B4B4B",
    borderRadius: 12,
    backgroundColor: "#151515",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  selectedChip: {
    borderColor: "#ff7300",
    backgroundColor: "#ff7300",
  },

  chipText: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "500",
  },

  selectedChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  priceSection: {
    borderBottomWidth: 0,
  },

  helperText: {
    color: "#9E9E9E",
    fontSize: 13,
    marginTop: -5,
    marginBottom: 10,
  },

  priceValue: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },

  slider: {
    width: "100%",
    height: 45,
  },

  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },

  priceLabel: {
    color: "#888888",
    fontSize: 12,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#242424",
    backgroundColor: "#090909",
    flexDirection: "row",
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: "#ff7300",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#ff7300",
    fontSize: 15,
    fontWeight: "700",
      borderRadius: 5,
  },

  primaryButton: {
    flex: 1.2,
    height: 52,
     borderRadius: 5,
    backgroundColor: "#ff7300",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
    
  },

  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});