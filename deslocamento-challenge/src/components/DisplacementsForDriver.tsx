import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Displacement } from "@/types/DisplacementType";
import { Box, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function DisplacementsForDriver({
  displacement,
  riderName,
  kmFinal,
  setKmFinal,
  observacaoDriver,
  setObservacao,
}: {
  displacement: Displacement;
  riderName: string;
  kmFinal: number;
  setKmFinal: Dispatch<SetStateAction<number>>;
  observacaoDriver: string;
  setObservacao: Dispatch<SetStateAction<string>>;
}) {
  const { loading } = useGlobalContext();
  const { inicioDeslocamento, checkList, motivo, observacao } = displacement;
  return (
    <Box textAlign="center">
      <Typography>Nome do passageiro: {riderName}</Typography>
      <Typography>Início do deslocamento: {inicioDeslocamento}</Typography>
      <Typography>Checklist: {checkList}</Typography>
      <Typography>Motivo: {motivo}</Typography>
      <Typography>Observação: {observacao}</Typography>
      <TextField
        margin="normal"
        fullWidth
        name="kmFinal"
        label="kmFinal"
        type="number"
        id="kmFinal"
        autoComplete="kmFinal"
        disabled={loading}
        value={kmFinal}
        onChange={(e) => setKmFinal(parseInt(e.target.value))}
      />
      <TextField
        margin="normal"
        fullWidth
        name="Observação"
        label="Observação"
        type="string"
        id="Observação"
        autoComplete="Observação"
        disabled={loading}
        value={observacaoDriver}
        onChange={(e) => setObservacao(e.target.value)}
      />
    </Box>
  );
}
