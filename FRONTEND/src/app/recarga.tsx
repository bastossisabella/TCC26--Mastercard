import { useState } from "react";
import {
  Alert,
  Modal,
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
import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";

type DetalhesOferta = {
  marca: string;
  titulo: string;
  descricao: string;
  image: number;
  beneficio: string;
  comoAproveitar: string;
};

type ConfiguracaoResgate = {
  titulo: string;
  beneficio: string;
  pontos: number | null;
  botao: string;
};

const detalhesOfertas: Record<string, DetalhesOferta> = {
  aproveite: {
    marca: "Bacio di Latte",
    titulo: "Bacio di Latte - Pague 1 Leve 2",
    descricao:
      "O inverno fica mais gostoso com Bacio di Latte em dobro.",
    image: require("../../assets/bacio.jpg"),
    beneficio:
      "Compre um produto da Bacio di Latte e ganhe outro! A gratuidade é aplicada ao produto de menor ou igual valor. Oferta válida somente para compras feitas no site exclusivo da oferta até 31/12/2026 ou enquanto durarem os estoques. Oferta não é válida em lojas físicas.",
    comoAproveitar:
      "1. Troque seus pontos por um voucher Surpreenda por apenas 10 pontos.\n\n" +
      "2. Acesse o site da parceria clicando em 'Compre seu Produto', selecione seus produtos e vá para o checkout.\n\n" +
      "3. Insira seu voucher Surpreenda no campo indicado ou siga as instruções para resgatar diretamente do Pague 1, Leve 2.\n\n" +
      "4. Realize o pagamento com seu cartão Mastercard.",
  },

  sobremesa: {
    marca: "ABBRACCIO Gastronomia",
    titulo: "Uma pequena lembrança para adoçar o dia",
    descricao:
      "Ao comprar um dos pratos participantes, ganhe um Mini Quadrato di Cioccolato.",
    image: require("../../assets/ccolato.jpg"),
    beneficio:
      "Ganhe um Mini Quadrato di Cioccolato na compra de 1 Polpettone Pomodoro OU 1 Spiedino di Mare. É permitido somente o uso de 1 voucher por mesa e somente 1 voucher por visita. Oferta não cumulativa com outros vouchers e promoções. É permitido um resgate de voucher por CPF no mês.",
    comoAproveitar:
      "1. Acesse o site do parceiro clicando em 'Ir para site do parceiro'.\n\n" +
      "2. Preencha seus dados para gerar seu cupom.\n\n" +
      "3. Apresente seu voucher ao atendente no primeiro contato e siga as instruções dele para usufruir do benefício.\n\n" +
      "4. Realize o pagamento com seu cartão Mastercard.\n\n" +
      "5. Atenção: válida a emissão de um cupom por CPF por mês. Cupom válido por 30 dias a partir da geração.",
  },

  outback: {
    marca: "Outback",
    titulo:
      "Ganhe 1 Havanna Thunder na compra de um prato principal ou aperitivo",
    descricao:
      "Ganhe um Havanna Thunder na compra de um prato principal ou aperitivo. Aproveite essa oportunidade exclusiva e viva o sabor marcante do Outback.",
    image: require("../../assets/outback.jpg"),
    beneficio:
      "Esta oferta é pessoal e intransferível, válida da abertura ao fechamento dos restaurantes, mediante a compra de um prato principal ou aperitivo. O voucher não poderá ser trocado por outro produto, ter seu valor utilizado como crédito para desconto, ser convertido em dinheiro ou utilizado de forma parcial. A cortesia deve ser consumida no próprio restaurante. Não é válida para delivery e pedidos para viagem.",
    comoAproveitar:
      "1. Acesse o site do parceiro clicando em 'Ir para site do parceiro'.\n\n" +
      "2. Preencha seus dados para gerar seu cupom.\n\n" +
      "3. Apresente seu voucher ao atendente no primeiro contato e siga as instruções dele para usufruir do benefício.\n\n" +
      "4. Realize o pagamento com seu cartão Mastercard.\n\n" +
      "5. Atenção: válida a emissão de um cupom por CPF por mês. Cupom válido por 30 dias a partir da geração.",
  },

  china: {
    marca: "China in Box",
    titulo: "20% OFF no site do China in Box",
    descricao:
      "Garanta 20% de desconto em compras acima de R$60,00 no melhor delivery de comida oriental do Brasil! Aproveite já!",
    image: require("../../assets/china.jpg"),
    beneficio:
      "Aproveite 20% de desconto nas compras acima de R$60,00 no site ou app China in Box com o cupom da parceria. Não cumulativo com outros descontos. Válido para compras acima de R$60,00. Válido no site ou aplicativo China in Box. Desconto não é válido para o frete.",
    comoAproveitar:
      "1. Copie o cupom da oferta.\n\n" +
      "2. Acesse o site do parceiro clicando em 'Ir para o site do parceiro'.\n\n" +
      "3. Selecione seus produtos e certifique-se de que todos os requisitos e limitações da oferta estão sendo cumpridos.\n\n" +
      "4. Siga para o checkout e digite seu cupom no campo indicado.\n\n" +
      "5. Realize o pagamento com seu cartão Mastercard.",
  },

  japonesa: {
    marca: "Gurumê",
    titulo:
      "Gurumê - 20% OFF em compras acima de R$120 apenas na primeira compra no site",
    descricao:
      "Aproveite a experiência de conhecer novos sabores.",
    image: require("../../assets/gurume.jpeg"),
    beneficio:
      "Aproveite 20% de desconto em compras acima de R$120 no site do restaurante de Niterói. Oferta válida exclusivamente para a primeira compra realizada no site. Não perca a chance de garantir uma refeição deliciosa com um ótimo desconto!",
    comoAproveitar:
      "1. Acesse o site do parceiro clicando em 'Ver Cupom' e depois em 'Copiar e ir para site do parceiro'.\n\n" +
      "2. Selecione seu destino.\n\n" +
      "3. Insira o cupom no campo indicado e siga para o checkout.\n\n" +
      "4. Realize o pagamento com seu cartão Mastercard.",
  },

  encontros: {
    marca: "Mastercard",
    titulo: "Surpreenda Restaurantes",
    descricao:
      "O Surpreenda Restaurantes traz uma curadoria especial dos melhores restaurantes. Na compra de um prato principal, ganhe outro igual ou de menor valor para o acompanhante.",
    image: require("../../assets/encontros.jpeg"),
    beneficio:
      "• Reservas devem ser feitas com pelo menos 24h de antecedência.\n\n" +
      "• O horário de funcionamento é um indicativo de funcionamento do restaurante. Para resgate da oferta, devem ser respeitadas as regras de cada restaurante.",
    comoAproveitar:
      "Consulte no programa oficial os restaurantes participantes, os requisitos de participação e as condições para utilizar o benefício.",
  },
};

const resgates: Record<string, ConfiguracaoResgate> = {
  aproveite: {
    titulo: "Deseja resgatar esta oferta?",
    beneficio: "Bacio di Latte — Pague 1, Leve 2",
    pontos: 10,
    botao: "Simular resgate",
  },

  sobremesa: {
    titulo: "Uma sobremesa para você",
    beneficio: "Mini Quadrato di Cioccolato",
    pontos: null,
    botao: "Simular solicitação",
  },

  outback: {
    titulo: "Seu momento Outback",
    beneficio: "Havanna Thunder",
    pontos: null,
    botao: "Simular solicitação",
  },

  china: {
    titulo: "Aproveite seu desconto",
    beneficio: "20% OFF — China in Box",
    pontos: null,
    botao: "Simular solicitação",
  },

  japonesa: {
    titulo: "Uma experiência Gurumê",
    beneficio: "20% OFF na primeira compra",
    pontos: null,
    botao: "Simular solicitação",
  },

  encontros: {
    titulo: "Compartilhe uma experiência",
    beneficio: "Surpreenda Restaurantes 2X1",
    pontos: null,
    botao: "Simular solicitação",
  },
};

function ImagemOferta({
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
      style={{
        width: "100%",
        aspectRatio: proporcao,
      }}
    />
  );
}

export default function Recarga() {
  const router = useRouter();
  const [idModalAberto, setIdModalAberto] = useState<string | null>(
    null
  );

  const { id } = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const idSelecionado = Array.isArray(id) ? id[0] : id;

  const oferta =
    idSelecionado &&
    Object.prototype.hasOwnProperty.call(
      detalhesOfertas,
      idSelecionado
    )
      ? detalhesOfertas[idSelecionado]
      : undefined;

  const resgate =
    idSelecionado &&
    Object.prototype.hasOwnProperty.call(
      resgates,
      idSelecionado
    )
      ? resgates[idSelecionado]
      : undefined;

  const modalAberto =
    !!idSelecionado && idModalAberto === idSelecionado;

  function abrirModal() {
    if (idSelecionado && oferta && resgate) {
      setIdModalAberto(idSelecionado);
    }
  }

  function fecharModal() {
    setIdModalAberto(null);
  }

  function simularResgate() {
    if (!oferta || !resgate) return;

    fecharModal();

    Alert.alert(
      "Simulação concluída",
      `Você selecionou: ${resgate.beneficio}.\n\nNenhum ponto foi descontado e nenhum voucher real foi emitido.`
    );
  }

  function voltar() {
    fecharModal();

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/ofertas");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <StatusBar
        barStyle="light-content"
        backgroundColor="#050505"
      />

      <View style={styles.header}>
        <Pressable
          onPress={voltar}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar às ofertas"
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <Image
          source={require("../../assets/master.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Mastercard"
        />
      </View>

      {oferta ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.eyebrow}>
            {oferta.marca}
          </Text>

          <Text style={styles.title}>
            {oferta.titulo}
          </Text>

          <Text style={styles.description}>
            {oferta.descricao}
          </Text>

          <View style={styles.imageCard}>
            <ImagemOferta
              key={idSelecionado}
              source={oferta.image}
              label={oferta.titulo}
            />
          </View>

          <View style={styles.benefitCard}>
            <View style={styles.sectionHeading}>
              <Ionicons
                name="gift-outline"
                size={23}
                color="#FF8200"
              />

              <Text style={styles.sectionTitle}>
                Benefício anunciado
              </Text>
            </View>

            <Text style={styles.benefitText}>
              {oferta.beneficio}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.sectionHeading}>
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#FF8200"
            />

            <Text style={styles.sectionTitle}>
              Como aproveitar
            </Text>
          </View>

          <Text style={styles.bodyText}>
            {oferta.comoAproveitar}
          </Text>

          <View style={styles.noticeCard}>
            <Text style={styles.noticeTitle}>
              Oferta demonstrativa
            </Text>

            <Text style={styles.noticeText}>
              As informações desta tela são exemplos do
              aplicativo. Validade, disponibilidade e condições
              devem ser confirmadas no canal oficial. O resgate
              abaixo é apenas uma simulação.
            </Text>
          </View>

          <Pressable
            onPress={abrirModal}
            disabled={!resgate}
            accessibilityRole="button"
            accessibilityState={{ disabled: !resgate }}
            style={({ pressed }) => [
              styles.button,
              !resgate && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name="gift-outline"
              size={20}
              color="#050505"
            />

            <Text style={styles.buttonText}>
              Ver opção de resgate
            </Text>
          </Pressable>

          <Pressable
            onPress={voltar}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.returnButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.returnButtonText}>
              Voltar às ofertas
            </Text>
          </Pressable>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="search-outline"
            size={46}
            color="#FF8200"
          />

          <Text style={styles.emptyTitle}>
            Oferta não encontrada
          </Text>

          <Text style={styles.emptyDescription}>
            Volte à lista e selecione uma oferta para conhecer
            os detalhes.
          </Text>

          <Pressable
            onPress={() => router.replace("/ofertas")}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>
              Ver ofertas
            </Text>
          </Pressable>
        </View>
      )}

      <Modal
        visible={modalAberto && !!oferta && !!resgate}
        transparent
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={fecharModal}
            accessibilityRole="button"
            accessibilityLabel="Fechar resgate"
          />

          {oferta && resgate && (
            <SafeAreaView
              edges={["bottom", "left", "right"]}
              style={styles.rescueSheet}
              accessibilityViewIsModal
            >
              <View style={styles.sheetHandle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetBrand}>
                  {oferta.marca}
                </Text>

                <Pressable
                  onPress={fecharModal}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                  style={styles.sheetClose}
                >
                  <Ionicons
                    name="close"
                    size={25}
                    color="#111111"
                  />
                </Pressable>
              </View>

              <ScrollView
                style={styles.sheetScroll}
                contentContainerStyle={styles.sheetContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.sheetTitle}>
                  {resgate.titulo}
                </Text>

                <View style={styles.sheetImage}>
                  <ImagemOferta
                    key={idSelecionado}
                    source={oferta.image}
                    label={oferta.titulo}
                  />
                </View>

                <Text style={styles.sheetBenefit}>
                  {resgate.beneficio}
                </Text>

                <Text style={styles.sheetVoucher}>
                  {resgate.pontos !== null
                    ? "1 voucher • demonstração"
                    : "Condições de resgate a confirmar"}
                </Text>

                <View style={styles.pointsArea}>
                  <Text style={styles.pointsValue}>
                    {resgate.pontos !== null
                      ? `${resgate.pontos} Pts`
                      : "Pontos a definir"}
                  </Text>

                  <Text style={styles.pointsDescription}>
                    {resgate.pontos !== null
                      ? "Valor indicado para esta oferta"
                      : "O custo desta oferta ainda não foi cadastrado"}
                  </Text>
                </View>

                <Text style={styles.sheetNotice}>
                  Esta é uma simulação. Não há desconto de pontos
                  nem emissão de voucher real.
                </Text>
              </ScrollView>

              <View style={styles.sheetFooter}>
                <Pressable
                  onPress={simularResgate}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    styles.rescueButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.rescueButtonText}>
                    {resgate.botao}
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          )}
        </View>
      </Modal>
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

  backButton: {
    position: "absolute",
    left: 20,
    padding: 6,
  },

  logo: {
    width: 70,
    height: 38,
  },

  content: {
    width: "100%",
    maxWidth: 680,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 35,
  },

  eyebrow: {
    color: "#FF8200",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "700",
  },

  description: {
    color: "#A5A5A5",
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 24,
  },

  imageCard: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#151515",
    marginBottom: 24,
  },

  benefitCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1C140B",
    borderWidth: 1,
    borderColor: "#60401F",
  },

  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionTitle: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  benefitText: {
    color: "#FF8200",
    fontSize: 17,
    lineHeight: 26,
    fontWeight: "600",
    marginTop: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "#363636",
    marginVertical: 26,
  },

  bodyText: {
    color: "#BDBDBD",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 14,
  },

  noticeCard: {
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#363636",
    borderRadius: 14,
    padding: 18,
    marginTop: 26,
  },

  noticeTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  noticeText: {
    color: "#A5A5A5",
    fontSize: 12,
    lineHeight: 20,
  },

  button: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#FF8200",
    marginTop: 26,
  },

  buttonText: {
    flexShrink: 1,
    color: "#050505",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  returnButton: {
    padding: 16,
    alignItems: "center",
  },

  returnButtonText: {
    color: "#A5A5A5",
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
  },

  emptyDescription: {
    color: "#A5A5A5",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.65)",
  },

  modalBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  rescueSheet: {
    width: "100%",
    maxWidth: 600,
    maxHeight: "90%",
    alignSelf: "center",
    flexShrink: 1,
    backgroundColor: "#E7E7E7",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },

  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#777777",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginHorizontal: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  sheetBrand: {
    flex: 1,
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
  },

  sheetClose: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
  },

  sheetScroll: {
    flexShrink: 1,
  },

  sheetContent: {
    padding: 24,
    alignItems: "center",
  },

  sheetTitle: {
    color: "#111111",
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  sheetImage: {
    width: "100%",
    maxWidth: 280,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#D0D0D0",
    marginBottom: 20,
  },

  sheetBenefit: {
    color: "#222222",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    textAlign: "center",
  },

  sheetVoucher: {
    color: "#555555",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 7,
  },

  pointsArea: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },

  pointsValue: {
    color: "#111111",
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
  },

  pointsDescription: {
    color: "#555555",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },

  sheetNotice: {
    color: "#555555",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 20,
  },

  sheetFooter: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },

  rescueButton: {
    minHeight: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#FF8200",
    alignItems: "center",
    justifyContent: "center",
  },

  rescueButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  disabled: {
    opacity: 0.4,
  },

  pressed: {
    opacity: 0.75,
  },
});