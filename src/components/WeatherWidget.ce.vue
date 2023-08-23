<template>
  <aside class="weather-widget">
    <settings-button
      :display="display"
      :disabled="storageController.locations.length === 0"
      @changeDisplay="handleChangeDisplay"
    />
    <weather-tab
      v-if="display === 'weather'"
      :weather="weather"
      :location-names="locationNames"
      class="weather-widget__weather"
    />
    <settings-tab
      v-else-if="display === 'settings'"
      :locations="storageController.locations"
      :lang="storageController.lang"
      class="weather-widget__settings"
      @choose="handleAddLocation"
      @sort="handleSortLocations"
      @delete="handleDeleteLocation"
    />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GeoAPI from '@/lib/api/GeoApi/index';
import WeatherAPI from '@/lib/api/WeatherApi/index';
import NavigatorController from '@/controllers/navigatorController';
import StorageController from '@/controllers/storageController';
import SettingsTab from '@/components/settings/SettingsTab.vue';
import WeatherTab from '@/components/weather/WeatherTab.vue';
import SettingsButton from '@/components/SettingsButton.vue';

import type { Place } from '@/lib/api/GeoApi/index';
import type { Location, Lang } from '@/types/common';
import type { Weather } from '@/types/weather';

interface Data {
  geoAPI: GeoAPI
  weatherAPI: WeatherAPI
  storageController: StorageController
  navigatorController: NavigatorController

  display: 'weather' | 'settings'
  weather: [Location["name"], Weather][]
}

export default defineComponent({
  name: 'weather-widget',

  components: { SettingsButton, WeatherTab, SettingsTab },

  data(): Data {
    const geoAPI = new GeoAPI();
    const weatherAPI = new WeatherAPI();
    const storageController = new StorageController();
    const navigatorController = new NavigatorController();

    return {
      geoAPI,
      weatherAPI,
      storageController,
      navigatorController,

      display: 'weather',
      weather: [],
    };
  },

  async created(): Promise<void> {
    if (this.storageController.locations.length) {
      const isSuccess = await this.fetchAllLocationsWeather(this.storageController.locations);
      if (isSuccess) return;

      this.storageController.locations.forEach(
        (location) => this.storageController.removeLocation(location.name)
      );
    }

    this.storageController.changeLang(
      this.navigatorController.getUserLang()
    );
    this.display = 'settings';
  },

  computed: {
    locationNames(): { [key in string]: string } {
      const names: { [key in string]: string } = {};
      for (const [key] of this.weather) {
        const location = this.storageController.locations.find(
          (location) => location.name === key
        );
        names[key] = `${location?.localName}, ${location?.state}`;
      }

      return names;
    },
  },

  methods: {
    handleChangeDisplay(value: 'settings' | 'weather'): void {
      this.display = value;
    },

    handleAddLocation(place: Place): void {
      const lang = this.storageController.lang;

      const location: Location = {
        coords: {
          lat: place.lat,
          lon: place.lon,
        },
        name: place.name,
        localName: place.local_names[lang] || place.name,
        state: place.country,
      };

      this.storageController.addLocation(location);
      this.fetchLocationWeather(location, lang);
    },

    handleDeleteLocation(location: Location): void {
      this.weather = this.weather.filter(
        (weath) => weath[0] !== location.name
      );
      this.storageController.removeLocation(location.name);
    },

    handleSortLocations(order: number[]): void {
      this.storageController.sortLocations(order);
      const updatedWeather: [Location['name'], Weather][] = [];
      for (const location of this.storageController.locations) {
        const weatherTuple = this.weather.find(([key]) => key === location.name);

        if (weatherTuple) {
          const weather = weatherTuple[1];
          updatedWeather.push([location.name, weather]);
        }
      }

      this.weather = updatedWeather;
    },

    fetchAllLocationsWeather(locations: Array<Location>): Promise<boolean> {
      return new Promise((resolve) => {
        const promises = locations
          .map((location) =>
            this.fetchLocationWeather(location, this.storageController.lang)
          );

        Promise.any(promises)
          .then(() => resolve(true))
          .catch((aggregateError: any) => {
            console.error('Failed to fetch weather for each location with errors:', aggregateError.errors);
            resolve(false);
          });
      });
    },

    fetchLocationWeather(location: Location, lang: Lang): Promise<boolean> {
      return new Promise((resolve, reject) => {
        const { coords: { lat, lon }, name } = location;

        this.weatherAPI.getWeather(lat, lon, lang)
          .then((response) => {
            if (response.success) {
              this.weather = [...this.weather, [location.name, response.data]];
              resolve(true);
            } else {
              console.error(
                `Failed to fetch weather for location: ${name},\n with message: ${response.message}`
              );
              reject(response.message);
            }
          })
      });
    }
  },
});
</script>

<style lang="scss">
@import '@/assets/css/main.scss';
@import '@/assets/css/components.scss';

.weather-widget {
  position: relative;
  display: flex;
  width: fit-content;
  max-width: 100%;
}
</style>
