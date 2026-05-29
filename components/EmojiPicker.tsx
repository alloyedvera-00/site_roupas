import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const STICKER_CATEGORIES = [
  {
    category: 'STREET',
    items: ['🔥', '⚡', '💯', '👑', '💥', '🚀', '🎯', '⚔️'],
  },
  {
    category: 'FITS',
    items: ['👕', '👟', '🧢', '🧥', '👖', '🥿', '👜', '🕶️'],
  },
  {
    category: 'VIBES',
    items: ['😎', '🤙', '✌️', '🤘', '👊', '💪', '🫶', '🙌'],
  },
  {
    category: 'FLEX',
    items: ['💎', '✨', '🌟', '🏆', '🎨', '🖤', '💚', '🤍'],
  },
];

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
};

export default function EmojiPicker({ isVisible, onClose, onSelectEmoji }: Props) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>STICKERS</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={22} color="#00ff87" />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Categorias */}
        <FlatList
          data={STICKER_CATEGORIES}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{item.category}</Text>
              <View style={styles.emojisGrid}>
                {item.items.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiButton}
                    onPress={() => {
                      onSelectEmoji(emoji);
                      onClose();
                    }}
                  >
                    <Text style={styles.emoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: '#111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#00ff87',
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 3,
  },
  closeButton: {
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 2,
    marginBottom: 12,
  },
  emojisGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiButton: {
    width: 56,
    height: 56,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 30,
  },
});