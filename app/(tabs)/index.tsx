import { View, StyleSheet, Image, Dimensions } from "react-native";
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/background-image.webp');

const { width } = Dimensions.get('window');
const isMobile = width < 768; // Define se é mobile

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
     
    if (!result.canceled) {
      // Navega pro editor com a imagem selecionada
      router.push({
        pathname: '/editImage',
        params: { imageUri: result.assets[0].uri }
      });
    } else {
      alert('Nenhuma peça selecionada');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, isMobile && styles.contentContainerMobile]}>
        {/* Imagem vertical */}
        <View style={styles.imageContainer}>
          <Image 
            source={PlaceholderImage} 
            style={[styles.image, isMobile && styles.imageMobile]}
            resizeMode="cover"
          />
        </View>

        {/* Botões */}
        <View style={[styles.buttonsContainer, isMobile && styles.buttonsContainerMobile]}>
          <Button theme="primary" label="Escolher fit" onPress={pickImageAsync} />
          <Button label="Ver stock" onPress={() => router.push('/toDoList')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 20,
  },
  contentContainerMobile: {
    flexDirection: 'column',
    gap: 32,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: '#00ff87',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#00ff87',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: 260,
    height: 420,
  },
  imageMobile: {
    width: 280,
    height: 400,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  buttonsContainerMobile: {
    width: '100%',
    flex: 0,
  },
});