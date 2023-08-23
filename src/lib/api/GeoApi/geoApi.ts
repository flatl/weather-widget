import type { Response } from '@/lib/api/api';
import type { Lang } from '@/types/common';

export type StateCode = Lang;
export type StateName = string;

export interface Place {
  name: string;
  local_names: {
    [key in StateCode]: string
  };
  lat: number;
  lon: number;
  country: StateCode;
  state:  StateName;
}

export interface GeoAPI {
  /**
   * 
   * @param name - city/state
   * @param limit - max 5
   */
  getPlacesByName(name: string, limit: number): Response<Array<Place>>;
}
