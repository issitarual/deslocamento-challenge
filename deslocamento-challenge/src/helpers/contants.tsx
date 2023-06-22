const USER_TYPE = {
  DRIVER: "Motorista",
  RIDER: "Passageiro",
};

const SIGN_UP_COMMAND = "Não possui uma conta? Cadastre-se";

const SIGN_IN_COMMAND = "Já possui uma conta? Entre já!";

const ACCOUNT_TYPE_COMMAND = "Selecione o tipo de conta";

const APP_NAME = "Deslocamento App";

const SIGN_IN_SUBMIT_BUTTON = "Entrar";

const SIGN_UP_SUBMIT_BUTTON = "Cadastrar";

const MISSING_INFORMATION_SIGN_FORM = "Digite todas as informações solicitadas";

const ERROR_SIGN_FORM = "Algo deu errado, tente novamente.";

const FIND_DISPLACEMENT = "Buscar outra corrida";

const FIND_RIDER = "Buscar outro motorista";

const ASK_FOR_DISPLACEMENT = "Solicitar corrida";

const END_DISPLACEMENT = "Finalizar corrida";

const WITHOUT_DISPLACEMENT_MESSAGE =
  "Até o momento você não fez nenhuma corrida";

const API_URL = "https://api-deslocamento.herokuapp.com/api/v1";

const CATEGORIA_HABILITAÇÃO_VALUES = { A: "A", B: "B", C: "C", D: "D", E: "E" };

const DRAWER_WIDTH = 240;

const EMPTY_DRIVER = {
  id: "",
  nome: "",
  numeroHabilitacao: "",
  categoriaHabilitacao: "",
  vencimentoHabilitacao: "",
};

const EMPTY_WEATHER = {
  date: "",
  summary: "",
  temperatureC: 0,
  temperatureF: 0,
};

const EMPTY_DISPLACEMENT = {
  id: "",
  kmInicial: 0,
  kmFinal: 0,
  inicioDeslocamento: "",
  fimDeslocamento: "",
  checkList: "",
  motivo: "",
  observacao: "",
  idCondutor: 0,
  idVeiculo: 0,
  idCliente: 0,
};

const EMPTY_RIDER = {
  nome: "",
  numeroDocumento: "",
  tipoDocumento: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
};

const EMPTY_VEHICLE = {
  placa: "",
  marcaModelo: "",
  anoFabricacao: 0,
  kmAtual: 0,
};

export {
  USER_TYPE,
  SIGN_UP_COMMAND,
  SIGN_IN_COMMAND,
  APP_NAME,
  SIGN_IN_SUBMIT_BUTTON,
  SIGN_UP_SUBMIT_BUTTON,
  ACCOUNT_TYPE_COMMAND,
  API_URL,
  CATEGORIA_HABILITAÇÃO_VALUES,
  MISSING_INFORMATION_SIGN_FORM,
  ERROR_SIGN_FORM,
  DRAWER_WIDTH,
  EMPTY_DRIVER,
  EMPTY_WEATHER,
  EMPTY_DISPLACEMENT,
  EMPTY_RIDER,
  FIND_DISPLACEMENT,
  FIND_RIDER,
  ASK_FOR_DISPLACEMENT,
  END_DISPLACEMENT,
  WITHOUT_DISPLACEMENT_MESSAGE,
  EMPTY_VEHICLE,
};
