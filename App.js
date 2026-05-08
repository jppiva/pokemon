import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

export default function App() {
  const [name, setNomePokemon] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  async function buscarPokemon() {
    if (!name.trim()) {
      Alert.alert('Aviso', 'Digite o nome do Pokémon');
      return;
    }

    setLoading(true);
    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`);
      
      if (!resposta.ok) {
        Alert.alert('Erro', 'Pokémon não encontrado');
        setPokemon(null);
        return;
      }
      
      const dados = await resposta.json();
      setPokemon(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar. Verifique sua internet.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📍Busca Pokemon</Text>

      <TextInput
      style={styles.input}
      placeholder="Digite o Nome do Pokemon"
      value={name}
      onChangeText={setNomePokemon}
      keyboardType="text">
      </TextInput>

    <TouchableOpacity style={styles.botao} onPress={buscarPokemon}>
      <Text style={styles.botaoTexto}>Buscar</Text>
    </TouchableOpacity>

    {loading && <ActivityIndicator size="large" color="#1565C0" style={styles.loader} />}

    {pokemon && (
      <View style={styles.resultado}>
        <Text style={styles.item}>🔹 Nome: {pokemon.name}</Text>
        <Text style={styles.item}>🔹 ID: {pokemon.id}</Text>
        <Text style={styles.item}>🔹 Altura: {pokemon.height / 10} m</Text>
        <Text style={styles.item}>🔹 Peso: {pokemon.weight / 10} kg</Text>
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#f0f4ff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1565C0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#1565C0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  loader: {
    marginTop: 32,
  },
});
//fim