import { MapQuestResponse } from "../interfaces"
import { BaseService } from "./BaseService"

export class LocationService extends BaseService {
  public apiUrl = String(process.env.REACT_APP_MAPQUEST_URL)
  private apiKey = String(process.env.REACT_APP_MAPQUEST_KEY)

  constructor() {
    super()
  }

  async retrieve(lat: number, lng: number) {
    return await this.api.get<MapQuestResponse>(this.apiUrl, {
      params: {
        key: this.apiKey,
        location: `${lat},${lng}`,
      },
    })
  }
}
