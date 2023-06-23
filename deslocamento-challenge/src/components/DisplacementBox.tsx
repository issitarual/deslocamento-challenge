import { DISPLACEMENT, DISPLACEMENT_BOX_FIELDS } from "@/helpers/contants";
import { Displacement as DisplacementType } from "@/types/DisplacementType";
import { Box, Typography } from "@mui/material";

export default function DisplacementBox({ d }: { d: DisplacementType }) {
  const {
    kmInicial,
    kmFinal,
    inicioDeslocamento,
    fimDeslocamento,
    checkList,
    motivo,
    observacao,
  } = d;
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "primary.main",
        borderRadius: "16px",
        padding: 2,
        marginY: 2,
      }}
    >
      <Typography
        variant="body1"
        component="p"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {DISPLACEMENT_BOX_FIELDS.TRAVELLED_DISTANCE}
      </Typography>
      <Typography variant="body1" component="p">
        {DISPLACEMENT_BOX_FIELDS.INITIAL}: {kmInicial}
      </Typography>
      {kmFinal ? (
        <>
          <Typography variant="body1" component="p">
            {DISPLACEMENT_BOX_FIELDS.FINAL}: {kmFinal}
          </Typography>
          <Typography variant="body1" component="p">
            {DISPLACEMENT_BOX_FIELDS.TOTAL}: {kmFinal - kmInicial}
          </Typography>
        </>
      ) : null}

      <Typography
        variant="body1"
        component="p"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        {DISPLACEMENT_BOX_FIELDS.TRAVEL_DURATION}
      </Typography>
      <Typography variant="body1" component="p">
        {DISPLACEMENT.START_DISPLACEMENT}: {inicioDeslocamento}
      </Typography>
      {fimDeslocamento ? (
        <>
          <Typography variant="body1" component="p">
            {DISPLACEMENT.FINISH_DISPLACEMENT}: {fimDeslocamento}
          </Typography>
        </>
      ) : null}

      {checkList || motivo || observacao ? (
        <Typography
          variant="body1"
          component="p"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {DISPLACEMENT_BOX_FIELDS.OTHER_INFOMATION}
        </Typography>
      ) : null}
      {checkList ? (
        <Typography variant="body1" component="p">
          {DISPLACEMENT.CHECKLIST}: {checkList}
        </Typography>
      ) : null}
      {motivo ? (
        <Typography variant="body1" component="p">
          {DISPLACEMENT.REASON}: {motivo}
        </Typography>
      ) : null}
      {observacao ? (
        <Typography variant="body1" component="p">
          {DISPLACEMENT.OBSERVATION}: {observacao}
        </Typography>
      ) : null}
    </Box>
  );
}
