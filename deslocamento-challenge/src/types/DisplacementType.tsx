type StartDisplacementRequest = {
  kmInicial: number;
  inicioDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
};

type FinishDisplacementRequest = {
  id: string;
  kmFinal: number;
  fimDeslocamento: string;
  observacao: string;
};

type Displacement = {
  id: string;
  kmInicial: number;
  kmFinal: number;
  inicioDeslocamento: string;
  fimDeslocamento: string;
  checkList: string;
  motivo: string;
  observacao: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente: number;
};

export type { StartDisplacementRequest, Displacement, FinishDisplacementRequest };
