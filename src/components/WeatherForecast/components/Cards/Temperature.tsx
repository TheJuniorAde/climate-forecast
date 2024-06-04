import React, { useContext } from "react"
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material"
import {
  defaultStyle,
  flexGrowStyle,
  getIconUrl,
  redColorStyle,
} from "../../utils"
import { WeatherForecastContext } from "../.."

export const Temperature: React.FC = () => {
  const { currentForecast } = useContext(WeatherForecastContext)

  return (
    <Card sx={defaultStyle}>
      <CardHeader
        avatar={
          <Avatar sx={redColorStyle} aria-label="recipe">
            <img src={getIconUrl(currentForecast!)} alt="Ícone do clima" />
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
  )
}
