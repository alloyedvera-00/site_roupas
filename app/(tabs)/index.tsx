import { View, StyleSheet, Dimensions } from "react-native";
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
    <GestureHandlerRootView style={styles.container}>
      <View style={[styles.contentContainer, isMobile && styles.contentContainerMobile]}>

        <ImageViewer imgSource={PlaceholderImage} />

        <View style={[styles.buttonsContainer, isMobile && styles.buttonsContainerMobile]}>
          <IconButton icon="photo-camera" label="Escolher fit" onPress={pickImageAsync} />
          <IconButton icon="list" label="Ver stock" onPress={() => router.push('/toDoList')} />
          <IconButton icon="create" label="Editor" onPress={() => router.push('/editImage')} />
        </View>

      </View>
    </GestureHandlerRootView>          
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