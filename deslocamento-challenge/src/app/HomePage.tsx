import ThermostatIcon from "@mui/icons-material/Thermostat";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import { fetchGetWeather } from "@/helpers/api/Weather";
import { Driver } from "@/types/DriverType";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import React from "react";
import Main from "@/components/Main";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import { DRAWER_WIDTH } from "@/helpers/contants";
import MainHeader from "@/components/MainHeader";
import DrawerMenu from "@/components/DrawerMenu";

export default function Home() {

  const { openDrawer } = useGlobalContext();

  const [weather, setWeather] = useState({
    date: "",
    summary: "",
    temperatureC: 0,
    temperatureF: 0,
  });
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      nome: "",
      numeroHabilitacao: "",
      categoriaHabilitacao: "",
      vencimentoHabilitacao: "",
    },
  ]);
  const [currentDriver, setCurrentDriver] = useState({
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: "",
  });
  useEffect(() => {
    async function fetchWeather() {
      const weatherResponse = await fetchGetWeather();
      if (weatherResponse) {
        setWeather(weatherResponse);
      }
    }
    async function fetchDriver() {
      const driversResponse = await fetchGetAllDrivers();
      if (driversResponse) {
        setDrivers(driversResponse);
      }
    }
    fetchWeather();
    fetchDriver();
    const driver = drivers[getRandom(drivers.length)];
    setCurrentDriver(driver);
  }, []);

  return (
    <Box sx={{ height: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <MainHeader />
      <DrawerMenu />
      <Main open={window.screen.availWidth < 780 ? false : openDrawer}>
        <Box sx={{ marginTop: "100px", paddingLeft: `${DRAWER_WIDTH}px` }}>
          <Box
            sx={{
              borderRadius: "5px",
              border: 1,
              borderColor: "primary.main",
              paddingY: 3,
              margin: 3,
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ThermostatIcon color="primary" />
            <Typography
              color="primary"
              variant="h5"
              component="p"
              textAlign="center"
            >
              Clima de hoje: {weather.temperatureC} ºC
            </Typography>
          </Box>
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            component="p"
            textAlign="center"
          >
            Motorista Disponível
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            {currentDriver.nome}
          </Typography>
          <Box display="flex" flexDirection="column" padding={2}>
            <TextField
              margin="normal"
              fullWidth
              name="checklist"
              label="checklist"
              type="text"
              id="checklist"
              autoComplete="checklist"
            />
            <TextField
              margin="normal"
              fullWidth
              name="motivo"
              label="motivo"
              type="text"
              id="motivo"
              autoComplete="motivo"
            />
            <TextField
              margin="normal"
              fullWidth
              name="Observação"
              label="Observação"
              type="text"
              id="Observação"
              autoComplete="Observação"
            />
            <Button
              variant="text"
              onClick={() =>
                setCurrentDriver(drivers[getRandom(drivers.length)])
              }
              sx={{ paddingY: 2 }}
            >
              Buscar outro motorista
            </Button>
            <Button sx={{ paddingY: 2 }} variant="contained">
              Iniciar corrida
            </Button>
          </Box>
        </Box>
      </Main>
    </Box>
  );

  function getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
