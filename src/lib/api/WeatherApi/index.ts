import { API } from '@/lib/api/api';

import type { Response } from '@/lib/api/api';
import type { WeatherAPI } from './weatherApi';
import type { Weather } from '@/types/weather';

export default class WeatherAPIImplementation extends API implements WeatherAPI {
  private baseURL = 'https://api.openweathermap.org/data/2.5';
  
  async getWeather(lat: number, lon: number, lang?: string | undefined): Response<Weather> {
      const params = new URLSearchParams([
        ['lat', lat.toString()],
        ['lon', lon.toString()],
        ['appid', import.meta.env.VITE_OPEN_WEATHER_TOKEN]
      ]);

      if (lang) params.append('lang', lang);

      const url = `${this.baseURL}/weather?${params}`;
      const response = await this.get<Weather>(url);
      return response;
  }
}