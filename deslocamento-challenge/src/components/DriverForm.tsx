import { CATEGORIA_HABILITAÇÃO_VALUES } from "@/helpers/contants";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function DriverForm({
  categoriaHabilitacao,
  setCategoriaHabilitacao,
  vencimentoHabilitacao,
  setVencimentoHabilitacao,
}: {
  categoriaHabilitacao: string;
  setCategoriaHabilitacao: Dispatch<SetStateAction<string>>;
  vencimentoHabilitacao: string;
  setVencimentoHabilitacao: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputLabel>Categoria</InputLabel>
      <Select
        required
        fullWidth
        name="document category"
        label="Categoria da habilitação"
        type="text"
        id="document category"
        autoComplete="document category"
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
      <InputLabel>Validade</InputLabel>
      <TextField
        required
        fullWidth
        name="document expiration date"
        type="date"
        id="document expiration date"
        autoComplete="document expiration date"
        value={vencimentoHabilitacao}
        onChange={(e) => {
          setVencimentoHabilitacao(e.target.value);
        }}
      />
    </>
  );
}
