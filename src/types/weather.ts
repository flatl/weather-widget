export type WeatherConditionsThunderStorm = 'Thunderstorm'
export type WeatherConditionsDrizzle = 'Drizzle'
export type WeatherConditionsRain = 'Rain'
export type WeatherConditionsSnow = 'Snow'
export type WeatherConditionsClear = 'Clear'
export type WeatherConditionsClouds = 'Clouds'
export type WeatherConditionsAtmosphere = 
  'Mist' |
  'Smoke' |
  'Haze' |
  'Dust' |
  'Fog' |
  'Sand' |
  'Ash' |
  'Squal' |
  'Tornado'

export type WeatherConditionsMain =
  WeatherConditionsThunderStorm |
  WeatherConditionsDrizzle |
  WeatherConditionsRain |
  WeatherConditionsSnow |
  WeatherConditionsClear |
  WeatherConditionsClouds |
  WeatherConditionsAtmosphere

export interface WeatherConditions {
  id: number
  main: WeatherConditionsMain
  description: string
  icon: string
}

export interface Weather {
  coor: {
    lat: number
    lon: number
  }
  weather: Array<WeatherConditions>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  rain: {
    '1h'?: number
    '3h'?: number 
  }
  clouds: {
    all: number
  }
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
