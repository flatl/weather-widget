<template>
  <weather-widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherWidget from './components/WeatherWidget.ce.vue';

export default defineComponent({
  name: 'App',

  components: { WeatherWidget },
});
</script>
