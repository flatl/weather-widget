<template>
  <div class="weather-tab">
    <weather-item
      v-for="[key, weatherItem] of weather"
      :key="key"
      :weather="weatherItem"
      :location-name="locationNames[key]"
      class="weather-tab__weather"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import WeatherItem from './WeatherItem.vue';

import type { Weather } from '@/types/weather';

export default defineComponent({
  components: { WeatherItem },

  props: {
    weather: {
      type: Array as PropType<[string, Weather][]>,
      default: () => [],
    },

    locationNames: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scope>
.weather-tab {
  display: flex;
  flex-direction: column;
  grid-gap: 2rem;
}
</style>
