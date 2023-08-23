<template>
  <div class="weather">
    <h3 class="weather__location-name">
      {{ locationName }}
    </h3>
    <div class="weather__main-block">
      <thunder-storm-weather-thumb
        v-if="conditionsType === 'Thunderstorm'"
        class="weather__conditions-thumb"
      />
      <drizzle-weather-thumb
        v-else-if="conditionsType === 'Drizzle'"
        class="weather__conditions-thumb"
      />
      <rain-weather-thumb
        v-else-if="conditionsType === 'Rain'"
        class="weather__conditions-thumb"
      />
      <snow-weather-thumb
        v-else-if="conditionsType === 'Snow'"
        class="weather__conditions-thumb"
      />
      <clear-weather-thumb
        v-else-if="conditionsType === 'Clear'"
        class="weather__conditions-thumb"
      />
      <clouds-weather-thumb
        v-else-if="conditionsType === 'Clouds'"
        class="weather__conditions-thumb"
      />
      <atmosphere-weather-thumb
        v-else
        class="weather__conditions-thumb"
      />
      <h3 class="weather__temp">
        {{ temperature }}℃
      </h3>
    </div>
    <p class="weather__description">
      {{ description  }}
    </p>
    <div class="container-row">
      <span class="weather__wind">
        <div
          :style="{
            transform: `rotateZ(${weather.wind.deg}deg)`,
          }"
        >
          <navigation-thumb
            class="weather__wind__icon"
          />
        </div>
        &nbsp;
        {{ wind }}
      </span>
      <span class="weather__pressure">
        <pressure-thumb
          class="weather__pressure__icon"
        />
        {{ pressure }}hPa
      </span>
    </div>
    <div class="container-row">
      <span class="weather__humidity">
        Humidity: {{ humidity }}%
      </span>
      <span class="weather__dew-point">
        Dew point: {{ dewPoint }}℃
      </span>
    </div>
    <span class="weather__visibility">
      Visibility: {{ visibility }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { kelvinToCelsius } from '@/helpers/share';
import AtmosphereWeatherThumb from '../icons/weather/AtmosphereWeatherThumb.vue';
import ClearWeatherThumb from '../icons/weather/ClearWeatherThumb.vue';
import CloudsWeatherThumb from '../icons/weather/CloudsWeatherThumb.vue';
import DrizzleWeatherThumb from '../icons/weather/DrizzleWeatherThumb.vue';
import RainWeatherThumb from '../icons/weather/RainWeatherThumb.vue';
import SnowWeatherThumb from '../icons/weather/SnowWeatherThumb.vue';
import ThunderStormWeatherThumb from '../icons/weather/ThunderStormWeatherThumb.vue';
import NavigationThumb from '../icons/NavigationThumb.vue';
import PressureThumb from '../icons/PressureThumb.vue';

import type { Weather, WeatherConditionsMain } from '@/types/weather';

interface Data {
  conditionsType: WeatherConditionsMain
  temperature: number
  description: string
  wind: string
  pressure: number
  humidity: number
  dewPoint: number
  visibility: string
}

export default defineComponent({
  components: {
    AtmosphereWeatherThumb,
    ClearWeatherThumb,
    CloudsWeatherThumb,
    DrizzleWeatherThumb,
    RainWeatherThumb,
    SnowWeatherThumb,
    ThunderStormWeatherThumb,
    NavigationThumb,
    PressureThumb,
  },

  props: {
    weather: {
      type: Object as PropType<Weather>,
      default: () => ({}),
    },
    locationName: {
      type: String,
      default: '',
    },
  },

  data(): Data {
    return {
      conditionsType: 'Clear',
      temperature: 0,
      description: '',
      wind: '',
      pressure: 0,
      humidity: 0,
      dewPoint: 0,
      visibility: '',
    };
  },

  watch: {
    weather() {
      this.updateData();
    },
  },

  created() {
    this.updateData();
  },

  methods: {
    updateData() {
      this.conditionsType = this.getConditionsType();
      this.temperature = this.getTemperature();
      this.description = this.getDescription();
      this.wind = this.getWind();
      this.pressure = this.getPressure();
      this.humidity = this.getHumidity();
      this.dewPoint = this.getDewPoint();
      this.visibility = this.getVisibility();
    },

    getConditionsType(): WeatherConditionsMain {
      return this.weather.weather[0]?.main;
    },

    getTemperature() {
      return Math.round(kelvinToCelsius(this.weather.main.temp));
    },

    getDescription(): string {
      const weather = this.weather;
      const feelsLikeTemp = Math.round(kelvinToCelsius(weather.main.feels_like));
      const conditionsDescription = weather.weather[0].description;
      const capitalizedConditionsDescription =
        conditionsDescription.charAt(0).toUpperCase() + conditionsDescription.slice(1);

      return `Feels like ${feelsLikeTemp}℃. ${capitalizedConditionsDescription}`
    },

    getWind(): string {
      const getDirectionByDegree = (degree: number): string => {
        const value = Math.round((degree / 22.5));
        const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE',  'SE',  'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return arr[value % 16];
      }

      return `${this.weather.wind.speed}m/s ${getDirectionByDegree(this.weather.wind.deg)}`;
    },

    getPressure(): number {
      return this.weather.main.pressure;
    },

    getHumidity(): number {
      return this.weather.main.humidity;
    },

    getDewPoint(): number {
      const calcDewPoint =
        (temperature: number, humidity: number) =>
          temperature - ((1 - (humidity * 0.01)) / 0.05);

      return Math.round(
        calcDewPoint(
          this.getTemperature(),
          this.getHumidity()
        )
      );
    },

    getVisibility(): string {
      const visibilityMeters = this.weather.visibility;

      if (visibilityMeters >= 1000) {
        return `${Math.round(visibilityMeters / 1000)}km`;
      }

      return `${visibilityMeters}m`;
    },
  }
});
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  width: 13rem;
  max-width: 100%;

  .container-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    grid-gap: 1rem;
  }

  &__main-block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-gap: 1rem;
    margin: 1rem 0;
  }

  &__location-name {
    font-size: 1rem;
    font-weight: 500;
    line-height: 22px;
    color: var(--c-black);
  }

  &__conditions-thumb {
    width: 4rem;
    height: 4rem;
  }

  &__temp {
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
  }

  &__description,
  &__wind,
  &__humidity,
  &__pressure,
  &__dew-point,
  &__visibility {
    font-size: 14px;
    font-weight: 400;
    line-height: 1rem;
    color: var(--c-black);
    display: flex;

    &__icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
