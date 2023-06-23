import DrawerMenu from "@/components/DrawerMenu";
import InputField from "@/components/InputField";
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
import { Box, Button, CssBaseline, Typography } from "@mui/material";
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
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [kmAtual, setKmAtual] = useState("");

  async function fetchVehicle() {
    const vehicleResponse = await fetchGetVehicle(vehicleId);
    if (vehicleResponse) {
      setPlaca(vehicleResponse.placa);
      setMarcaModelo(vehicleResponse.marcaModelo);
      setAnoFabricacao(vehicleResponse.anoFabricacao.toString());
      setKmAtual(vehicleResponse.kmAtual.toString());
    }
  }

  async function handleSubmitVehicle() {
    setLoading(true);
    const vehicle = {
      id: vehicleId,
      placa,
      marcaModelo,
      anoFabricacao: parseInt(anoFabricacao),
      kmAtual: parseInt(kmAtual),
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
          <InputField
            label={VEHICLE.LICENTE_PLATE}
            value={placa}
            handleChange={setPlaca}
          />
          <InputField
            label={VEHICLE.BRAND_MODEL}
            value={marcaModelo}
            handleChange={setMarcaModelo}
          />
          <InputField
            label={VEHICLE.MANUFACTURE_YEAR}
            type="number"
            value={anoFabricacao}
            handleChange={setAnoFabricacao}
          />
          <InputField
            label={VEHICLE.CURRENT_KM}
            type="number"
            value={kmAtual}
            handleChange={setKmAtual}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ paddingY: 2, marginY: 2 }}
            disabled={loading}
            onClick={handleSubmitVehicle}
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
