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

const ERROR_FORM = "Algo deu errado, tente novamente.";

const FIND_DISPLACEMENT = "Buscar outra corrida";

const FIND_RIDER = "Buscar outro motorista";

const ASK_FOR_DISPLACEMENT = "Solicitar corrida";

const END_DISPLACEMENT = "Finalizar corrida";

const FULL_NAME = "Nome completo";

const DOCUMENT = { CPF: "CPF", CNH: "Número da habilitação" };

const LICENSE_CATEGORY = "Categoria da habilitação";

const EXPIRATION_DATE = "Validade";

const VEHICLE = {
  LICENTE_PLATE: "Placa",
  BRAND_MODEL: "Marca/Modelo",
  MANUFACTURE_YEAR: "Ano de fabricação",
  CURRENT_KM: "Km atual",
};

const WITHOUT_DISPLACEMENT_MESSAGE =
  "Até o momento você não fez nenhuma corrida";

const ADD_VEHICLE = "Adicionar veículo";

const UPDATE_VEHICLE = "Atualizar veículo";

const API_URL = "https://api-deslocamento.herokuapp.com/api/v1";

const CATEGORIA_HABILITAÇÃO_VALUES = { A: "A", B: "B", C: "C", D: "D", E: "E" };

const UPDATE_ACCOUNT = "Atualizar informações";

const DELETE_ACCOUNT = "Excluir Conta";

const PASSENGER_NAME = "Nome do passageiro";

const HOME_ERROR_MESSAGE = {
  USER_NOT_FOUND: "Usuário não encontrado",
  VEHICLE_NOT_FOUND: "Você precisa cadastrar um veículo antes de começar",
};

const DRIVER_AVAILABLE = "Motorista Disponível";

const DISPLACEMENT_AVAILABLE = "Viagens Solicitadas";

const DISPLACEMENT_BOX_FIELDS = {
  TRAVELLED_DISTANCE: "Distância percorrida",
  INITIAL: "Inicial",
  FINAL: "Final",
  TOTAL: "Total",
  TRAVEL_DURATION: "Duração da viagem",
  OTHER_INFOMATION: "Outras informações",
};

const DRAWER_WIDTH = 240;

const ROUTE = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "sign-up",
  HOME: "/home",
  ACCOUNT: "/account",
  VEHICLE: "/vehicle",
  DISPLACEMENT: "/displacement",
};

const MENU_OPTIONS = {
  HOME: "Home",
  ACCOUNT: "Conta",
  DISPLACEMENT: "Corridas",
  LOGOUT: "Sair",
  VEHICLE: "Veículo",
};

const DISPLACEMENT = {
  REASON: "Motivo",
  CHECKLIST: "checklist",
  OBSERVATION: "Observação",
  FINAL_KM: "Km final",
  START_DISPLACEMENT: "Início do deslocamento",
  FINISH_DISPLACEMENT: "Final do deslocamento",
};

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
  ERROR_FORM,
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
  FULL_NAME,
  DOCUMENT,
  LICENSE_CATEGORY,
  EXPIRATION_DATE,
  ROUTE,
  MENU_OPTIONS,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_VEHICLE,
  UPDATE_VEHICLE,
  VEHICLE,
  HOME_ERROR_MESSAGE,
  DISPLACEMENT,
  DRIVER_AVAILABLE,
  DISPLACEMENT_AVAILABLE,
  PASSENGER_NAME,
  DISPLACEMENT_BOX_FIELDS,
};
