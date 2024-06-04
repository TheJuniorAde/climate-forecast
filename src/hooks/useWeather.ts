import { useState, useEffect } from "react"
import { getAccurateCurrentPosition } from "../geoLocationPolyfill"
import {
  MapQuestLocation,
  OpenWeatherApiResponse,
  UseWheaterForecastResult,
  WeatherForecastCallback,
} from "../interfaces"
import {
  handleLocationAddressError,
  handleLocationError,
  handleWeatherRequestError,
  handleLocationRequestError,
  Messages,
} from "../messages"
import { LocationService, WeatherService } from "../services"

export const useWeather = (
  callback: WeatherForecastCallback
): UseWheaterForecastResult => {
  const [loading, setLoading] = useState(true)
  const [isLocationAvailable, setIsLocationAvailable] = useState(false)
  const [currentLocationCoordinates, setCurrentLocationCoordinates] =
    useState<GeolocationPosition["coords"]>()
  const [currentLocationAddress, setCurrentLocationAddress] =
    useState<MapQuestLocation>()
  const [currentForecast, setCurrentForecast] =
    useState<OpenWeatherApiResponse>()

  const updateCurrentLocation: PositionCallback = (position) => {
    setIsLocationAvailable(!!position)
    setCurrentLocationCoordinates(position.coords)
    loadReverseGeocodePosition(
      position.coords.latitude,
      position.coords.longitude
    )
  }

  const loadReverseGeocodePosition = async (lat: number, lng: number) => {
    try {
      const service = new LocationService()
      const { data } = await service.retrieve(lat, lng)

      if (data.info.statuscode === 0) {
        setCurrentLocationAddress(data.results[0].locations[0])
      } else {
        handleLocationAddressError(callback, data.info.statuscode)
      }
    } catch (error) {
      handleLocationRequestError(callback, error)
    }
  }

  const loadWeatherForecast = async () => {
    try {
      const service = new WeatherService()
      const { data } = await service.retrieve(currentLocationCoordinates)

      setCurrentForecast(data)
      callback(true, data)
    } catch (error) {
      handleWeatherRequestError(callback, error)
    } finally {
      setLoading(false)
    }
  }

  const loadLocation = (mustSetLoading = false) => {
    mustSetLoading && setLoading(true)

    getAccurateCurrentPosition(
      updateCurrentLocation,
      function error(error) {
        setLoading(false)
        handleLocationError(callback, error)
      },
      function progress(position) {
        if (position.coords.accuracy > 20) {
          callback(false, Messages.CALLIBRATING_LOCATION)
        }
      }
    )
  }

  const canLoad = () =>
    !!currentLocationCoordinates &&
    !!currentLocationCoordinates.latitude &&
    !!currentLocationCoordinates.longitude &&
    isLocationAvailable

  useEffect(() => {
    loadLocation()
  }, [])

  useEffect(() => {
    if (canLoad()) {
      loadWeatherForecast()
    }
  }, [currentLocationCoordinates, isLocationAvailable])

  return {
    loading,
    isLocationAvailable,
    currentLocationCoordinates,
    currentForecast,
    currentLocationAddress,
    loadLocation,
  }
}
