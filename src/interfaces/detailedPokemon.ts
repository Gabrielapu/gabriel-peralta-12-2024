export interface DetailedPokemon {
  id: number;
  name: string;
  image: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  };
  types: [
    {
      type: {
        name: string
      }
    }
  ];
  cries: {
    latest: string
  };
  stats: [
    {
      base_stat: number
      stat: {
        name: string
      }
    }
  ]
}