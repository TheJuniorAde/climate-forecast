import { red } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/material";
import { MapQuestLocation, OpenWeatherApiResponse } from "../../interfaces";

export const defaultStyle: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
export const flexGrowStyle: SxProps<Theme> = { flexGrow: 1 };
export const redColorStyle: SxProps<Theme> = { bgcolor: red[500] };

export const getIconUrl = (currentForecast: OpenWeatherApiResponse) =>
  process.env.REACT_APP_OPENWEATHER_ICON_URL +
  currentForecast.weather[0].icon +
  "@2x.png";

export const mustShow = (
  loading: boolean,
  availableLocation: boolean,
  currentLocationAddress?: MapQuestLocation,
  currentForecast?: OpenWeatherApiResponse,
  currentLocationCoordinates?: GeolocationCoordinates
) => {
  const mustShowData =
    !loading &&
    !!availableLocation &&
    !!currentLocationAddress &&
    !!currentForecast;

  return !(
    !mustShowData ||
    !currentForecast ||
    !currentLocationCoordinates ||
    !currentLocationAddress
  );
};
