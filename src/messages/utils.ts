import { Messages } from ".";
import { WeatherForecastCallback } from "../interfaces";

export const getActionMessage = (
  isLoading: boolean,
  isWaiting: boolean,
  availableLocation: boolean
) => {
  let message = Messages.RELOAD_CLIMATE_DATE;

  if (isLoading) {
    message = Messages.LOADING;
  }

  if (isWaiting) {
    message = Messages.LOADING_GEOLOCATION_DATA;
  }

  if (!availableLocation) {
    message = Messages.WAITING_GEOLOCATION;
  }

  return message;
};

export const handleLocationAddressError = (
  callback: WeatherForecastCallback,
  locationStatusCode: number
) => {
  let message = "";

  switch (locationStatusCode) {
    case 400:
      message = Messages.GEOLOCATION_INVALID_DATA;
      break;
    case 403:
      message = Messages.GEOLOCATION_INVALID_KEY;
      break;
    case 500:
    default:
      message = Messages.GEOLOCATION_UNEXPECTED;
      break;
  }

  callback(false, message);
};

export const handleLocationError = (
  callback: WeatherForecastCallback,
  error: GeolocationPositionError
) => {
  let message = "";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = Messages.GEOLOCATION_NOT_ALLOWED;
      break;
    case error.POSITION_UNAVAILABLE:
      message = Messages.GEOLOCATION_NOT_AVAILABLE;
      break;
    case error.TIMEOUT:
    default:
      message = Messages.GEOLOCATION_TIMEDOUT;
      break;
  }

  callback(false, message);
};

const handleGeneralError = (
  callback: WeatherForecastCallback,
  message: string
) => callback(false, message);

export const handleWeatherRequestError = (
  callback: WeatherForecastCallback,
  error: unknown
) =>
  handleGeneralError(
    callback,
    `Erro ao carregar os dados climáticos da sua região: ${String(error)}`
  );

export const handleLocationRequestError = (
  callback: WeatherForecastCallback,
  error: unknown
) =>
  handleGeneralError(
    callback,
    `Erro ao carregar os seus dados de localização: ${String(error)}`
  );
