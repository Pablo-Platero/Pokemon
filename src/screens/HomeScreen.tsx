import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PokemonItem, PokemonResponse } from '../types/character';  // Ajusta los tipos importados
import global from '../styles/global';
import api from '../api/api';
import PokemonCard from '../components/PokemonCard';

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);  // Cambia el tipo aquí
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Función para obtener los Pokémon desde la API
  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<PokemonResponse>('/pokemon?limit=20');  // Cambia el tipo aquí
      setPokemon(data.results);  // Usa 'results' que es el arreglo de Pokémon
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Función para buscar Pokémon por nombre
  const searchPokemon = async (name: string) => {
    setLoading(true);
    if (name.trim() === '') {
      fetchPokemons();  // Si no hay nombre, muestra todos los Pokémon
    } else {
      try {
        const { data } = await api.get(`/pokemon/${name.toLowerCase()}`);
        setPokemon([data]);  // Solo el Pokémon encontrado
      } catch (error) {
        setPokemon([]);  // Si no encuentra el Pokémon, muestra vacío
        console.error(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <ScrollView style={global.container}>
      <Text style={global.title}>🎰 Personajes de Pokémon</Text>

      {/* Campo de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon por nombre"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => searchPokemon(searchQuery)}  // Cuando el usuario presione Enter
      />

      {/* Mostrar cargando mientras se obtiene o filtra */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        pokemon.length > 0 ? (
          pokemon.map((pokemonItem) => (
            <PokemonCard key={pokemonItem.url} pokemon={pokemonItem} navigation={navigation} />
          ))
        ) : (
          <Text>No se encontraron Pokémon.</Text>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
});
