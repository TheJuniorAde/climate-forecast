# Climate Forecast

Essa pequena aplicação tem como propósito mostrar a localização atual (aproximada) do usuário e, em seguida, os dados gerais climáticos baseados na geolocalização encontrada.

##### Preview da aplicação
![Snapshot da aplicação rodando](https://raw.githubusercontent.com/TheJuniorAde/climate-forecast/master/snapshot.PNG)

## Conteúdo
- [Instalação](#instalação)
- [Documentação](#documentação)

# Instalação

Para instalar e executar o projeto, existem alguns passos:

 - [Configurar o `.env`](#configurar-o-env)
 - [Instalar os pacotes](#instalar-os-pacotes)
 - [Executar a aplicação](#executar-a-aplicação)

## Configurar o `.env`

Existe um arquivo chamado `.env.example`. Você pode se basear nas informações já presentes nele. Para isso, renomeie o arquivo para `.env`. As principais chaves a serem alteradas são:

- **REACT_APP_OPENWEATHER_API_KEY**: a chave de API do OpenWeatherApi. Pode ser obtida em [Open Weather Api - Api Keys](https://home.openweathermap.org/api_keys) 
- **REACT_APP_MAPQUEST_KEY**: a chave de API do MapQuest. É utilizada para obter o `reverse geocode`, necessário para recuperar o endereço baseado nas coordenadas de geolocalização fornecidas pelo navegador.

As outras chaves podem permanecer as mesmas, visto que são as URLs oficiais das APIs utilizadas

## Instalar os pacotes

Para instalar os pacotes, deve-se utilizar um dos comandos abaixo:

- **yarn install**
- **npm instal**

## Executar a aplicação

Para executar a aplicação, deve-se utilizar um dos comandos abaixo:

- **yarn start**
- **npm run start**

Após isso, uma aba será aberta no navegador (a URL padrão é [http://localhost:3000](http://localhost:3000))

# Documentação

Essa documentação será dividida em duas partes:

- [Conceito](#conceito)
- [API](#api)

## Conceito

A aplicação possui dois propósitos base: **Buscar a geolocalização do usuário** e **exibir os dados climáticos baseados nos dados de geolocalização do usuário** (além de permitir que o usuário `recarregue` os dados atuais)

### Busca de geolocalização
Utilizando a API de geolocation do motor do navegador (`navigator.geolocation`), buscamos a posição geográfica atual do usuário. Para isso, o sistema utiliza um polyfill que *calibra* os dados recebidos. Mais em [Calibração de GPS](#calibração-de-gps). Nesse ponto entra também a integração com o [**MapQuest**](https://developer.mapquest.com/) (mais sobre isso em [Integração com MapQuest](#integração-com-mapquest)).

> **Nota**: A aplicação precisa, **obrigatoriamente**, da permissão de utilização da Localização do usuário para funcionar!

### Exibição de dados climáticos
Utilizando os dados de geolocalização disponibilizados pelo navegador (e previamente calibrados), é feita uma requisição para buscar os dados gerais de clima da região no [**OpenWeatherAPI**](https://openweathermap.org/) (mais sobre isso em [Integração com OpenWeatherAPI](#integração-com-openweatherapi)).

### Recarga de dados exibidos
A aplicação exibe os dados atuais de:
- Localização (endereço)
- Dados climáticos de temperatura
- Dados climáticos dos ventos
- Dados climáticos das chuvas (quando presente)

Fica disponível para o usuário uma ação para recarregar os dados atuais já exibidos na tela. Assim que a ação é ativada, o botão de recarga é desativado, com uma mensagem indicando o passo atual (ver mais em [API - Mensagens](#mensagens))


## API

A API será dividida em alguns tópicos:

- [Integração com MapQuest](#integração-com-mapquest)
- [Integração com OpenWeatherAPI](#integração-com-openweatherapi)
- [Custom hook `useWeahter`](#custom-hook-useweather)
- [Calibração de GPS](#calibração-de-gps)
- [Mensagens](#mensagens)

### Integração com MapQuest

A integração com o MapQuest utiliza o serviço de `reverse geocoding` gratuito da plataforma.
Essa integração tem como propósito fornecer os dados de endereço do usuário atual, baseados na **latitude** e **longitude** fornecidas pela API de Geolocation (`navigator.geolocation`)
Os dados retornados pela API de `reverse geocoding` estão no seguinte formato:
|Campo|Tipo|Descrição
|--|--|--|
|info|object|Contém informações sobre a requisição, como códigos de situação e mensagens de erro
|info.statuscode|number|Contém o código de situação da requisição (mais em [MapQuest - Status Codes](https://developer.mapquest.com/documentation/geocoding-api/status-codes/))
|info.copyright|object|Dados de direitos autorais do MapQuest
|info.copyright.text|string|Nome da empresa
|info.copyright.imageUrl|string|Url do logo da empresa
|info.copyright.imageAltText|string|`alt` da imagem
|info.messages|string[]|Uma array de mensagens de erros (caso existam)
|options|object|Algumas opções de configuração dos resultados buscados na API
|options.maxResults|number|Número máximo de resultados que podem ser retornados na requisição
|options.thumbMaps|boolean|Deve trazer a miniatura do mapa?
|options.ignoreLatLngInput|boolean|Deve ignorar as informações de latitude/longitude informadas?
|results|object[]|Os resultados da consulta
|results[n].providedLocation|object|Objeto contendo as infos de latitude/longitude do resultado atual
|results[n].providedLocation.latLgn|object|Objeto contendo a latitude e longitude do resultado atual
|results[n].providedLocation.latLgn.lat|number|Latitude do resultado
|results[n].providedLocation.latLgn.lng|number|Longitude do resultado
|results[n].locations|object[]|Resultados de localização, baseados no geocode enviado para a integração
|results[n].locations[n].street|string|Nome da rua
|results[n].locations[n].adminArea6|string|Nome do bairro
|results[n].locations[n].adminArea6Type|string|Descrição do tipo de informação
|results[n].locations[n].adminArea5|string|Nome da cidade
|results[n].locations[n].adminArea5Type|string|Descrição do tipo de informação
|results[n].locations[n].adminArea4|string|Nome do condado
|results[n].locations[n].adminArea4Type|string|Descrição do tipo de informação
|results[n].locations[n].adminArea3|string|Nome do estado
|results[n].locations[n].adminArea3Type|string|Descrição do tipo de informação
|results[n].locations[n].adminArea1|string|Nome do País
|results[n].locations[n].adminArea1Type|string|Descrição do tipo de informação
|results[n].locations[n].postalCode|string|Código postal do ponto aproximado
|results[n].locations[n].geocodeQualityCode|string|Código de qualidade do `geocode` (mais em [MapQuest - Quality Codes](https://developer.mapquest.com/documentation/geocoding-api/quality-codes/))
|results[n].locations[n].geocodeQuality|string|Descrição de qualidade do `geocode`
|results[n].locations[n].dragPoint|boolean|Localização é um `dragPoint`? (não é utilizada nas requisições feitas pela aplicação)
|results[n].locations[n].sideOfStreet|string|Lado da rua, podendo ser L (esquerda), R (direita), M (misto) ou N (nenhum)
|results[n].locations[n].linkId|string|Identificação da rua/estrada mais próxima dessa localização
|results[n].locations[n].unknownInput|string|Descrição de informação (não utilizada na aplicação)
|results[n].locations[n].type|string|Tipo da localização, podendo ser S (parada) ou V (via)
|results[n].locations[n].latLng|object|Objeto contendo as coordenadas geográficas do resultado atual
|results[n].locations[n].latLng.lat|number|Latitude do resultado atual
|results[n].locations[n].latLng.lng|number|Longitude do resultado atual
|results[n].locations[n].displayLatLng|object|Objeto contendo as coordenadas geográficas de exibição do resultado atual
|results[n].locations[n].displayLatLng.lat|number|Latitude do resultado atual
|results[n].locations[n].displayLatLng.lng|number|Longitude do resultado atual
|results[n].locations[n].mapUrl|string|Um link para a localização no mapa do MapQuest

> Esses dados estão descritos na interface `MapQuestResponse`
> (`src/interfaces/index.ts`)

### Integração com OpenWeatherAPI

A integração com o OpenWeatherAPI utiliza o serviço de `climate forecast` gratuito da plataforma.
Essa integração tem como propósito fornecer os dados de clima/vento/chuvas do usuário atual, baseados na **latitude** e **longitude** fornecidas pela API de Geolocation (`navigator.geolocation`)
Os dados retornados pela API de `climate forecast` estão no seguinte formato:
|Campo|Tipo|Descrição|
|--|--|--|
|base|string|Parâmetro interno do OpenWeatherAPI
|clouds|object|Objeto contendo informações sobre as nuvens na região
|clouds.all|number|Porcentagem de nuvens na região
|cod|number|Parâmetro interno do OpenWeatherAPI
|coord|object|Objeto contendo as coordenadas geográficas da previsão retornada
|coord.lat|number|Latitude da previsão
|coord.lon|number|Longitude da previsão
|dt|number|Timestamp da previsão (formato Unix/UTC)
|id|number|Identificador da Cidade
|main|object|Dados principais de clima para a região atual
|main.feels_like|number|Sensação térmica em `°C`
|main.humidity|number|Umidade relativa do ar (%)
|main.pressure|number|Pressão atmosférica atual (no nível do mar, em geral), em `hPa`
|main.temp|number|Temperatura atual em `°C`
|main.temp_min|number|Temperatura mínima em `°C`
|main.temp_max|number|Temperatura máxima em `°C`
|name|string|Nome da cidade
|sys|object|Dados gerais de informação sobre a previsão
|sys.country|string|Código do país da previsão (ex.: US, BR, etc.).
|`sys.id`|number|Parâmetro interno do OpenWeatherAPI
|sys.sunrise|number|Timestamp referente ao nascimento do sol no dia da previsão
|sys.sunset|number|Timestamp referente ao pôr do sol no dia da previsão
|sys.type|number|Parâmetro interno do OpenWeatherAPI
|timezone|number|Diferença de segundos (formato UTC)
|visibility|number|Distância de visibilidade (em metros)
|weather|object[]|Array de objetos, contendo as informações sobre o clima atual
|weather[n].description|string|Condição climática dentro do grupo (descrito em `weather[n].main`)
|weather[n].icon|string|Código do ícone relativo à condição climática atual (mais em [OpenWeatherAPI - Icons](https://openweathermap.org/weather-conditions))
|weather[n].id|number|Identificador de condição climática
|weather[n].main|string|Grupo de parâmetros climáticos (chuvoso, tempestuoso, etc). Mais em [OpenWeatherAPI - Condition Codes](https://openweathermap.org/weather-conditions))
|wind|object|Dados gerais sobre as condições do vento para previsão
|wind.deg|number|Direção do vento (em graus)
|wind.gust|number|Velocidade de rajadas do vento (em `m/s`)
|wind.speed|number|Velocidade do vento (em `m/s`)
|rain|object|Dados gerais sobre chuva (quando presente)
|rain.1h|number|Volume de precipitação na última hora (em `mm`)
|rain.3h|number|Volume de precipitação nas últimas três horas (em `mm`)
|snow|object|Dados gerais sobre neve (quando presente)
|snow.1h|number|Volume de neve na última hora (em `mm`)
|snow.3h|number|Volume de neve nas últimas três horas (em `mm`)

> Esses dados estão descritos na interface `OpenWeatherApiResponse`
> (`src/interfaces/index.ts`)

### Custom hook `useWeather`

Esse `custom hook` foi criado para gerenciar as chamadas e integrações entre a API de geolocation (`navigator.geolocation`), OpenWeather e MapQuest.
|Parâmetro|Tipo|Descrição|
|--|--|--|
|callback|function|Função que recebe mensagens de sucesso ou erro ao executar as chamadas às integrações. Assinatura: `(sucess: boolean, data: string | any) =>  void`
|apiUrl|string|URL da API do OpenWeather
|appKey|string|Chave de API do OpenWeather
|locationAppKey|string|Chave de API do MapQuest
|locationApiUrl|string|URL da API de `reverse geocoding` do MapQuest

#### Retorno da função
|Parâmetro|Tipo|Descrição|
|--|--|--|
|loading|boolean|Indica se o hook está carregando informações
|availableLocation|boolean|Indica se a localização está disponível para a aplicação
|currentLocationCoordinates|object|Objeto contendo as coordenadas geográficas fornecidas pela API de Geolocation (`navigator.geolocation`). Formato: `GeolocationPosition["coords"]`
|currentForecast|object|Objeto contendo as informações climáticas da integração com o OpenWeatherAPI. Formato descrito na interface [`OpenWeatherApiResponse`](#integração-com-openweatherapi)
|currentLocationAddress|object|Objeto contendo as informações de localização fornecidas pela integração com o MapQuest. Formato descrito na interface [`MapQuestLocation`](#integração-com-mapquest)
|loadLocation|function|Função que dispara o carregamento da geolocalização, `reverse geocoding` e previsão do tempo. Assinatura: `(mustSetLoading = false) => void`


#### Funcionalidade
Ao montar o hook, a aplicação dispara a verificação de geolocalização (função `loadLocation`). Essa função tem como propósito os seguintes itens:
- Verificar existência e disponibilidade da API de geolocalização (`navigator.geolocation`).
- *Calibrar* a geolocalização provida pela API (mais em [Calibração de GPS](#calibração-de-gps)).
- Em caso de sucesso, atualiza o estado local com as coordenadas providas pela API.
- Em caso de erro, o parâmetro `callback` é chamado, com o primeiro parâmetro `false`, e o segundo parâmetro com a mensagem de erro (ver mais em [Mensagens](#mensagens)).


### Calibração de GPS

A implementação da API de Geolocalização (`navigator.geolocation`) em navegadores/plataformas desktop não é precisa. Isso é fato. A explicação para isso é longa, mas basicamente a API dá um retorno inicial (algumas vezes até mesmo resultados em `cache`) que em algumas situações não retorna com precisão as coordenadas do usuário. Em aparelhos eletrônicos portáteis (celulares, tablets, etc) essa localização é mais precisa, devido aos componentes eletrônicos de GPS.

Nesse sentido, foi utilizada uma implementação paralela da função `navigator.geolocation.watchPosition`, que verifica contra um `threshold` de precisão (padrão é 20 metros). Caso a primeira requisição não seja dentro desse parâmetro, ele busca a localização novamente, e assim sucessivamente até que uma das duas condições seja atendida: Localização dentro da tolerância de precisão OU timeout de tentativas;

Essa verificação foi baseada no seguinte trecho, e adaptada para funcionar com typescript: [gregsramblings/getAccurateCurrentPosition](https://github.com/gregsramblings/getAccurateCurrentPosition/blob/master/geo.js)

> **Nota:** Esse *polyfill* está disponível e descrito dentro de `src/geoLocationPolyfill.ts`

Enquanto a calibração ocorre, uma mensagem é exibida informando que a calibração está em andamento (ver mais em [Mensagens](#mensagens)

### Mensagens

As mensagens exibidas dentro do sistema estão catalogadas dentro do arquivo `src/messages/index.ts`
|Mensagem|Descrição|Utilização|
|--|--|--|
|RELOAD_CLIMATE_DATE|`Recarregar os dados climáticos`|*Label* da ação de recarga dos dados climáticos
|LOADING|`Carregando...`|Mensagem padrão de progresso
|LOADING_GEOLOCATION_DATA|`Carregando os dados de geolocalização...`|*Label* da ação de recarga quando o sistema está carregando os dados de geolocalização
|WAITING_GEOLOCATION|`Aguardando geolocalização...`|*Label* da ação de recarga quando o sistema está aguardado a permissão de geolocalização
|CALLIBRATING_LOCATION|`Calibrando geolocalização...`|Mensagem de calibragem da geolocalização
|GEOLOCATION_NOT_ALLOWED|`Geolocalização não habilitada!`|Mensagem de erro quando não está permitida pelo usuário a API de geolocalização
|GEOLOCATION_NOT_AVAILABLE|`Geolocalização não disponível!`|Mensagem de erro quando não está disppnível a API de geolocalização
|GEOLOCATION_TIMEDOUT|`Geolocalização demorou para carregar!`|Mensagem de erro quando a API de geolocalização demorou demais para ter retornos
|GEOLOCATION_INVALID_DATA|`Dados inválidos enviados para busca de endereço!`|Mensagem de erro quando dados inválidos são enviados para a API do MapQuest
|GEOLOCATION_INVALID_KEY|`Chave de API do MapQuest inválida!`|Mensagem de erro quanto a API do MapQuest informa problemas com a chave providenciada
|GEOLOCATION_UNEXPECTED|`Ocorreu um erro inesperado!`|Quando a API MapQuest não sabe informar o problema exato acontecido durante a carga do `reverse geocoding`

Existem ainda duas mensagens que não estão dentro do arquivo `src/messages/index.ts`, mas que são mensagens relacionadas a outros erros e exceções inesperadas das APIs do OpenWeather e MapQuest. São elas:
|Mensagem|Utilização|
|--|--|
|Erro ao carregar os seus dados de localização: `erroemstring`|Mensagem de exceção da integração do MapQuest|
|Erro ao carregar os dados climáticos da sua região: `erroemstring|Mensagem de exceção da integração do OpenWeather
