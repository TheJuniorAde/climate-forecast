import React, { useContext } from "react"
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { defaultStyle, flexGrowStyle, redColorStyle } from "../utils"
import { WeatherForecastContext } from ".."

export const Wind: React.FC = () => {
  const { currentForecast } = useContext(WeatherForecastContext)

  return (
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
  )
}
