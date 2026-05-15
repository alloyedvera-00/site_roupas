import React from 'react';
import { View, Text, TextInput, Pressable, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTarefas } from '@/hooks/useTarefas';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>STOCK OVERSIZED</Text>
            <Text style={styles.subtitulo}>Peças disponíveis para drop</Text>
        
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="NOVA PEÇA..."
                    placeholderTextColor="#666"
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <Pressable style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <FontAwesome name="plus" size={18} color="#0a0a0a" />
                </Pressable>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tarefaContainer}>
                        <View style={styles.tarefaInfo}>
                            <View style={styles.bullet} />
                            <Text style={styles.tarefaTexto}>{item.texto}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.botaoRemover}
                            onPress={() => removerTarefa(item.id)}>
                            <FontAwesome name="trash-o" size={18} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 24, 
        backgroundColor: '#0a0a0a',
        paddingTop: 60,
    },
    titulo: { 
        fontSize: 32, 
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
        textTransform: 'uppercase',
        marginBottom: 30,
    },
    inputContainer: { 
        flexDirection: 'row', 
        marginBottom: 24,
        gap: 12,
    },
    input: { 
        flex: 1, 
        borderWidth: 2, 
        borderColor: '#222', 
        padding: 16, 
        borderRadius: 4,
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontSize: 14,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    botaoAdicionar: {
        backgroundColor: '#00ff87',
        width: 54,
        height: 54,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#00ff87',
    },
    listContainer: {
        paddingBottom: 20,
    },
    tarefaContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 18,
        marginBottom: 12, 
        borderRadius: 4,
        borderLeftWidth: 3,
        borderLeftColor: '#00ff87',
        borderWidth: 1,
        borderColor: '#222',
    },
    tarefaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 1,
        backgroundColor: '#00ff87',
        marginRight: 14,
    },
    tarefaTexto: { 
        fontSize: 15,
        color: '#fff',
        fontWeight: '600',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        flex: 1,
    },
    botaoRemover: {
        padding: 8,
    },
    remover: { 
        fontSize: 18, 
        color: '#ff4444',
    },
});