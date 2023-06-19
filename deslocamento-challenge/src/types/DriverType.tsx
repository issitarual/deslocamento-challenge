type Driver = {
  nome: string;
  numeroHabilitacao: string;
  categoriaHabilitacao: string;
  vencimentoHabilitacao: string;
};

interface DriverResponse {
  drivers: Driver[];
  total: number;
  skip: number;
  limit: number;
}

export type {Driver, DriverResponse};
