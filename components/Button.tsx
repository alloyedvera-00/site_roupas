import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    theme?: 'primary';
    onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
    if (theme === 'primary') {
        return (
            <View
                style={[
                    styles.buttonContainer,
                    { borderWidth: 2, borderColor: '#00ff87', borderRadius: 4 },
                ]}>
                <Pressable
                    style={[styles.button, { backgroundColor: '#00ff87' }]}
                    onPress={onPress}>
                    <FontAwesome name="shopping-bag" size={20} color="#0a0a0a" style={styles.buttonIcon} />
                    <Text style={[styles.buttonLabel, { color: '#0a0a0a', fontWeight: '700', textTransform: 'uppercase' }]}>{label}</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.buttonContainer}>
            <Pressable 
                style={[styles.button, { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#333' }]} 
                onPress={onPress}>
                <FontAwesome name="check-circle" size={18} color="#00ff87" style={styles.buttonIcon} />
                <Text style={[styles.buttonLabel, { fontWeight: '600', textTransform: 'uppercase' }]}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 58,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button: {
        borderRadius: 4,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 12,
    },
    buttonLabel: {
        color: '#ffffff',
        fontSize: 14,
        letterSpacing: 1.2,
    },
});