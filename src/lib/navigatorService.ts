export default class NavigatorService {
  getPostion(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          () => reject(false)
        )
      } else {
        reject(false);
      }
    })
  }

  getLang(): string {
    return navigator.language;
  }
}
