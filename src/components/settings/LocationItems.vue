<template>
  <div class="location-items">
    <ul class="location-items__list">
      <li
        v-for="(location, index) of locations"
        :key="index"
        class="location-items__list__item"
        draggable="true"
        @dragstart.stop="handleDragStart(index)"
        @dragend="handleDragEnd"
        @dragover.prevent="handleDragOver(index)"
        @dragleave="handleDragLeave"
        @drop="handleDrop(index)"
      >
        <location-item :location="location" @delete="handleDelete" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LocationItem from './LocationItem.vue';

import type { PropType } from 'vue';
import type { Location } from '@/types/common';

interface Data {
  draggedItemIndex: number
  dragOveredItemIndex: number
}

export default defineComponent({
  components: { LocationItem },

  emits: {
    delete(location: Location): boolean {
      return 'coords' in location;
    },
    sort(items: number[]): boolean {
      return Array.isArray(items);
    }
  },

  props: {
    locations: {
      type: Array as PropType<Location[]>,
      default: () => [],
    },
  },

  data(): Data {
    return {
      draggedItemIndex: -1,
      dragOveredItemIndex: -1,
    }
  },

  methods: {
    handleDelete(location: Location): void {
      this.$emit('delete', location);
    },

    handleDragStart(index: number) {
      this.draggedItemIndex = index;
    },

    handleDragEnd() {
      this.draggedItemIndex = -1;
      this.dragOveredItemIndex = -1;
    },

    handleDragOver(index: number) {
      if (index !== this.draggedItemIndex) {
        this.dragOveredItemIndex = index;
      }
    },

    handleDragLeave() {
      this.dragOveredItemIndex = -1;
    },

    async handleDrop(updatedItemIndex: number) {
      if (updatedItemIndex === this.draggedItemIndex) return;

      const locationsIndexes = (this.locations as Location[]).map((_, index) => index);
      const newLocationsOrder = [...locationsIndexes];

      newLocationsOrder.splice(this.draggedItemIndex, 1);
      newLocationsOrder.splice(
        updatedItemIndex,
        0,
        locationsIndexes[this.draggedItemIndex]
      );

      console.log(locationsIndexes, newLocationsOrder);
      this.$emit('sort', newLocationsOrder);
    },
  },
});
</script>

<style lang="scss" scoped>
.location-items {
  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    grid-gap: 1rem;
    padding: 0;

    &__item {
      background-color: var(--c-cream-white);
    }
  }
}
</style>
