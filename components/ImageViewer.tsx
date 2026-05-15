import { StyleSheet, View } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: ImageSource;
};

export default function ImageViewer({ imgSource }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.frameOuter}>
                <View style={styles.frameInner}>
                    <Image source={imgSource} style={styles.image} />
                </View>
            </View>
            <View style={styles.accentBar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    frameOuter: {
        padding: 3,
        backgroundColor: '#00ff87',
        borderRadius: 4,
    },
    frameInner: {
        padding: 8,
        backgroundColor: '#0a0a0a',
        borderRadius: 2,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 2,
    },
    accentBar: {
        width: 80,
        height: 4,
        backgroundColor: '#00ff87',
        marginTop: 16,
        borderRadius: 2,
    },
});