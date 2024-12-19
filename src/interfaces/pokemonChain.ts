export interface PokemonChain {
  baby_trigger_item: null;
  chain: {
    evolution_details: [];
    evolves_to: [
      {
        evolution_details: [ { item: null; trigger: { name: string } } ];
        evolves_to: [];
        is_baby: boolean;
        species: { name: string; url: string };
      }
    ];
    is_baby: boolean;
    species: { name: string; url: string };
  };
}