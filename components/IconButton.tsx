import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.iconButtonPressed
      ]} 
      onPress={onPress}>
      <MaterialIcons name={icon} size={26} color="#00ff87" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#222',
    minWidth: 72,
  },
  iconButtonPressed: {
    backgroundColor: '#222',
    borderColor: '#00ff87',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 8,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});