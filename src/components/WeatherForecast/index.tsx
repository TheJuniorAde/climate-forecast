import React, { useCallback, useState } from "react";
import { Box, Container } from "@mui/material";
import { Heading } from "./heading";
import { Data } from "./data";
import { mustShow } from "./utils";
import { Snack } from "../snack";
import { getActionMessage } from "../../messages";
import { useWeather } from "../../hooks";

export const WeatherForecast: React.FC = () => {
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
  } = useWeather(handleWeatherForecast);

  const isLoading = !!loading && !!availableLocation;
  const isWaiting = !!loading && !availableLocation;

  const mustShowData = useCallback(
    () =>
      mustShow(
        loading,
        availableLocation,
        currentLocationAddress,
        currentForecast,
        currentLocationCoordinates
      ),
    [
      loading,
      availableLocation,
      currentLocationAddress,
      currentForecast,
      currentLocationCoordinates,
    ]
  );

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Heading
          isWaiting={isWaiting}
          isLoading={isLoading}
          loadLocation={loadLocation}
          message={getActionMessage(isLoading, isWaiting, availableLocation)}
        />
        <Data
          currentForecast={currentForecast}
          currentLocationAddress={currentLocationAddress}
          currentLocation={currentLocationCoordinates}
          mustShow={mustShowData()}
        />
        <Snack show={isWaiting} message={snack} />
      </Container>
    </Box>
  );
};
