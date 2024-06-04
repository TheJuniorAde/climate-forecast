export enum Messages {
  RELOAD_CLIMATE_DATE = "Recarregar os dados climáticos",
  LOADING = "Carregando...",
  LOADING_GEOLOCATION_DATA = "Carregando os dados de geolocalização...",
  WAITING_GEOLOCATION = "Aguardando geolocalização...",
  CALLIBRATING_LOCATION = "Calibrando geolocalização...",
  GEOLOCATION_NOT_ALLOWED = "Geolocalização não habilitada!",
  GEOLOCATION_NOT_AVAILABLE = "Geolocalização não disponível!",
  GEOLOCATION_TIMEDOUT = "Geolocalização demorou para carregar!",
  GEOLOCATION_INVALID_DATA = "Dados inválidos enviados para busca de endereço!",
  GEOLOCATION_INVALID_KEY = "Chave de API do MapQuest inválida!",
  GEOLOCATION_UNEXPECTED = "Ocorreu um erro inesperado!",
}

export * from "./utils"
