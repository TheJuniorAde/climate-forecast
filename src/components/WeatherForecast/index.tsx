import React, { createContext, useMemo, useState } from "react"
import { Box, Container } from "@mui/material"
import { Data, Heading } from "./components"
import { defaultWheaterForecastContext, mustShow } from "./utils"
import { SnackMessage } from "../SnackMessage"
import { useWeather } from "../../hooks"
import { WheaterForecastContextResult } from "../../interfaces"

export const WeatherForecastContext =
  createContext<WheaterForecastContextResult>(defaultWheaterForecastContext)

export const WeatherForecast: React.FC = () => {
  const [snack, setSnack] = useState("")

  const handleWeatherForecast = (success: boolean, data: string | any) => {
    if (!success) {
      setSnack(
        typeof data === "string"
          ? data
          : `Ocorreu um erro inesperado: ${String(data)}`
      )
      return
    }

    setSnack("")
  }

  const {
    loading,
    isLocationAvailable,
    currentForecast,
    currentLocationCoordinates,
    currentLocationAddress,
    loadLocation,
  } = useWeather(handleWeatherForecast)

  const isLoading = !!loading && !!isLocationAvailable
  const isWaiting = !!loading && !isLocationAvailable

  const mustShowData = useMemo(
    () =>
      mustShow(
        loading,
        isLocationAvailable,
        currentLocationAddress,
        currentForecast,
        currentLocationCoordinates
      ),
    [
      loading,
      isLocationAvailable,
      currentLocationAddress,
      currentForecast,
      currentLocationCoordinates,
    ]
  )

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <WeatherForecastContext.Provider
          value={{
            loading,
            isLocationAvailable,
            currentForecast,
            currentLocationCoordinates,
            currentLocationAddress,
            loadLocation,
            isLoading,
            isWaiting,
            mustShowData,
          }}
        >
          <Heading />
          <Data />
        </WeatherForecastContext.Provider>
        <SnackMessage show={isWaiting} message={snack} />
      </Container>
    </Box>
  )
}
