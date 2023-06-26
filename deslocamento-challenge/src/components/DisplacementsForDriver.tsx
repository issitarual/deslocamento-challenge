import { DISPLACEMENT, PASSENGER_NAME } from "@/helpers/contants";
import { Displacement } from "@/types/DisplacementType";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import InputField from "./InputField";

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
  kmFinal: string;
  setKmFinal: Dispatch<SetStateAction<string>>;
  observacaoDriver: string;
  setObservacao: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Box textAlign="center">
      <Box
        sx={{
          borderRadius: "5px",
          border: 1,
          borderColor: "grey.500",
          padding: 2,
        }}
      >
        <Typography>
          <b>{PASSENGER_NAME}:</b> {riderName || ""}
        </Typography>
        <Typography>
          <b>{DISPLACEMENT.START_DISPLACEMENT}:</b>{" "}
          {displacement?.inicioDeslocamento || ""}
        </Typography>
        <Typography>
          <b>{DISPLACEMENT.CHECKLIST}:</b> {displacement?.checkList || ""}
        </Typography>
        <Typography>
          <b>{DISPLACEMENT.REASON}:</b> {displacement?.motivo || ""}
        </Typography>
        <Typography>
          <b>{DISPLACEMENT.OBSERVATION}:</b> {displacement?.observacao || ""}
        </Typography>
      </Box>
      <InputField
        name={DISPLACEMENT.FINAL_KM}
        type="number"
        value={kmFinal}
        handleChange={setKmFinal}
      />
      <InputField
        name={DISPLACEMENT.OBSERVATION}
        value={observacaoDriver}
        handleChange={setObservacao}
      />
    </Box>
  );
}
