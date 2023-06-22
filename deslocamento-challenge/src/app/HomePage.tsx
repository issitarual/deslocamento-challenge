import ThermostatIcon from "@mui/icons-material/Thermostat";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import { fetchGetWeather } from "@/helpers/api/Weather";
import { Driver } from "@/types/DriverType";
import { Box, Button, CssBaseline, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import React from "react";
import Main from "@/components/Main";
import { useGlobalContext } from "@/hooks/useGlobalContext ";
import {
  ASK_FOR_DISPLACEMENT,
  DRAWER_WIDTH,
  EMPTY_DISPLACEMENT,
  EMPTY_DRIVER,
  EMPTY_RIDER,
  EMPTY_WEATHER,
  FIND_DISPLACEMENT,
  FIND_RIDER,
  START_DISPLACEMENT,
  USER_TYPE,
} from "@/helpers/contants";
import MainHeader from "@/components/MainHeader";
import DrawerMenu from "@/components/DrawerMenu";
import {
  fetchGetAllDisplacements,
  fetchPostDisplacement,
} from "@/helpers/api/Displacement";
import { fetchGetRider } from "@/helpers/api/Rider";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { openDrawer, userType, userId, vehicleId } = useGlobalContext();
  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  const [weather, setWeather] = useState(EMPTY_WEATHER);
  const [drivers, setDrivers] = useState<Driver[]>([EMPTY_DRIVER]);
  const [currentDriver, setCurrentDriver] = useState(EMPTY_DRIVER);
  const [displacement, setDisplacement] = useState([EMPTY_DISPLACEMENT]);
  const [currentDisplacement, setCurrentDisplacement] = useState([
    EMPTY_DISPLACEMENT,
  ]);
  const [rider, setRider] = useState(EMPTY_RIDER);
  const [windowWidth, setWindowWidth] = useState(0);

  const [checkList, setCheckList] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");

  async function handleDisplacement() {
    const inicioDeslocamento = Date.now().toString();
    const idCondutor: number = currentDriver?.id || 0;
    const displacement = {
      kmInicial: 0,
      inicioDeslocamento,
      checkList,
      motivo,
      observacao,
      idCondutor,
      idVeiculo: 0,
      idCliente: parseInt(userId),
    };

    fetchPostDisplacement(displacement);
  }

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

  async function fetchRider(id: string) {
    const riderResponse = await fetchGetRider(id);
    if (riderResponse) {
      setRider(riderResponse);
    }
  }

  async function fetchDisplacement() {
    const displacementResponse = await fetchGetAllDisplacements();
    if (isUserTypeDriver) {
      displacement.find(
        (d) => d.idCondutor.toString() === userId && !d.kmFinal
      );
    } else {
      displacement.find((d) => d.idCliente.toString() === userId && !d.kmFinal);
    }
    if (displacementResponse) {
      setDisplacement(displacementResponse);
    }
  }

  useEffect(() => {
    // if (isUserTypeDriver && !vehicleId) {
    //   alert("Você precisa cadastrar um veículo antes de começar");
    //   router.push("/vehicle");
    //   return;
    // }
    setWindowWidth(window.screen.availWidth);

    fetchWeather();

    if (isUserTypeDriver) {
      fetchDisplacement();
      const randomDisplacementPosition = getRandom(displacement.length);
      const randomDisplacement = displacement[randomDisplacementPosition];
      setCurrentDisplacement(randomDisplacement);
    } else {
      fetchDriver();
      const randomDriverPosition = getRandom(drivers.length);
      const driver = drivers[randomDriverPosition];
      setCurrentDriver(driver);
    }
  }, []);

  console.log(drivers);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <MainHeader />
      <DrawerMenu />
      <Main open={windowWidth < 780 ? false : openDrawer}>
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
          {isUserTypeDriver ? "" : <></>}
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            component="p"
            textAlign="center"
          >
            {isUserTypeDriver ? "Viagem Solicitada" : "Motorista Disponível"}
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            {isUserTypeDriver ? null : currentDriver.nome}
          </Typography>
          <Box display="flex" flexDirection="column" padding={2}>
            {isUserTypeDriver ? null : (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  name="Checklist"
                  label="Checklist"
                  type="text"
                  id="Checklist"
                  autoComplete="Checklist"
                  value={checkList}
                  onChange={(e) => setCheckList(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="Motivo"
                  label="Motivo"
                  type="text"
                  id="Motivo"
                  autoComplete="Motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="Observação"
                  label="Observação"
                  type="text"
                  id="Observação"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  autoComplete="Observação"
                />
              </>
            )}

            <Button
              variant="text"
              onClick={() =>
                setCurrentDriver(drivers[getRandom(drivers.length)])
              }
              sx={{ paddingY: 2 }}
            >
              {isUserTypeDriver ? FIND_DISPLACEMENT : FIND_RIDER}
            </Button>
            <Button
              sx={{ paddingY: 2 }}
              variant="contained"
              onClick={handleDisplacement}
            >
              {isUserTypeDriver ? START_DISPLACEMENT : ASK_FOR_DISPLACEMENT}
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
