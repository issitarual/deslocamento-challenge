type Rider = {
  nome: string;
  numeroDocumento: string;
  tipoDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

interface RiderResponse {
  riders: Rider[];
  total: number;
  skip: number;
  limit: number;
}

export type {Rider, RiderResponse};
