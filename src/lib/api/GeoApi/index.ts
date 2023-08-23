import { API } from '@/lib/api/api';
import type { GeoAPI, Place } from './geoApi';
import type { Response } from '@/lib/api/api';

export * from './geoApi';

export default class GeoAPIImplementation extends API implements GeoAPI {
  private baseURL = 'http://api.openweathermap.org/geo/1.0';

  async getPlacesByName(name: string, limit = 5): Response<Place[]> {
    const params = new URLSearchParams([
      ['limit', limit],
      ['q', name],
      ['appid', import.meta.env.VITE_OPEN_WEATHER_TOKEN]
    ]);

    const url = `${this.baseURL}/direct?${params}`;
    const response = await this.get<Place[]>(url);
    return response;
  }
}
