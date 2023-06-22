import DrawerMenu from "@/components/DrawerMenu";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import {
  fetchGetVehicle,
  fetchPostVehicle,
  fetchUpdateVehicle,
} from "@/helpers/api/Vehicle";
import { DRAWER_WIDTH } from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Vehicle } from "@/types/VehicleType";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Vehicle() {
  const router = useRouter();
  const { openDrawer, vehicleId, setVehicleId } = useGlobalContext();

  const [windowWidth, setWindowWidth] = useState(0);

  const [placa, setPlaca] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState(0);
  const [kmAtual, setKmAtual] = useState(0);

  async function fetchVehicle() {
    const vehicleResponse = await fetchGetVehicle(vehicleId);
    if (vehicleResponse) {
      setPlaca(vehicleResponse.placa);
      setMarcaModelo(vehicleResponse.marcaModelo);
      setAnoFabricacao(vehicleResponse.anoFabricacao);
      setKmAtual(vehicleResponse.kmAtual);
    }
  }

  async function handleSubmitVehicle() {
    const vehicle = {
      id: vehicleId,
      placa,
      marcaModelo,
      anoFabricacao,
      kmAtual,
    };
    if (vehicleId) {
      await fetchUpdateVehicle(vehicle);
      return router.push("/home");
    } else {
      const id = await fetchPostVehicle(vehicle);
      if (!id) {
        return alert("Algo deu errado, tente novamente");
      }
      setVehicleId(id);
      return router.push("/home");
    }
  }
  useEffect(() => {
    setWindowWidth(window.screen.availWidth);

    if (vehicleId) {
      fetchVehicle();
    }
  }, []);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <MainHeader />
      <DrawerMenu />
      <Main open={windowWidth < 780 ? false : openDrawer}>
        <Box sx={{ marginTop: "80px", paddingLeft: `${DRAWER_WIDTH}px` }}>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Veículo
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="Placa"
            label="Placa"
            type="text"
            id="Placa"
            autoComplete="Placa"
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Marca/Modelo"
            label="Marca/Modelo"
            type="text"
            id="Marca/Modelo"
            autoComplete="Marca/Modelo"
            value={marcaModelo}
            onChange={(e) => {
              setMarcaModelo(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Ano de fabricação"
            label="Ano de fabricação"
            type="number"
            id="Ano de fabricação"
            autoComplete="Ano de fabricação"
            value={anoFabricacao}
            onChange={(e) => {
              setAnoFabricacao(parseInt(e.target.value));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Km atual"
            label="Km atual"
            type="number"
            id="Km atual"
            autoComplete="Km atual"
            value={kmAtual}
            onChange={(e) => {
              setKmAtual(parseInt(e.target.value));
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ paddingY: 2, marginY: 2 }}
            onClick={() => {
              handleSubmitVehicle;
            }}
          >
            {vehicleId ? "Atualizar veículo" : "Adicionar veículo "}
          </Button>
        </Box>
      </Main>
    </Box>
  );
}
