type Rider = {
  id?: string;
  nome: string;
  numeroDocumento: string;
  tipoDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type RiderRequest = {
  nome: string;
  numeroDocumento: string;
  tipoDocumento: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type { Rider, RiderRequest };
