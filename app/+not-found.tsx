import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFundScreen() {
   return ( 
    <>
      <Stack.Screen options={{ title: 'oops! algo deu errado' }}/>
      <View style={styles.container}>
        <Link href= "/" style={styles.button}>
         voltar para a tela inicial!
        </Link>
      </View>
    </>
   );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
