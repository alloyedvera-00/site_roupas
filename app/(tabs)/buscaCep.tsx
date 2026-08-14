import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type EnderecoData = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ddd: string;
  erro?: boolean;
};

type InfoRowProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  valor: string;
};

function InfoRow({ icon, label, valor }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconContainer}>
        <MaterialIcons name={icon} size={18} color="#00ff87" />
      </View>
      <View style={styles.infoTextos}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValor}>{valor || '—'}</Text>
      </View>
    </View>
  );
}

export default function BuscaCepScreen() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<EnderecoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const formatarCep = (texto: string) => {
    // Remove tudo que não é número
    const numeros = texto.replace(/\D/g, '');
    // Aplica máscara 00000-000
    if (numeros.length <= 5) return numeros;
    return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`;
  };

  const handleCepChange = (texto: string) => {
    setCep(formatarCep(texto));
    setErro(null);
    setEndereco(null);
  };

  const buscarCep = async () => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      setErro('CEP deve ter 8 dígitos.');
      return;
    }

    setLoading(true);
    setErro(null);
    setEndereco(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (!response.ok) {
        setErro('Erro ao conectar. Tente novamente.');
        return;
      }

      const data: EnderecoData = await response.json();

      if (data.erro) {
        setErro('CEP não encontrado. Verifique e tente novamente.');
        return;
      }

      setEndereco(data);
    } catch (e) {
      setErro('Sem conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  const limpar = () => {
    setCep('');
    setEndereco(null);
    setErro(null);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="location-on" size={40} color="#00ff87" />
          <Text style={styles.titulo}>BUSCA CEP</Text>
          <Text style={styles.subtitulo}>Encontre o endereço do seu drop</Text>
        </View>

        {/* Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>CEP</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="00000-000"
              placeholderTextColor="#444"
              value={cep}
              onChangeText={handleCepChange}
              keyboardType="numeric"
              maxLength={9}
              returnKeyType="search"
              onSubmitEditing={buscarCep}
            />
            {cep.length > 0 && (
              <TouchableOpacity style={styles.clearBtn} onPress={limpar}>
                <MaterialIcons name="close" size={18} color="#666" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[styles.botaoBuscar, loading && styles.botaoBuscarDisabled]}
            onPress={buscarCep}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#0a0a0a" size="small" />
            ) : (
              <>
                <MaterialIcons name="search" size={20} color="#0a0a0a" />
                <Text style={styles.botaoBuscarTexto}>BUSCAR</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Erro */}
        {erro && (
          <View style={styles.erroContainer}>
            <MaterialIcons name="error-outline" size={18} color="#ff4444" />
            <Text style={styles.erroTexto}>{erro}</Text>
          </View>
        )}

        {/* Resultado */}
        {endereco && (
          <View style={styles.resultadoContainer}>

            <View style={styles.resultadoHeader}>
              <FontAwesome name="map-marker" size={16} color="#00ff87" />
              <Text style={styles.resultadoTitulo}>ENDEREÇO ENCONTRADO</Text>
            </View>

            <View style={styles.divider} />

            <InfoRow
              icon="pin"
              label="CEP"
              valor={endereco.cep}
            />
            <InfoRow
              icon="edit-road"
              label="LOGRADOURO"
              valor={endereco.logradouro}
            />
            {endereco.complemento ? (
              <InfoRow
                icon="info-outline"
                label="COMPLEMENTO"
                valor={endereco.complemento}
              />
            ) : null}
            <InfoRow
              icon="holiday-village"
              label="BAIRRO"
              valor={endereco.bairro}
            />
            <InfoRow
              icon="location-city"
              label="CIDADE"
              valor={endereco.localidade}
            />
            <InfoRow
              icon="map"
              label="ESTADO"
              valor={endereco.uf}
            />
            <InfoRow
              icon="phone"
              label="DDD"
              valor={endereco.ddd}
            />

            <View style={styles.divider} />

            {/* Endereço completo */}
            <View style={styles.enderecoCompleto}>
              <Text style={styles.enderecoCompletoLabel}>ENDEREÇO COMPLETO</Text>
              <Text style={styles.enderecoCompletoTexto}>
                {[
                  endereco.logradouro,
                  endereco.complemento,
                  endereco.bairro,
                  `${endereco.localidade} - ${endereco.uf}`,
                  endereco.cep,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>

          </View>
        )}

        {/* Dica inicial */}
        {!endereco && !erro && !loading && (
          <View style={styles.dicaContainer}>
            <MaterialIcons name="info-outline" size={16} color="#333" />
            <Text style={styles.dicaTexto}>
              Digite um CEP brasileiro válido para ver o endereço completo.
            </Text>
          </View>
        )}

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
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00ff87',
    letterSpacing: 3,
    marginTop: 16,
  },
  subtitulo: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 2,
    marginTop: 6,
    textTransform: 'uppercase',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00ff87',
    letterSpacing: 2,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 4,
    marginBottom: 12,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  clearBtn: {
    padding: 8,
  },
  botaoBuscar: {
    backgroundColor: '#00ff87',
    borderRadius: 4,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  botaoBuscarDisabled: {
    opacity: 0.6,
  },
  botaoBuscarTexto: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0a0a0a',
    letterSpacing: 2,
  },
  erroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1a0a0a',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 4,
    padding: 14,
    marginBottom: 20,
  },
  erroTexto: {
    flex: 1,
    color: '#ff4444',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  resultadoContainer: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#1e1e1e',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resultadoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: '#0f0f0f',
  },
  resultadoTitulo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00ff87',
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#1a1a1a',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#161616',
    gap: 14,
  },
  infoIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  infoTextos: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  infoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ddd',
    letterSpacing: 0.3,
  },
  enderecoCompleto: {
    padding: 16,
    backgroundColor: '#0d0d0d',
  },
  enderecoCompletoLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  enderecoCompletoTexto: {
    fontSize: 13,
    color: '#888',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  dicaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 16,
    backgroundColor: '#0d0d0d',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  dicaTexto: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    letterSpacing: 0.3,
    lineHeight: 20,
  },
});