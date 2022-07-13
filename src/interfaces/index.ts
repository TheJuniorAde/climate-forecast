export type WeatherForecastCallback = (
  sucess: boolean,
  data: string | any
) => void;

export interface WeatherForecastDataProps {
  currentLocation: GeolocationPosition["coords"] | undefined;
  currentLocationAddress?: MapQuestLocation;
  currentForecast: OpenWeatherApiResponse | undefined;
  mustShow: boolean;
}

interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface MapQuestLocation {
  street: string;
  adminArea6: string;
  adminArea6Type: string;
  adminArea5: string;
  adminArea5Type: string;
  adminArea4: string;
  adminArea4Type: string;
  adminArea3: string;
  adminArea3Type: string;
  adminArea1: string;
  adminArea1Type: string;
  postalCode: string;
  geocodeQualityCode: string;
  geocodeQuality: string;
  dragPoint: boolean;
  sideOfStreet: string;
  linkId: string;
  unknownInput: string;
  type: string;
  latLng: LocationCoordinates;
  displayLatLng: LocationCoordinates;
  mapUrl: string;
}

type MapQuestLocationSet = MapQuestLocation[];

export interface MapQuestResult {
  providedLocation: {
    latLng: LocationCoordinates;
  };
  locations: MapQuestLocationSet;
}

type MapQuestResultSet = MapQuestResult[];

export interface MapQuestResponse {
  info: {
    statuscode: number;
    copyright: { text: string; imageUrl: string; imageAltText: string };
    messages: [];
  };
  options: {
    maxResults: number;
    thumbMaps: boolean;
    ignoreLatLngInput: boolean;
  };
  results: MapQuestResultSet;
}

export interface WeatherForecastHeadingProps {
  isWaiting: boolean;
  isLoading: boolean;
  loadLocation: () => void;
  message: string;
}

export interface OpenWeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}

type OpenWeatherDataSet = OpenWeatherData[];

export interface OpenWeatherApiResponse {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: OpenWeatherDataSet;
  wind: {
    deg: number;
    gust: number;
    speed: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
}
