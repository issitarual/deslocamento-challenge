import DrawerMenu from "@/components/DrawerMenu";
import Main from "@/components/Main";
import MainHeader from "@/components/MainHeader";
import ThreeDotsLoading from "@/components/ThreeDotsLoading";
import {
  fetchGetVehicle,
  fetchPostVehicle,
  fetchUpdateVehicle,
} from "@/helpers/api/Vehicle";
import {
  ADD_VEHICLE,
  DRAWER_WIDTH,
  ERROR_FORM,
  MENU_OPTIONS,
  ROUTE,
  UPDATE_VEHICLE,
  VEHICLE,
} from "@/helpers/contants";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { Vehicle } from "@/types/VehicleType";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Vehicle() {
  const router = useRouter();
  const { openDrawer, vehicleId, setVehicleId, setLoading, loading } =
    useGlobalContext();

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
    setLoading(true);
    const vehicle = {
      id: vehicleId,
      placa,
      marcaModelo,
      anoFabricacao,
      kmAtual,
    };
    if (vehicleId) {
      await fetchUpdateVehicle(vehicle);
      setLoading(false);
      return router.push(ROUTE.HOME);
    } else {
      const id = await fetchPostVehicle(vehicle);
      if (!id) {
        setLoading(false);
        return alert(ERROR_FORM);
      }
      setVehicleId(id);
      setLoading(false);
      return router.push(ROUTE.HOME);
    }
  }
  useEffect(() => {
    setLoading(true);
    setWindowWidth(window.screen.availWidth);

    if (vehicleId) {
      fetchVehicle();
    }
    setLoading(false);
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
            {MENU_OPTIONS.VEHICLE}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name={VEHICLE.LICENTE_PLATE}
            label={VEHICLE.LICENTE_PLATE}
            type="text"
            id={VEHICLE.LICENTE_PLATE}
            autoComplete={VEHICLE.LICENTE_PLATE}
            disabled={loading}
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name={VEHICLE.BRAND_MODEL}
            label={VEHICLE.BRAND_MODEL}
            type="text"
            id={VEHICLE.BRAND_MODEL}
            autoComplete={VEHICLE.BRAND_MODEL}
            disabled={loading}
            value={marcaModelo}
            onChange={(e) => {
              setMarcaModelo(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name={VEHICLE.MANUFACTURE_YEAR}
            label={VEHICLE.MANUFACTURE_YEAR}
            type="number"
            id={VEHICLE.MANUFACTURE_YEAR}
            autoComplete={VEHICLE.MANUFACTURE_YEAR}
            disabled={loading}
            value={anoFabricacao}
            onChange={(e) => {
              setAnoFabricacao(parseInt(e.target.value));
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name={VEHICLE.CURRENT_KM}
            label={VEHICLE.CURRENT_KM}
            type="number"
            id={VEHICLE.CURRENT_KM}
            autoComplete={VEHICLE.CURRENT_KM}
            disabled={loading}
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
            disabled={loading}
            onClick={() => {
              handleSubmitVehicle;
            }}
          >
            {loading ? (
              <ThreeDotsLoading />
            ) : vehicleId ? (
              UPDATE_VEHICLE
            ) : (
              ADD_VEHICLE
            )}
          </Button>
        </Box>
      </Main>
    </Box>
  );
}
