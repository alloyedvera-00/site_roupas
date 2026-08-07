import { Text, View, StyleSheet, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        <View style={styles.header}>
          <FontAwesome name="tag" size={40} color="#00ff87" />
          <Text style={styles.titulo}>OVERSIZED CO.</Text>
          <Text style={styles.subtitulo}>Premium streetwear collection</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>O PROJETO</Text>
          <Text style={styles.secaoTexto}>
            A OVERSIZED CO. é um projeto acadêmico que simula uma loja de roupas local especializada em streetwear urbano. O app foi desenvolvido em React Native com Expo e funciona como vitrine digital de uma marca fictícia, explorando conceitos reais de e-commerce mobile.
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>O QUE TEM NO APP</Text>

          <View style={styles.featureItem}>
            <FontAwesome name="shopping-bag" size={16} color="#00ff87" />
            <Text style={styles.featureTexto}>
              <Text style={styles.featureBold}>DROPS</Text> — vitrine principal da loja com acesso rápido às funções
            </Text>
          </View>

          <View style={styles.featureItem}>
            <FontAwesome name="pencil" size={16} color="#00ff87" />
            <Text style={styles.featureTexto}>
              <Text style={styles.featureBold}>EDITOR</Text> — ferramenta de personalização de fotos com stickers arrastáveis
            </Text>
          </View>

          <View style={styles.featureItem}>
            <FontAwesome name="list" size={16} color="#00ff87" />
            <Text style={styles.featureTexto}>
              <Text style={styles.featureBold}>STOCK</Text> — lista de peças disponíveis, salva entre sessões
            </Text>
          </View>

          <View style={styles.featureItem}>
            <FontAwesome name="info-circle" size={16} color="#00ff87" />
            <Text style={styles.featureTexto}>
              <Text style={styles.featureBold}>INFO</Text> — você está aqui
            </Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>TECNOLOGIAS</Text>
          <View style={styles.tagsContainer}>
            {['React Native', 'Expo Router', 'TypeScript', 'AsyncStorage', 'expo-image-picker', 'expo-media-library'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagTexto}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>Projeto acadêmico — fins educacionais</Text>
          <Text style={styles.rodapeTexto}>Nenhum produto é real ou está à venda</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 3,
    marginTop: 16,
  },
  subtitulo: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 2,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginBottom: 32,
  },
  secao: {
    marginBottom: 32,
  },
  secaoTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00ff87',
    letterSpacing: 2.5,
    marginBottom: 14,
  },
  secaoTexto: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  featureTexto: {
    flex: 1,
    fontSize: 13,
    color: '#888',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  featureBold: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagTexto: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  rodape: {
    borderTopWidth: 1,
    borderColor: '#1a1a1a',
    paddingTop: 24,
    alignItems: 'center',
    gap: 6,
  },
  rodapeTexto: {
    fontSize: 11,
    color: '#333',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});