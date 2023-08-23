/**
 * Differ from default throttle function
 * by not calling the passing function first time.
 * Instead it will put it on a timer
 * and if you will try to call it again according timer action,
 * timer will renewed with initial time.
 * @param {Function} f
 * @param {number} ms
 * @returns {Function}
 */
export function lazyThrottle<T>(f: (...args: any[]) => any, ms: number): (...args: any[]) => void {
  let timeout: number,
      savedArgs: any[],
      savedThis: T;

  function wrapper(this: T) {
    clearTimeout(timeout);

    savedArgs = (arguments as unknown as any[]);
    savedThis = this;

    timeout = setTimeout(function () {
      if (savedArgs) {
        f.apply(savedThis, savedArgs);
      }
    }, ms);
  }

  return wrapper;
}

const ABSOLUTE_ZERO = 273.15;

export const kelvinToCelsius =
  (tK: number): number => tK - ABSOLUTE_ZERO;

export const celsiusToKelvin =
  (tC: number): number => tC + ABSOLUTE_ZERO;
