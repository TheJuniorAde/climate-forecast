import { OpenWeatherApiResponse } from "../interfaces"
import { BaseService } from "./BaseService"

export class WeatherService extends BaseService {
  public apiUrl = String(process.env.REACT_APP_OPENWEATHER_API_URL)
  private appid = String(process.env.REACT_APP_OPENWEATHER_API_KEY)

  constructor() {
    super()
  }

  async retrieve(currentLocationCoordinates?: GeolocationPosition["coords"]) {
    return await this.api.get<OpenWeatherApiResponse>(this.apiUrl, {
      params: {
        appid: this.appid,
        lat: currentLocationCoordinates?.latitude,
        lon: currentLocationCoordinates?.longitude,
        units: "metric",
        lang: "pt_br",
      },
    })
  }
}
