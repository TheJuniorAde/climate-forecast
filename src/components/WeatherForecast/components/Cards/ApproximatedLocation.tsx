import React, { useContext } from "react"
import { Card, CardContent, CardHeader, Typography } from "@mui/material"
import { defaultStyle, flexGrowStyle } from "../../utils"
import { WeatherForecastContext } from "../.."

export const ApproximatedLocation: React.FC = () => {
  const { currentLocationCoordinates, currentLocationAddress } = useContext(
    WeatherForecastContext
  )

  return (
    <Card sx={defaultStyle}>
      <CardHeader
        title={`Localização (aproximada)`}
        subheader={`precisão: ${Number(
          currentLocationCoordinates?.accuracy
        ).toLocaleString("pt-br")}m`}
      />
      <CardContent sx={flexGrowStyle}>
        <Typography>
          {`${currentLocationAddress?.street}, ${currentLocationAddress?.adminArea3} - ${currentLocationAddress?.adminArea1}`}
        </Typography>
      </CardContent>
    </Card>
  )
}
