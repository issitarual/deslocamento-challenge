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
          Distância percorrida
        </Typography>
        <Typography variant="body1" component="p">
          Inicial: {kmInicial}
        </Typography>
        {kmFinal ? (
          <>
            <Typography variant="body1" component="p">
              Final: {kmFinal}
            </Typography>
            <Typography variant="body1" component="p">
              Total: {kmFinal - kmInicial}
            </Typography>
          </>
        ) : null}

        <Typography
          variant="body1"
          component="p"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Duração da viagem
        </Typography>
        <Typography variant="body1" component="p">
          Início do deslocamento: {inicioDeslocamento}
        </Typography>
        {fimDeslocamento ? (
          <>
            <Typography variant="body1" component="p">
              Final do deslocamento: {fimDeslocamento}
            </Typography>
          </>
        ) : null}

        {checkList || motivo || observacao ? (
          <Typography
            variant="body1"
            component="p"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Outra informações
          </Typography>
        ) : null}
        {checkList ? (
          <Typography variant="body1" component="p">
            CheckList: {checkList}
          </Typography>
        ) : null}
        {motivo ? (
          <Typography variant="body1" component="p">
            Motivo: {motivo}
          </Typography>
        ) : null}
        {observacao ? (
          <Typography variant="body1" component="p">
            Observação: {observacao}
          </Typography>
        ) : null}
      </Box>
    );
  }