import axios from "axios";
import { useState, useEffect } from "react";
import { getAccurateCurrentPosition } from "../../geoLocationPolyfill";
import {
  MapQuestLocation,
  MapQuestResponse,
  OpenWeatherApiResponse,
  WeatherForecastProps,
} from "../../interfaces";
import { Messages } from "../../messages";

export const useWeather = ({
  callback,
  apiUrl,
  appKey,
  locationApiUrl,
  locationAppKey,
}: WeatherForecastProps) => {
  const [loading, setLoading] = useState(true);
  const [availableLocation, setAvailableLocation] = useState(false);
  const [currentLocationCoordinates, setCurrentLocationCoordinates] =
    useState<GeolocationPosition["coords"]>();
  const [currentLocationAddress, setCurrentLocationAddress] =
    useState<MapQuestLocation>();
  const [currentForecast, setCurrentForecast] =
    useState<OpenWeatherApiResponse>();

  const updateCurrentLocation: PositionCallback = (position) => {
    setAvailableLocation(!!position);
    setCurrentLocationCoordinates(position.coords);
    loadReverseGeocodePosition(
      position.coords.latitude,
      position.coords.longitude
    );
  };

  const handleLocationAddressError = (locationStatusCode: number) => {
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

  const handleLocationError = (error: GeolocationPositionError) => {
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

  const loadReverseGeocodePosition = async (lat: number, lng: number) => {
    try {
      const { data } = await axios.get<MapQuestResponse>(locationApiUrl, {
        params: {
          key: locationAppKey,
          location: `${lat},${lng}`,
        },
      });

      if (data.info.statuscode === 0) {
        setCurrentLocationAddress(data.results[0].locations[0]);
      } else {
        handleLocationAddressError(data.info.statuscode);
      }
    } catch (error) {
      callback(
        false,
        `Erro ao carregar os seus dados de localização: ${String(error)}`
      );
    }
  };

  const loadLocation = (mustSetLoading = false) => {
    mustSetLoading && setLoading(true);

    getAccurateCurrentPosition(
      updateCurrentLocation,
      function error(error) {
        setLoading(false);
        handleLocationError(error);
      },
      function progress(position) {
        if (position.coords.accuracy > 20) {
          callback(false, Messages.CALLIBRATING_LOCATION);
        }
      }
    );
  };

  const loadWeatherForecast = async () => {
    try {
      const { data } = await axios.get<OpenWeatherApiResponse>(apiUrl, {
        params: {
          appid: appKey,
          lat: currentLocationCoordinates?.latitude,
          lon: currentLocationCoordinates?.longitude,
          units: "metric",
          lang: "pt_br",
        },
      });
      setCurrentForecast(data);
      callback(true, data);
    } catch (error) {
      callback(
        false,
        `Erro ao carregar os dados climáticos da sua região: ${String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  const canLoad = () =>
    !!currentLocationCoordinates &&
    !!currentLocationCoordinates.latitude &&
    !!currentLocationCoordinates.longitude &&
    availableLocation;

  useEffect(() => {
    loadLocation();
  }, []);

  useEffect(() => {
    if (canLoad()) {
      loadWeatherForecast();
    }
  }, [currentLocationCoordinates, availableLocation]);

  return {
    loading,
    availableLocation,
    currentLocationCoordinates,
    currentForecast,
    currentLocationAddress,
    loadLocation,
  };
};
