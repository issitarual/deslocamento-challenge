import {
  CATEGORIA_HABILITAÇÃO_VALUES,
  DOCUMENT,
  EXPIRATION_DATE,
  LICENSE_CATEGORY,
} from "@/helpers/contants";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import InputField from "./InputField";
import { useGlobalContext } from "@/hooks/useGlobalContext ";

export default function DriverForm({
  categoriaHabilitacao,
  setCategoriaHabilitacao,
  vencimentoHabilitacao,
  setVencimentoHabilitacao,
  numeroHabilitacao,
  setNumeroHabilitacao,
}: {
  categoriaHabilitacao: string;
  setCategoriaHabilitacao: Dispatch<SetStateAction<string>>;
  vencimentoHabilitacao: string;
  setVencimentoHabilitacao: Dispatch<SetStateAction<string>>;
  numeroHabilitacao: string;
  setNumeroHabilitacao: Dispatch<SetStateAction<string>>;
}) {
  const { loading } = useGlobalContext();
  return (
    <>
      <InputField
        label={DOCUMENT.CNH}
        type="number"
        value={numeroHabilitacao}
        handleChange={setNumeroHabilitacao}
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
        disabled={loading}
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
        disabled={loading}
        value={vencimentoHabilitacao}
        onChange={(e) => {
          setVencimentoHabilitacao(e.target.value);
        }}
      />
    </>
  );
}
