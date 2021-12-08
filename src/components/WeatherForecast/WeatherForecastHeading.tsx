import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import { WeatherForecastHeadingProps } from "../../interfaces";

export const WeatherForecastHeading = ({
  isWaiting,
  isLoading,
  loadLocation,
  message,
}: WeatherForecastHeadingProps) => (
  <React.Fragment>
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      Meu clima
    </Typography>
    {isWaiting && (
      <Typography
        component="h1"
        variant="h6"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Após conceder a permissão de localização, recarregue a página
      </Typography>
    )}
    <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
      <Button
        variant="contained"
        disabled={isLoading || isWaiting}
        onClick={loadLocation}
      >
        {message}
      </Button>
    </Stack>
  </React.Fragment>
);
