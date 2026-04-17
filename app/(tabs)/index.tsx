import { Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem Vindos</Text>
      <Link href="/about"style={styles.button}>
      proxima pagina
      </Link>
     
    </View>
  );
}

const styles = StyleSheet.create({
container: {
   flex: 1,
   backgroundColor: '#ffffff',
   alignItems: 'center',
   justifyContent: 'center',

  },
text: {
  color: '#0c0c0c',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#000000',
  }
});
