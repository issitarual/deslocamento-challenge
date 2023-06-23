import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Box, Typography } from "@mui/material";
import ThreeDotsLoading from "./ThreeDotsLoading";
import { Weather } from "@/types/WeatherType";

export default function WeatherBox({
  loading,
  weather,
}: {
  loading: boolean;
  weather: Weather;
}) {
  return (
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
      {loading ? (
        <ThreeDotsLoading />
      ) : (
        <>
          <ThermostatIcon color="primary" />
          <Typography
            color="primary"
            variant="h5"
            component="p"
            textAlign="center"
          >
            Clima de hoje: {weather.temperatureC} ºC
          </Typography>
        </>
      )}
    </Box>
  );
}
