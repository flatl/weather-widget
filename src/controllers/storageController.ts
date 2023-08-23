import StorageService from '@/lib/storageService';

import type { Lang, Location } from '@/types/common';

export interface StorageController {
  readonly locations: Array<Location>;
  readonly lang: Lang;

  addLocation(location: Location): void;
  removeLocation(locationName: Location['name']): void;
  sortLocations(order: number[]): void;
  changeLang(lang: Lang): void;
}

export default class StorageControllerImplementation implements StorageController {
  private _locations: Location[] = [];
  private _lang: Lang = 'en';

  get locations(): Location[] {
    return this._locations;
  }

  get lang(): Lang {
    return this._lang;
  }
  
  private storage: StorageService;

  constructor() {
    this.storage = new StorageService();

    if (this.storage.has('locations')) {
      this._locations = this.getLocations();
    }

    if (this.storage.has('lang')) {
      this._lang = this.getLang();
    }
  }

  addLocation(location: Location): void {
    this.setLocations([...this.locations, location]);
  }

  removeLocation(locationName: Location['name']): void {
    this.setLocations(
      this.locations.filter((locat) => locat.name !== locationName)
    );
  }

  sortLocations(order: number[]): void {
    const updatedLocations: Location[] = [];

    for (const position of order) {
      updatedLocations.push(this.locations[position]);
    }

    this.setLocations(updatedLocations);
  }

  changeLang(lang: Lang): void {
    this.setLang(lang);
  }

  private getLocations(): Array<Location> {
    return this.storage.get<Array<Location>>('locations');
  }

  private setLocations(locations: Array<Location>): void {
    this._locations = locations;
    this.storage.set('locations', locations);
  }

  private getLang(): Lang {
    return this.storage.get<Lang>('lang');
  }

  private setLang(lang: Lang) {
    this._lang = lang;
    this.storage.set('lang', lang);
  }
}

