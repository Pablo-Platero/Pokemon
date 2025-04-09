import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Hoverable } from "react-native-web-hover";
import { PokemonItem } from "../types/character";

const getPokemonIdFromUrl = (url?: string): string => {
  if (!url) return '0'; // Default value if URL is undefined
  const parts = url.split("/");
  return parts[parts.length - 2] || '0';
}

const getImageUrl = (url: string): string => {
  const id = getPokemonIdFromUrl(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

const PokemonCard = ({
  pokemon,
  navigation,
}: {
  pokemon: PokemonItem;
  navigation: any;
}) => {
  const imageUrl = getImageUrl(pokemon.url);

  return (
    <Hoverable>
      {({ hovered }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Details", { pokemon })}>
          <View
            style={[
              styles.card,
              hovered && styles.cardHover,
              Platform.OS === "web"
                ? ({ transition: "all 0.3s ease-in-out" } as any)
                : {},
            ]}
          >
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.name}>{pokemon.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    </Hoverable>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHover: {
    backgroundColor: "#f5f5f5",
    transform: [{ scale: 1.03 }],
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "capitalize",
  },
});
