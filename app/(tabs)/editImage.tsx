import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Stickers pré-disponíveis
const STICKERS = [
  { id: '1', emoji: '🔥', name: 'Fire' },
  { id: '2', emoji: '⚡', name: 'Lightning' },
  { id: '3', emoji: '💯', name: 'Hundred' },
  { id: '4', emoji: '👕', name: 'Shirt' },
  { id: '5', emoji: '👟', name: 'Sneaker' },
  { id: '6', emoji: '🧢', name: 'Cap' },
  { id: '7', emoji: '😎', name: 'Cool' },
  { id: '8', emoji: '💎', name: 'Diamond' },
  { id: '9', emoji: '🎨', name: 'Art' },
  { id: '10', emoji: '✨', name: 'Sparkle' },
];

export default function EditImageScreen() {
  const params = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [stickers, setStickers] = useState<Array<{ id: string; emoji: string; x: number; y: number }>>([]);

  // Carrega a imagem quando recebe o parâmetro
  useEffect(() => {
    if (params.imageUri) {
      console.log('Imagem recebida:', params.imageUri);
      setSelectedImage(params.imageUri as string);
    }
  }, [params.imageUri]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const addSticker = (emoji: string) => {
    const newSticker = {
      id: Date.now().toString(),
      emoji,
      x: Math.random() * 250,
      y: Math.random() * 350,
    };
    setStickers([...stickers, newSticker]);
  };

  const clearStickers = () => {
    setStickers([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>EDIT YOUR FIT</Text>
        <Text style={styles.subtitulo}>Adicione stickers na sua peça</Text>

        {/* Área da imagem com stickers */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image 
                source={{ uri: selectedImage }} 
                style={styles.image}
                resizeMode="cover"
              />
              {/* Stickers sobre a imagem */}
              {stickers.map((sticker) => (
                <Text
                  key={sticker.id}
                  style={[
                    styles.sticker,
                    { left: sticker.x, top: sticker.y },
                  ]}
                >
                  {sticker.emoji}
                </Text>
              ))}
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <FontAwesome name="image" size={60} color="#333" />
              <Text style={styles.placeholderText}>ESCOLHA UMA FOTO NO DROPS</Text>
            </View>
          )}
        </View>

        {/* Info da imagem (debug) */}
        {selectedImage && (
          <Text style={styles.debugText}>✓ Imagem carregada</Text>
        )}

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={pickImageAsync}>
            <FontAwesome name="camera" size={20} color="#0a0a0a" />
            <Text style={styles.actionButtonText}>TROCAR FOTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary} onPress={clearStickers}>
            <FontAwesome name="trash-o" size={20} color="#ff4444" />
            <Text style={styles.actionButtonTextSecondary}>LIMPAR</Text>
          </TouchableOpacity>
        </View>

        {/* Grid de stickers */}
        <View style={styles.stickersSection}>
          <Text style={styles.stickersTitulo}>STICKERS DISPONÍVEIS</Text>
          <View style={styles.stickersGrid}>
            {STICKERS.map((sticker) => (
              <TouchableOpacity
                key={sticker.id}
                style={styles.stickerButton}
                onPress={() => addSticker(sticker.emoji)}
              >
                <Text style={styles.stickerEmoji}>{sticker.emoji}</Text>
                <Text style={styles.stickerName}>{sticker.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.push('/')}>
          <FontAwesome name="arrow-left" size={16} color="#00ff87" />
          <Text style={styles.backButtonText}>VOLTAR PRO DROP</Text>
        </TouchableOpacity>
      </View>
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
  debugText: {
    color: '#00ff87',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  sticker: {
    position: 'absolute',
    fontSize: 48,
    zIndex: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#00ff87',
    paddingVertical: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#00ff87',
  },
  actionButtonText: {
    color: '#0a0a0a',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  actionButtonTextSecondary: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  stickersSection: {
    marginBottom: 30,
  },
  stickersTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00ff87',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  stickersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  stickerButton: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  stickerEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  stickerName: {
    fontSize: 8,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 40,
  },
  backButtonText: {
    color: '#00ff87',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});