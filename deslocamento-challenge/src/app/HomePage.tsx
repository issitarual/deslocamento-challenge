import Logo from "@/components/Logo";
import { fetchGetAllDrivers } from "@/helpers/api/Driver";
import SideBar from "@/helpers/api/Sidebar";
import { fetchGetWeather } from "@/helpers/api/Weather";
import { Driver } from "@/types/DriverType";
import { Button } from "@mui/material";
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
      id: "",
      nome: "",
      numeroHabilitacao: "",
      categoriaHabilitacao: "",
      vencimentoHabilitacao: "",
    },
  ]);
  const [currentDriver, setCurrentDriver] = useState("");
  useEffect(() => {
    async function fetchWeather() {
      const weatherResponse = await fetchGetWeather();
      if (weatherResponse) {
        setWeather(weatherResponse);
      }
    }
    fetchWeather();
  }, []);

  useEffect(() => {
    async function fetchDriver() {
      const driversResponse = await fetchGetAllDrivers();
      if (driversResponse) {
        setDrivers(driversResponse);
      }
    }
      fetchDriver();
      setCurrentDriver(drivers[getRandom(drivers.length)].nome)
  }, []);

  console.log(weather);
  return (
    <>
      <Logo />
      <SideBar />
      Clima de hoje: {weather.temperatureC}
      <br />
      Motorista Disponível:
      {currentDriver}
      <br />
      <Button onClick={() => setCurrentDriver(drivers[getRandom(drivers.length)].nome)}>
        Buscar outro motorista
      </Button>
      <br />
      <Button>Iniciar corrida</Button>
    </>
  );

  function getRandom(max: number) {
    return Math.floor(Math.random() * max);
  }
}
