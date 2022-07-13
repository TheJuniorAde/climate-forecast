import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WeatherForecastDataProps } from "../../interfaces";
import {
  getIconUrl,
  defaultStyle,
  flexGrowStyle,
  redColorStyle,
} from "./utils";

export const Data: React.FC<WeatherForecastDataProps> = ({
  mustShow,
  currentForecast,
  currentLocation,
  currentLocationAddress,
}) => {
  if (!mustShow) {
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
                currentLocation?.accuracy
              ).toLocaleString("pt-br")}m`}
            />
            <CardContent sx={flexGrowStyle}>
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
                <Avatar sx={redColorStyle} aria-label="recipe">
                  <img
                    src={getIconUrl(currentForecast!)}
                    alt="Ícone do clima"
                  />
                </Avatar>
              }
              title={`Temperatura em ${currentForecast?.name}`}
              subheader={`${String(
                currentForecast?.weather[0].description
              ).toUpperCase()},
        nuvens: ${currentForecast?.clouds.all}%`}
            />
            <CardContent sx={flexGrowStyle}>
              <Typography>
                Atual: {currentForecast?.main.temp}&deg; C<br />
                Sensação térmica: {currentForecast?.main.feels_like}&deg; C
                <br />
                Mínima: {currentForecast?.main.temp_min}&deg; C<br />
                Máxima: {currentForecast?.main.temp_max}&deg; C<br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {currentForecast?.rain && (
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={defaultStyle}>
              <CardHeader title={`Chuva`} subheader={`Dados gerais da chuva`} />
              <CardContent sx={flexGrowStyle}>
                <Typography>
                  Precipitação (1h): {currentForecast?.rain["1h"]}mm
                  <br />
                  Precipitação (3h): {currentForecast?.rain["3h"]}mm
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
                  sx={redColorStyle}
                  style={{
                    transform: `rotate(${currentForecast?.wind.deg}deg)`,
                  }}
                  aria-label="recipe"
                >
                  <ArrowBackIcon />
                </Avatar>
              }
              title={`Ventos`}
              subheader={`Dados gerais dos ventos`}
            />
            <CardContent sx={flexGrowStyle}>
              <Typography>
                Direção: {currentForecast?.wind.deg}&deg;
                <br />
                Velocidade: {currentForecast?.wind.speed}m/s
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
