import Logo from "@/components/Logo";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import SideBar from "@/helpers/api/Sidebar";
import { fetchGetWeather } from "@/helpers/api/Weather";
import { Driver } from "@/types/DriverType";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

export default function Home() {
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

  console.log(weather);
  return (
    <Container component="main" maxWidth="xl" sx={{ bgcolor: grey[100] }}>
      <Box sx={{ height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <CssBaseline />
          <Grid item width="100%">
            <Box margin={3}>
              <Logo />
            </Box>
            <Divider />
          </Grid>
          <Grid container flexDirection="row" alignItems="center">
            <Grid item xs={4}>
                <SideBar />
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ borderLeft: 1, borderColor: "grey.300" }}>
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
                    sx={{paddingY: 2}}
                  >
                    Buscar outro motorista
                  </Button>
                  <Button sx={{paddingY: 2}} variant="contained">Iniciar corrida</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  function getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
