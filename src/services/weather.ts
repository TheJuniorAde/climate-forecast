import { OpenWeatherApiResponse } from "../interfaces";
import { createInstance } from "./api";

export const WeatherApi = () => {
  const apiUrl = String(process.env.REACT_APP_OPENWEATHER_API_URL);
  const appid = String(process.env.REACT_APP_OPENWEATHER_API_KEY);
  const api = createInstance(apiUrl);

  return {
    retrieve: async (
      currentLocationCoordinates?: GeolocationPosition["coords"]
    ) =>
      await api.get<OpenWeatherApiResponse>(apiUrl, {
        params: {
          appid,
          lat: currentLocationCoordinates?.latitude,
          lon: currentLocationCoordinates?.longitude,
          units: "metric",
          lang: "pt_br",
        },
      }),
  };
};
