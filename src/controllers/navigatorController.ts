import NavigatorService from '@/lib/navigatorService';
import { supportedLangs, defaultLang } from '@/config/langs';

import type { Lang } from '@/types/common';

export interface NavigatorController {
  getUserLang(): Lang;
  getUserPosition(): Promise<GeolocationPosition | null>; 
}

export default class NavigatorControllerImplementation implements NavigatorController {
  private navigator: NavigatorService;

  constructor() {
    this.navigator = new NavigatorService();
  }

  getUserLang(): Lang {
    const browserLang = this.navigator.getLang();
    const formattedLang = browserLang.split('-')[0].toLowerCase();

    if (supportedLangs.includes(formattedLang as Lang)) {
      return formattedLang as Lang;
    }

    return defaultLang;
  }

  async getUserPosition(): Promise<GeolocationPosition | null> {
    return await this.navigator.getPostion();
  }
}