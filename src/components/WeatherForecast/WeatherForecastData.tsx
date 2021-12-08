import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  CardHeader,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WeatherForecastDataProps } from "../../interfaces";
import { red } from "@mui/material/colors";

const defaultStyle: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const WeatherForecastData = ({
  mustShow,
  currentForecast,
  currentLocation,
  currentLocationAddress,
}: WeatherForecastDataProps) => {
  if (
    !mustShow ||
    !currentForecast ||
    !currentLocation ||
    !currentLocationAddress
  ) {
    return null;
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={defaultStyle}>
            <CardHeader
              title={`Localização (aproximada)`}
              subheader={`precisão: ${Number(
                currentLocation.accuracy
              ).toLocaleString("pt-br")}m`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                {`${currentLocationAddress?.street}, ${currentLocationAddress?.adminArea3} - ${currentLocationAddress?.adminArea1}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={defaultStyle}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <img
                    src={
                      process.env.REACT_APP_OPENWEATHER_ICON_URL +
                      currentForecast.weather[0].icon +
                      "@2x.png"
                    }
                  />
                </Avatar>
              }
              title={`Temperatura em ${currentForecast.name}`}
              subheader={`${String(
                currentForecast.weather[0].description
              ).toUpperCase()},
        nuvens: ${currentForecast.clouds.all}%`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                Atual: {currentForecast.main.temp}&deg; C<br />
                Sensação térmica: {currentForecast.main.feels_like}&deg; C<br />
                Mínima: {currentForecast.main.temp_min}&deg; C<br />
                Máxima: {currentForecast.main.temp_max}&deg; C<br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {currentForecast.rain && (
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={defaultStyle}>
              <CardHeader title={`Chuva`} subheader={`Dados gerais da chuva`} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography>
                  Precipitação (1h): {currentForecast.rain["1h"]}mm
                  <br />
                  Precipitação (3h): {currentForecast.rain["3h"]}mm
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={defaultStyle}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  style={{
                    transform: `rotate(${currentForecast.wind.deg}deg)`,
                  }}
                  aria-label="recipe"
                >
                  <ArrowBackIcon />
                </Avatar>
              }
              title={`Ventos`}
              subheader={`Dados gerais dos ventos`}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography>
                Direção: {currentForecast.wind.deg}&deg;
                <br />
                Velocidade: {currentForecast.wind.speed}m/s
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
