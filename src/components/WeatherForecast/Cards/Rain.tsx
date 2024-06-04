import React, { useContext } from "react"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { defaultStyle, flexGrowStyle } from "../utils"
import { WeatherForecastContext } from ".."

export const Rain: React.FC = () => {
  const { currentForecast } = useContext(WeatherForecastContext)

  if (!currentForecast?.rain) return null

  return (
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
  )
}
