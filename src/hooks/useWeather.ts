import { useState, useEffect } from "react";
import { getAccurateCurrentPosition } from "../geoLocationPolyfill";
import {
  MapQuestLocation,
  OpenWeatherApiResponse,
  WeatherForecastCallback,
} from "../interfaces";
import {
  handleLocationAddressError,
  handleLocationError,
  handleWeatherRequestError,
  handleLocationRequestError,
  Messages,
} from "../messages";
import { LocationApi, WeatherApi } from "../services";

export const useWeather = (callback: WeatherForecastCallback) => {
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

  const loadReverseGeocodePosition = async (lat: number, lng: number) => {
    try {
      const { retrieve } = LocationApi();
      const { data } = await retrieve(lat, lng);

      if (data.info.statuscode === 0) {
        setCurrentLocationAddress(data.results[0].locations[0]);
      } else {
        handleLocationAddressError(callback, data.info.statuscode);
      }
    } catch (error) {
      handleLocationRequestError(callback, error);
    }
  };

  const loadWeatherForecast = async () => {
    try {
      const { retrieve } = WeatherApi();
      const { data } = await retrieve(currentLocationCoordinates);

      setCurrentForecast(data);
      callback(true, data);
    } catch (error) {
      handleWeatherRequestError(callback, error);
    } finally {
      setLoading(false);
    }
  };

  const loadLocation = (mustSetLoading = false) => {
    mustSetLoading && setLoading(true);

    getAccurateCurrentPosition(
      updateCurrentLocation,
      function error(error) {
        setLoading(false);
        handleLocationError(callback, error);
      },
      function progress(position) {
        if (position.coords.accuracy > 20) {
          callback(false, Messages.CALLIBRATING_LOCATION);
        }
      }
    );
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