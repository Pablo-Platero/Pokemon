import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';
import PokemonCard from '../components/PokemonCard';

interface PokemonItem {
    name: string;
    url: string;
}

interface PokemonResponse {
    results: PokemonItem[];
}

export default function HomeScreen() {
    const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchPokemons = async () => {
        setLoading(true);
        try {
            const { data } = await api.get<PokemonResponse>('/pokemon?limit=20');
            setPokemon(data.results);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
        setLoading(false);
    };

    const searchPokemon = async (name: string) => {
        setLoading(true);
        if (name.trim() === '') {
            fetchPokemons();
        } else {
            try {
                const { data } = await api.get(`/pokemon/${name.toLowerCase()}`);
                setPokemon([{ name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}/` }]);
            } catch (error) {
                setPokemon([]);
                console.error('Error searching pokemon:', error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🎰 Personajes de Pokémon</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Buscar Pokémon por nombre"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => searchPokemon(searchQuery)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#1e90ff" />
            ) : pokemon.length > 0 ? (
                <View style={styles.pokemonContainer}>
                    {pokemon.map((pokemonItem) => (
                        <PokemonCard 
                            key={pokemonItem.url} 
                            pokemon={pokemonItem} 
                            navigation={navigation} 
                        />
                    ))}
                </View>
            ) : (
                <Text style={styles.noResults}>No se encontraron Pokémon.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#1f6ea27b',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    searchInput: {
        height: 40,
        borderColor: '#1e90ff',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    pokemonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});