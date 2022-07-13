import { MapQuestResponse } from "../interfaces";
import { createInstance } from "./api";

export const LocationApi = () => {
  const apiUrl = String(process.env.REACT_APP_MAPQUEST_URL);
  const apiKey = String(process.env.REACT_APP_MAPQUEST_KEY);
  const api = createInstance(apiUrl);

  return {
    retrieve: async (lat: number, lng: number) =>
      await api.get<MapQuestResponse>(apiUrl, {
        params: {
          key: apiKey,
          location: `${lat},${lng}`,
        },
      }),
  };
};
