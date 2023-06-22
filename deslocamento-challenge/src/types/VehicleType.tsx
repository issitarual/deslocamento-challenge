type VehicleRequest = {
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
};

type Vehicle = {
  id: string;
  placa: string;
  marcaModelo: string;
  anoFabricacao: number;
  kmAtual: number;
};

export type { Vehicle, VehicleRequest };
