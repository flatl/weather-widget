<template>
  <div class="locaion-search" data-app>
    <label for="search" class="location-search__input-label">
      Add location:
    </label>
    <custom-select
      :options="showItems"
      :is-loading="isLoading"
      class="location-search__select"
      @input="handleInput"
      @select="handleChoose"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { lazyThrottle } from '@/helpers/share';
import GeoAPI from '@/lib/api/GeoApi';
import CustomSelect from '@/components/share/CustomSelect.vue';

import type { Place } from '@/lib/api/GeoApi';
import type { Location, Lang } from '@/types/common';

interface Data {
  geoAPI: GeoAPI
  searchItems: Place[]
  isInputFocused: boolean
  isLoading: boolean
}

export default defineComponent({
  components: { CustomSelect },

  props: {
    currentLocations: {
      type: Array as PropType<Location[]>,
      default: () => [],
    },

    currentLang: {
      type: String,
      default: 'en',
    },
  },

  emits: {
    choose(place: Place): boolean {
      return 'lat' in place;
    },
  },

  data(): Data {
    const geoAPI = new GeoAPI();
    return {
      geoAPI,
      searchItems: [],
      isInputFocused: false,
      isLoading: false,
    };
  },

  computed: {
    showItems(): string[] {
      return this.searchItems.map(this.getSearchItemTitle);
    },
  },

  methods: {
    handleInput(value: string) {
      if (value.length) {
        this.isLoading = true;
        this.handleSearch(value);
      } else {
        this.clearData();
      }
    },

    handleSearch: lazyThrottle(async function (this: any, value: string | null) {
      if (!value || value.length < 3) {
        this.searchItems = [];
        return;
      }

      const response = await this.makeQuery(value);

      if (response.success) {
        this.searchItems = response.data
          .filter((item: Place) =>
            !this.currentLocations.some(
              (location: Location) =>
                location.name === item.name && location.state === item.country
            )
          );
      }

      this.isLoading = false;
    }, 7e2),

    async makeQuery(queryString: string) {
      return await this.geoAPI.getPlacesByName(queryString, 5);
    },

    getSearchItemTitle(item: Place): string {
      let title = '';
      const name = item.local_names && this.currentLang in item.local_names
        ? item.local_names[(this.currentLang as Lang)]
        : item.name;

      title = title.concat(`${name}, `)

      if (item.state) {
        title = title.concat(`${item.state}, `)
      }

      return title.concat(item.country);
    },

    handleChoose(itemName: string) {
      console.log(itemName);

      const index = this.showItems.findIndex((item) => item === itemName);

      if (index === -1) return;

      this.$emit('choose', this.searchItems[index]);
      this.clearData();
    },

    clearData() {
      this.searchItems = [];
    },
  },
});
</script>

<style lang="scss" scoped>
.location-search {
  max-width: 100%;

  &__input-label {
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    line-height: 22px;
    margin: 0 0 0.25rem 0;
  }
}
</style>
