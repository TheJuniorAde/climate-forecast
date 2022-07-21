import axios, { AxiosInstance } from "axios";

const createInstance = (baseURL: string) => axios.create({ baseURL });

export class BaseService {
  public apiUrl: string = "";
  public api: AxiosInstance;

  constructor() {
    this.api = createInstance(this.apiUrl);
  }
}
