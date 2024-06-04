import React, { useContext } from "react"
import { Container, Grid } from "@mui/material"
import { WeatherForecastContext } from "."
import { ApproximatedLocation, Rain, Temperature, Wind } from "./Cards"

export const Data: React.FC = () => {
  const { mustShowData, currentForecast } = useContext(WeatherForecastContext)

  if (!mustShowData) {
    return null
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={6}>
          <ApproximatedLocation />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Temperature />
        </Grid>
        {currentForecast?.rain && (
          <Grid item xs={12} sm={6} md={6}>
            <Rain />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={6}>
          <Wind />
        </Grid>
      </Grid>
    </Container>
  )
}
