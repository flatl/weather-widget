import type { Response } from '@/lib/api/api';
import type { Weather } from '@/types/weather'; 
import type { Lang } from '@/types/common';

export * from '@/types/common';

export interface WeatherAPI {
  getWeather(lat: number, lon: number, lang?: Lang): Response<Weather>;
}
