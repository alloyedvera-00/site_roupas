import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from 'expo-router';
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

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <FontAwesome name="truck" size={20} color="#00ff87" />
            <Text style={styles.infoTitulo}>ENVIO RÁPIDO</Text>
            <Text style={styles.infoTexto}>Entrega em todo Brasil</Text>
          </View>

          <View style={styles.infoBox}>
            <FontAwesome name="shield" size={20} color="#00ff87" />
            <Text style={styles.infoTitulo}>QUALIDADE</Text>
            <Text style={styles.infoTexto}>Tecidos premium importados</Text>
          </View>

          <View style={styles.infoBox}>
            <FontAwesome name="star" size={20} color="#00ff87" />
            <Text style={styles.infoTitulo}>EXCLUSIVO</Text>
            <Text style={styles.infoTexto}>Drops limitados</Text>
          </View>
        </View>

        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitulo}>NOSSA VIBE</Text>
          <Text style={styles.descricaoTexto}>
            Especialistas em peças oversized com estilo urbano moderno. 
            Cada drop é pensado pra quem curte se destacar com conforto e atitude.
          </Text>
        </View>

        <Link href="/" style={styles.button}>
          <View style={styles.buttonInner}>
            <FontAwesome name="arrow-left" size={16} color="#0a0a0a" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>VOLTAR PRO DROP</Text>
          </View>
        </Link>
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
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 3,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 2,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 4,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00ff87',
    borderWidth: 1,
    borderColor: '#222',
  },
  infoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1.5,
    marginTop: 12,
    marginBottom: 4,
  },
  infoTexto: {
    fontSize: 13,
    color: '#999',
    letterSpacing: 0.5,
  },
  descricaoContainer: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 4,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#222',
  },
  descricaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00ff87',
    letterSpacing: 2,
    marginBottom: 12,
  },
  descricaoTexto: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  button: {
    width: '100%',
  },
  buttonInner: {
    backgroundColor: '#00ff87',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00ff87',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0a0a',
    letterSpacing: 1.5,
  },
});