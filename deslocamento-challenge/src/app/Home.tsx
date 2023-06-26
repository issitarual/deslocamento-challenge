import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import { fetchGetWeather } from "@/helpers/api/Weather";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import React from "react";
import Main from "../components/Main";
import { useGlobalContext } from "../hooks/useGlobalContext";
import {
  ASK_FOR_DISPLACEMENT,
  DRAWER_WIDTH,
  EMPTY_DISPLACEMENT,
  EMPTY_DRIVER,
  EMPTY_RIDER,
  EMPTY_WEATHER,
  END_DISPLACEMENT,
  FIND_DISPLACEMENT,
  FIND_RIDER,
  USER_TYPE,
  DISPLACEMENT_AVAILABLE,
  DRIVER_AVAILABLE,
  HOME_ERROR_MESSAGE,
  ROUTE,
} from "@/helpers/contants";
import MainHeader from "../components/MainHeader";
import DrawerMenu from "../components/DrawerMenu";
import {
  fetchGetAllDisplacements,
  fetchPostDisplacement,
  fetchUpdateDisplacement,
} from "@/helpers/api/Displacement";
import { fetchGetRider } from "@/helpers/api/Rider";
import { useRouter } from "next/navigation";
import DisplacementsForDriver from "../components/DisplacementsForDriver";
import ThreeDotsLoading from "../components/ThreeDotsLoading";
import DisplacementForRider from "../components/DisplacementForRider";
import WeatherBox from "../components/WeatherBox";
import { fetchGetAllVehicles } from "@/helpers/api/Vehicle";

export default function Home() {
  const router = useRouter();
  const { openDrawer, userType, userId, loading, vehicleId, setLoading } =
    useGlobalContext();
  const isUserTypeDriver = userType === USER_TYPE.DRIVER;

  const [weather, setWeather] = useState(EMPTY_WEATHER);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  const [drivers, setDrivers] = useState([EMPTY_DRIVER]);
  const [currentDriver, setCurrentDriver] = useState(EMPTY_DRIVER);
  const [displacement, setDisplacement] = useState([EMPTY_DISPLACEMENT]);
  const [currentDisplacement, setCurrentDisplacement] =
    useState(EMPTY_DISPLACEMENT);
  const [rider, setRider] = useState(EMPTY_RIDER);
  const [windowWidth, setWindowWidth] = useState(0);

  const [checkList, setCheckList] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [kmFinal, setKmFinal] = useState("");

  function getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }

  async function handleClick() {
    setLoading(true);
    const displacementTime = Date.now().toString();
    if (isUserTypeDriver) {
      const finishDisplacement = {
        id: currentDisplacement.id,
        kmFinal: parseInt(kmFinal),
        fimDeslocamento: displacementTime,
        observacao,
      };
      setKmFinal("");
      setObservacao("");
      fetchUpdateDisplacement(finishDisplacement);
      fetchDisplacement();
      fetchRider(currentDisplacement.idCliente.toString());
    } else {
      const idCondutor = parseInt(currentDriver?.id);
      const vehicles = await fetchGetAllVehicles();
      const displacement = {
        kmInicial: 0,
        inicioDeslocamento: displacementTime,
        checkList,
        motivo,
        observacao,
        idCondutor,
        idVeiculo: parseInt(vehicles[0].id),
        idCliente: parseInt(userId),
      };
      setObservacao("");
      setMotivo("");
      setCheckList("");
      fetchPostDisplacement(displacement);
      fetchDriver();
    }
  }

  async function fetchWeather() {
    setIsWeatherLoading(true);
    const weatherResponse = await fetchGetWeather();
    if (weatherResponse) {
      setWeather(weatherResponse);
    }
    setIsWeatherLoading(false);
  }

  async function fetchDriver() {
    setLoading(true);
    const driversResponse = await fetchGetAllDrivers();
    if (driversResponse) {
      setDrivers(driversResponse);
      setCurrentDriver(driversResponse[0]);
    }
    setLoading(false);
  }

  async function fetchRider(id: string) {
    const currentRider = (await fetchGetRider(id)) || EMPTY_RIDER;
    setRider(currentRider);
    setLoading(false);
  }

  async function fetchDisplacement() {
    setLoading(true);
    const displacementResponse = await fetchGetAllDisplacements();
    if (!displacementResponse) {
      setLoading(false);
      return;
    }
    if (displacementResponse) {
      const filterDisplacement = isUserTypeDriver
        ? displacementResponse.filter(
            (d) => d.idCondutor.toString() == userId && !d.kmFinal
          )
        : displacementResponse.filter(
            (d) => d.idCliente.toString() == userId && !d.kmFinal
          );
      setDisplacement(filterDisplacement);
      setCurrentDisplacement(filterDisplacement[0]);
      setLoading(false);
    }
  }

  const validateUser = () => {
    if (!userId) {
      alert(HOME_ERROR_MESSAGE.USER_NOT_FOUND);
      router.push(ROUTE.SIGN_IN);
    } else if (isUserTypeDriver && !vehicleId) {
      alert(HOME_ERROR_MESSAGE.VEHICLE_NOT_FOUND);
      router.push(ROUTE.VEHICLE);
    }
  };

  useEffect(() => {
    setWindowWidth(window.screen.availWidth);
    validateUser();
    fetchWeather();

    if (isUserTypeDriver) {
      fetchDisplacement();
      fetchRider(currentDisplacement.idCliente.toString());
    } else {
      fetchDriver();
    }
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <CssBaseline />
      <MainHeader />
      <DrawerMenu />
      <Main open={windowWidth < 780 ? false : openDrawer}>
        <Box sx={{ marginTop: "100px", paddingLeft: `${DRAWER_WIDTH}px` }}>
          <WeatherBox loading={isWeatherLoading} weather={weather} />
          <Typography
            sx={{ fontWeight: "bold" }}
            variant="h5"
            component="p"
            textAlign="center"
          >
            {isUserTypeDriver ? DISPLACEMENT_AVAILABLE : DRIVER_AVAILABLE}
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            {isUserTypeDriver
              ? `Você possui ${displacement.length} ${
                  displacement.length > 1
                    ? "viagens a serem feitas"
                    : "viagem a ser feita"
                }`
              : currentDriver.nome}
          </Typography>
          <Box display="flex" flexDirection="column" padding={2}>
            {!loading && isUserTypeDriver && displacement.length && (
              <DisplacementsForDriver
                displacement={currentDisplacement}
                riderName={rider.nome}
                kmFinal={kmFinal}
                setKmFinal={setKmFinal}
                observacaoDriver={observacao}
                setObservacao={setObservacao}
              />
            )}
            {!loading && !isUserTypeDriver && (
              <DisplacementForRider
                checkList={checkList}
                setCheckList={setCheckList}
                motivo={motivo}
                setMotivo={setMotivo}
                observacao={observacao}
                setObservacao={setObservacao}
              />
            )}
            <Button
              variant="text"
              disabled={loading}
              onClick={() =>
                isUserTypeDriver
                  ? setCurrentDisplacement(
                      displacement[getRandom(displacement.length)]
                    )
                  : setCurrentDriver(drivers[getRandom(drivers.length)])
              }
              sx={{ paddingY: 2 }}
            >
              {loading ? (
                <ThreeDotsLoading />
              ) : isUserTypeDriver ? (
                FIND_DISPLACEMENT
              ) : (
                FIND_RIDER
              )}
            </Button>
            <Button
              sx={{ paddingY: 2 }}
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
              {loading ? (
                <ThreeDotsLoading />
              ) : isUserTypeDriver ? (
                END_DISPLACEMENT
              ) : (
                ASK_FOR_DISPLACEMENT
              )}
            </Button>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
