import { View, StyleSheet, Image, Dimensions } from "react-native";
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import IconButton from '@/components/IconButton';

const PlaceholderImage = require('@/assets/images/background-image.webp');

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function Index() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
     
    if (!result.canceled) {
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

        {/* Botões com IconButton */}
        <View style={[styles.buttonsContainer, isMobile && styles.buttonsContainerMobile]}>
          <IconButton icon="photo-camera" label="Escolher fit" onPress={pickImageAsync} />
          <IconButton icon="list" label="Ver stock" onPress={() => router.push('/toDoList')} />
          <IconButton icon="create" label="Editor" onPress={() => router.push('/editImage')} />
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
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
  buttonsContainerMobile: {
    flexDirection: 'row',
    width: '100%',
    flex: 0,
    justifyContent: 'center',
  },
});