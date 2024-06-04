import { red } from "@mui/material/colors"
import { SxProps, Theme } from "@mui/material"
import {
  MapQuestLocation,
  OpenWeatherApiResponse,
  WheaterForecastContextResult,
} from "../../interfaces"

export const defaultWheaterForecastContext: WheaterForecastContextResult = {
  loading: true,
  isLocationAvailable: false,
  loadLocation: (_?: boolean | undefined) => null,
  isWaiting: false,
  isLoading: true,
  mustShowData: false,
}

export const defaultStyle: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
}
export const flexGrowStyle: SxProps<Theme> = { flexGrow: 1 }
export const redColorStyle: SxProps<Theme> = { bgcolor: red[500] }

export const getIconUrl = (currentForecast: OpenWeatherApiResponse) =>
  process.env.REACT_APP_OPENWEATHER_ICON_URL +
  currentForecast.weather[0].icon +
  "@2x.png"

export const mustShow = (
  loading: boolean,
  isLocationAvailable: boolean,
  currentLocationAddress?: MapQuestLocation,
  currentForecast?: OpenWeatherApiResponse,
  currentLocationCoordinates?: GeolocationCoordinates
) => {
  const mustShowData =
    !loading &&
    !!isLocationAvailable &&
    !!currentLocationAddress &&
    !!currentForecast

  return !(
    !mustShowData ||
    !currentForecast ||
    !currentLocationCoordinates ||
    !currentLocationAddress
  )
}
