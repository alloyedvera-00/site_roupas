import React, { useState, useRef, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Text, Image,
  PanResponder, Animated, TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Sharing from 'expo-sharing';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';

type Sticker = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
};

type DraggableStickerProps = {
  sticker: Sticker;
  isSelected: boolean;
  onDoubleTap: (id: string) => void;
  setScrollEnabled: (v: boolean) => void;
};

function DraggableSticker({ sticker, isSelected, onDoubleTap, setScrollEnabled }: DraggableStickerProps) {
  const pan = useRef(new Animated.ValueXY({ x: sticker.x, y: sticker.y })).current;
  const currentPos = useRef({ x: sticker.x, y: sticker.y });
  const lastTap = useRef<number | null>(null);
  const onDoubleTapRef = useRef(onDoubleTap);
  onDoubleTapRef.current = onDoubleTap;

  useEffect(() => {
    const listenerId = pan.addListener((v) => { currentPos.current = v; });
    return () => pan.removeListener(listenerId);
  }, [pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
          onDoubleTapRef.current(sticker.id);
          lastTap.current = null;
        } else {
          lastTap.current = now;
        }
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
      style={[
        styles.stickerWrapper,
        {
          transform: [
            ...pan.getTranslateTransform(),
            { scale: sticker.scale },
          ],
        },
        isSelected && styles.stickerSelected,
      ]}
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
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Ref num View normal — sem o componente ViewShot
  const imageContainerRef = useRef<View>(null);

  useEffect(() => {
    if (params.imageUri) setSelectedImage(params.imageUri as string);
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
      { id: Date.now().toString(), emoji, x: 100, y: 150, scale: 1 },
    ]);
  };

  const clearStickers = () => {
    setStickers([]);
    setSelectedStickerId(null);
  };

  const handleDoubleTap = (id: string) => {
    setSelectedStickerId((prev) => (prev === id ? null : id));
  };

  const changeScale = (delta: number) => {
    if (!selectedStickerId) return;
    setStickers((prev) =>
      prev.map((s) =>
        s.id === selectedStickerId
          ? { ...s, scale: Math.max(0.3, Math.min(3, +(s.scale + delta).toFixed(1))) }
          : s
      )
    );
  };

const downloadImage = async () => {
  if (!selectedImage) {
    alert('Selecione uma imagem primeiro.');
    return;
  }
  try {
    const uri = await captureRef(imageContainerRef, {
      format: 'jpg',
      quality: 0.95,
      result: 'tmpfile',
    });

    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      alert('Compartilhamento não disponível neste dispositivo.');
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: 'image/jpeg',
      dialogTitle: 'Salvar ou compartilhar imagem',
    });
  } catch (e) {
    console.error(e);
    alert('Erro ao compartilhar a imagem.');
  }
};

  const selectedSticker = stickers.find((s) => s.id === selectedStickerId);

  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <View style={styles.content}>
        <Text style={styles.titulo}>EDIT YOUR FIT</Text>
        <Text style={styles.subtitulo}>Adicione stickers na sua peça</Text>

        {/* View com ref — captureRef vai capturar isso */}
        <View
          ref={imageContainerRef}
          style={styles.imageContainer}
          collapsable={false}
        >
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
                  isSelected={sticker.id === selectedStickerId}
                  onDoubleTap={handleDoubleTap}
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

        {/* Painel de tamanho — aparece ao dar duplo toque no sticker */}
        {selectedStickerId && selectedSticker && (
          <View style={styles.scaleControl}>
            <Text style={styles.scaleLabel}>
              {selectedSticker.emoji}{'  '}TAMANHO
            </Text>
            <View style={styles.scaleButtons}>
              <TouchableOpacity style={styles.scaleBtn} onPress={() => changeScale(-0.2)}>
                <MaterialIcons name="remove" size={22} color="#00ff87" />
              </TouchableOpacity>
              <Text style={styles.scaleValue}>
                {Math.round(selectedSticker.scale * 100)}%
              </Text>
              <TouchableOpacity style={styles.scaleBtn} onPress={() => changeScale(0.2)}>
                <MaterialIcons name="add" size={22} color="#00ff87" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scaleBtn, styles.scaleBtnClose]}
                onPress={() => setSelectedStickerId(null)}
              >
                <MaterialIcons name="close" size={18} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <IconButton icon="photo-camera" label="Trocar" onPress={pickImageAsync} />
          <IconButton icon="emoji-emotions" label="Sticker" onPress={() => setPickerVisible(true)} />
          <IconButton icon="download" label="Salvar" onPress={downloadImage} />
          <IconButton icon="delete" label="Limpar" onPress={clearStickers} />
          <IconButton icon="arrow-back" label="Voltar" onPress={() => router.push('/')} />
        </View>
      </View>

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
    marginBottom: 12,
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
  stickerSelected: {
    borderWidth: 1.5,
    borderColor: '#00ff87',
    borderStyle: 'dashed',
    borderRadius: 4,
  },
  stickerText: {
    fontSize: 48,
  },
  scaleControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#00ff87',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scaleLabel: {
    color: '#00ff87',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  scaleButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  scaleBtn: {
    backgroundColor: '#222',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
  },
  scaleBtnClose: {
    marginLeft: 4,
    borderColor: '#2a2a2a',
  },
  scaleValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 44,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#222',
  },
});