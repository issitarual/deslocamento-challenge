import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function RiderForm({
  numeroDocumento,
  setNumeroDocumento,
  logradouro,
  setLogradouro,
  numero,
  setNumero,
  bairro,
  setBairro,
  cidade,
  setCidade,
  uf,
  setUF,
  disableInput,
}: {
  logradouro: string;
  setLogradouro: Dispatch<SetStateAction<string>>;
  numero: string;
  setNumero: Dispatch<SetStateAction<string>>;
  bairro: string;
  setBairro: Dispatch<SetStateAction<string>>;
  cidade: string;
  setCidade: Dispatch<SetStateAction<string>>;
  uf: string;
  setUF: Dispatch<SetStateAction<string>>;
  disableInput: boolean;
  numeroDocumento: string;
  setNumeroDocumento: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        name="document"
        label={"CPF"}
        type="number"
        id="document"
        autoComplete="document"
        disabled={disableInput}
        value={numeroDocumento}
        onChange={(e) => {
          setNumeroDocumento(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="adress"
        label="Logradouro"
        type="text"
        id="adress"
        autoComplete="adress"
        disabled={disableInput}
        value={logradouro}
        onChange={(e) => {
          setLogradouro(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="adress-number"
        label="Número"
        type="text"
        id="adress-number"
        autoComplete="adress-number"
        disabled={disableInput}
        value={numero}
        onChange={(e) => {
          setNumero(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="adress-district"
        label="Bairro"
        type="text"
        id="adress-district"
        autoComplete="adress-district"
        disabled={disableInput}
        value={bairro}
        onChange={(e) => {
          setBairro(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="adress-city"
        label="Cidade"
        type="text"
        id="adress-city"
        autoComplete="adress-city"
        disabled={disableInput}
        value={cidade}
        onChange={(e) => {
          setCidade(e.target.value);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="adress-state"
        label="Estado"
        type="text"
        id="adress-state"
        autoComplete="adress-state"
        disabled={disableInput}
        value={uf}
        onChange={(e) => {
          setUF(e.target.value);
        }}
      />
    </>
  );
}
