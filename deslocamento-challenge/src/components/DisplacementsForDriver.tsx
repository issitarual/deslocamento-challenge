import { DISPLACEMENT, PASSENGER_NAME } from "@/helpers/contants";
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
      <Box sx={{borderRadius: "5px",
              border: 1,
              borderColor: "grey.500",
              padding: 2}}>
      <Typography><b>{PASSENGER_NAME}:</b> {riderName}</Typography>
      <Typography><b>{DISPLACEMENT.START_DISPLACEMENT}:</b> {inicioDeslocamento}</Typography>
      <Typography><b>{DISPLACEMENT.CHECKLIST}:</b> {checkList}</Typography>
      <Typography><b>{DISPLACEMENT.REASON}:</b> {motivo}</Typography>
      <Typography><b>{DISPLACEMENT.OBSERVATION}:</b> {observacao}</Typography>
      </Box>
      <TextField
        margin="normal"
        fullWidth
        name={DISPLACEMENT.FINAL_KM}
        label={DISPLACEMENT.FINAL_KM}
        type="number"
        id={DISPLACEMENT.FINAL_KM}
        autoComplete={DISPLACEMENT.FINAL_KM}
        disabled={loading}
        value={kmFinal}
        onChange={(e) => setKmFinal(parseInt(e.target.value))}
      />
      <TextField
        margin="normal"
        fullWidth
        name={DISPLACEMENT.OBSERVATION}
        label={DISPLACEMENT.OBSERVATION}
        type="string"
        id={DISPLACEMENT.OBSERVATION}
        autoComplete={DISPLACEMENT.OBSERVATION}
        disabled={loading}
        value={observacaoDriver}
        onChange={(e) => setObservacao(e.target.value)}
      />
    </Box>
  );
}
