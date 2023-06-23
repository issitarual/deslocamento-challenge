import {
  CATEGORIA_HABILITAÇÃO_VALUES,
  DOCUMENT,
  EXPIRATION_DATE,
  LICENSE_CATEGORY,
} from "@/helpers/contants";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function DriverForm({
  categoriaHabilitacao,
  setCategoriaHabilitacao,
  vencimentoHabilitacao,
  setVencimentoHabilitacao,
  numeroHabilitacao,
  setNumeroHabilitacao,
  disableInput,
}: {
  categoriaHabilitacao: string;
  setCategoriaHabilitacao: Dispatch<SetStateAction<string>>;
  vencimentoHabilitacao: string;
  setVencimentoHabilitacao: Dispatch<SetStateAction<string>>;
  numeroHabilitacao: string;
  setNumeroHabilitacao: Dispatch<SetStateAction<string>>;
  disableInput: boolean;
}) {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        name={DOCUMENT.CNH}
        label={DOCUMENT.CNH}
        type="number"
        id={DOCUMENT.CNH}
        autoComplete={DOCUMENT.CNH}
        disabled={disableInput}
        value={numeroHabilitacao}
        onChange={(e) => {
          setNumeroHabilitacao(e.target.value);
        }}
      />
      <InputLabel>{LICENSE_CATEGORY}</InputLabel>
      <Select
        required
        fullWidth
        name={LICENSE_CATEGORY}
        label={LICENSE_CATEGORY}
        type="text"
        id={LICENSE_CATEGORY}
        autoComplete={LICENSE_CATEGORY}
        disabled={disableInput}
        onChange={(e) => {
          setCategoriaHabilitacao(e.target.value);
        }}
        value={categoriaHabilitacao}
      >
        <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.A}>
          {CATEGORIA_HABILITAÇÃO_VALUES.A}
        </MenuItem>
        <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.B}>
          {CATEGORIA_HABILITAÇÃO_VALUES.B}
        </MenuItem>
        <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.C}>
          {CATEGORIA_HABILITAÇÃO_VALUES.C}
        </MenuItem>
        <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.D}>
          {CATEGORIA_HABILITAÇÃO_VALUES.D}
        </MenuItem>
        <MenuItem value={CATEGORIA_HABILITAÇÃO_VALUES.E}>
          {CATEGORIA_HABILITAÇÃO_VALUES.E}
        </MenuItem>
      </Select>
      <InputLabel>{EXPIRATION_DATE}</InputLabel>
      <TextField
        required
        fullWidth
        name={EXPIRATION_DATE}
        type="date"
        id={EXPIRATION_DATE}
        autoComplete={EXPIRATION_DATE}
        disabled={disableInput}
        value={vencimentoHabilitacao}
        onChange={(e) => {
          setVencimentoHabilitacao(e.target.value);
        }}
      />
    </>
  );
}
