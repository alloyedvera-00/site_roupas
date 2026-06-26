import React, { useState, useRef, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Image,
  PanResponder, Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';

type Sticker = {
  id: string;
  emoji: string;
  x: number;
  y: number;
};

type DraggableStickerProps = {
  sticker: Sticker;
  setScrollEnabled: (v: boolean) => void;
};

function DraggableSticker({ sticker, setScrollEnabled }: DraggableStickerProps) {
  const pan = useRef(new Animated.ValueXY({ x: sticker.x, y: sticker.y })).current;
  const currentPos = useRef({ x: sticker.x, y: sticker.y });

  useEffect(() => {
    const id = pan.addListener((v) => { currentPos.current = v; });
    return () => pan.removeListener(id);
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setScrollEnabled(false);
        pan.setOffset(currentPos.current);
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        setScrollEnabled(true);
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.stickerWrapper, { transform: pan.getTranslateTransform() }]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.stickerText}>{sticker.emoji}</Text>
    </Animated.View>
  );
}

export default function EditImageScreen() {
  const params = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    if (params.imageUri) {
      setSelectedImage(params.imageUri as string);
    }
  }, [params.imageUri]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const addSticker = (emoji: string) => {
    setStickers((prev) => [
      ...prev,
      { id: Date.now().toString(), emoji, x: 100, y: 150 },
    ]);
  };

  const clearStickers = () => setStickers([]);

  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <View style={styles.content}>
        <Text style={styles.titulo}>EDIT YOUR FIT</Text>
        <Text style={styles.subtitulo}>Adicione stickers na sua peça</Text>

        {/* Área da imagem */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image
                source={{ uri: selectedImage }}
                style={styles.image}
                resizeMode="cover"
              />
              {stickers.map((sticker) => (
                <DraggableSticker
                  key={sticker.id}
                  sticker={sticker}
                  setScrollEnabled={setScrollEnabled}
                />
              ))}
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <FontAwesome name="image" size={60} color="#333" />
              <Text style={styles.placeholderText}>ESCOLHA UMA FOTO NO DROPS</Text>
            </View>
          )}
        </View>

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <IconButton icon="photo-camera" label="Trocar" onPress={pickImageAsync} />
          <IconButton icon="emoji-emotions" label="Sticker" onPress={() => setPickerVisible(true)} />
          <IconButton icon="delete" label="Limpar" onPress={clearStickers} />
          <IconButton icon="arrow-back" label="Voltar" onPress={() => router.push('/')} />
        </View>
      </View>

      {/* Modal do EmojiPicker */}
      <EmojiPicker
        isVisible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelectEmoji={addSticker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 30,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#222',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginTop: 16,
    textAlign: 'center',
  },
  stickerWrapper: {
    position: 'absolute',
    zIndex: 10,
  },
  stickerText: {
    fontSize: 48,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
});