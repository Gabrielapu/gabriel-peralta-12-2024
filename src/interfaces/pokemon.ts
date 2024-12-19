export interface Pokemon {
  url?: string;
  id: number;
  name: string;
  image: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  cries: {
    latest: string;
  };
  stats: [
    {
      base_stat: number;
      stat: {
        name: string;
      };
    }
  ];
  flavor_text_entries: {
    flavor_text: string;
  };
  height: number;
  weight: number;
}