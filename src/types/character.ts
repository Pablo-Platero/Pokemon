// types/pokemon.ts
export interface PokemonItem {
    name: string;
    url: string;
  }
  
  export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonItem[];  // Aquí guardamos el arreglo de Pokémon
  }
  