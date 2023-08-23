<template>
  <div class="settings-tab">
    <div class="settings-tab__head">
      <h3 class="settings-tab__title">
        Settings
      </h3>
    </div>
    <location-items
      v-if="locations.length"
      :locations="locations"
      class="settings-tab__locations"
      @delete="(location: Location) => $emit('delete', location)"
      @sort="(items: number[]) => $emit('sort', items)"
    />
    <location-search
      :current-locations="locations"
      :current-lang="lang"
      class="settings-tab__search"
      @choose="(place: Place) => $emit('choose', place)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import LocationItems from './LocationItems.vue';
import LocationSearch from './LocationSearch.vue';

import type { Place } from '@/lib/api/GeoApi';
import type { Location } from '@/types/common';

export default defineComponent({
  components: {
    LocationItems,
    LocationSearch,
  },

  props: {
    locations: {
      type: Array as PropType<Location[]>,
      default: () => [],
    },

    lang: {
      type: String,
      default: 'en',
    },
  },

  emits: {
    choose(place: Place): boolean {
      return 'lat' in place;
    },

    delete(location: Location): boolean {
      return 'coords' in location;
    },

    sort(items: number[]): boolean {
      return Array.isArray(items);
    }
  },
});
</script>

<style lang="scss" scoped>
.settings-tab {
  display: flex;
  flex-direction: column;
  width: 13rem;
  max-width: 100%;
  grid-gap: 1rem;

  &__title {
    font-size: 1rem;
    font-weight: 500;
    line-height: 22px;
    margin: 0 0 0.5rem 0;
  }

  &__locations {
    margin: 0 0 1rem 0;
  }
}
</style>
