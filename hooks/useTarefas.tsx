import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@oversized_stock';

interface Tarefa {
    id: string;
    texto: string;
}

export function useTarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [novaTarefa, setNovaTarefa] = useState<string>('');

    // Carrega ao iniciar
    useEffect(() => {
        const carregar = async () => {
            try {
                const salvo = await AsyncStorage.getItem(STORAGE_KEY);
                if (salvo) setTarefas(JSON.parse(salvo));
            } catch (e) {
                console.error('Erro ao carregar tarefas', e);
            }
        };
        carregar();
    }, []);

    // Salva sempre que tarefas mudar
    useEffect(() => {
        const salvar = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
            } catch (e) {
                console.error('Erro ao salvar tarefas', e);
            }
        };
        salvar();
    }, [tarefas]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '') return;
        setTarefas([...tarefas, { id: Date.now().toString(), texto: novaTarefa }]);
        setNovaTarefa('');
    };

    const removerTarefa = (id: string) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    };

    return { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa };
}