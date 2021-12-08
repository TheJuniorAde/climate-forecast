import React, { useState } from "react";
import { Box, Snackbar, Container } from "@mui/material";
import { useWeather } from "./useWeather";
import { WeatherForecastData } from "./WeatherForecastData";
import { WeatherForecastHeading } from "./WeatherForecastHeading";
import { Messages } from "../../messages";

export const WeatherForecast = () => {
  const [snack, setSnack] = useState("");

  const handleWeatherForecast = (success: boolean, data: string | any) => {
    if (!success) {
      setSnack(
        typeof data === "string"
          ? data
          : `Ocorreu um erro inesperado: ${String(data)}`
      );
      return;
    }

    setSnack("");
  };

  const {
    loading,
    availableLocation,
    currentForecast,
    currentLocationCoordinates,
    currentLocationAddress,
    loadLocation,
  } = useWeather({
    callback: handleWeatherForecast,
    apiUrl: String(process.env.REACT_APP_OPENWEATHER_API_URL),
    appKey: String(process.env.REACT_APP_OPENWEATHER_API_KEY),
    locationAppKey: String(process.env.REACT_APP_MAPQUEST_KEY),
    locationApiUrl: String(process.env.REACT_APP_MAPQUEST_URL),
  });

  const isLoading = !!loading && !!availableLocation;

  const isWaiting = !!loading && !availableLocation;
  const mustShow =
    !loading &&
    !!availableLocation &&
    !!currentLocationAddress &&
    !!currentForecast;

  const getActionMessage = () => {
    let message = Messages.RELOAD_CLIMATE_DATE;

    if (isLoading) {
      message = Messages.LOADING;
    }

    if (isWaiting) {
      message = Messages.LOADING_GEOLOCATION_DATA;
    }

    if (!availableLocation) {
      message = Messages.WAITING_GEOLOCATION;
    }

    return message;
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <WeatherForecastHeading
          isWaiting={isWaiting}
          isLoading={isLoading}
          loadLocation={loadLocation}
          message={getActionMessage()}
        />
        <WeatherForecastData
          currentForecast={currentForecast}
          currentLocationAddress={currentLocationAddress}
          currentLocation={currentLocationCoordinates}
          mustShow={mustShow}
        />
        <Snackbar
          open={!!snack || !!isWaiting}
          message={snack || Messages.WAITING_GEOLOCATION}
        />
      </Container>
    </Box>
  );
};
