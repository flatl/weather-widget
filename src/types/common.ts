import type { supportedLangs } from '@/config/langs';

export type Lang = typeof supportedLangs[number];

export interface Location {
  coords: {
    lon: number
    lat: number
  }
  name: string
  localName: string
  state: string
}
