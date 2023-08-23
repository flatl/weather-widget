<template>
  <div class="location-item">
    <button class="location-item__move-btn">
      <burger-thumb />
    </button>
    <span class="location-item__name">
      {{ location.localName }}, {{ location.state }}
    </span>
    <button class="location-item__delete-btn" @click="$emit('delete', location as Location)">
      <basket-thumb />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BurgerThumb from '@/components/icons/BurgerThumb.vue';
import BasketThumb from '@/components/icons/BasketThumb.vue';

import type { Location } from '@/types/common';

export default defineComponent({
  emits: {
    delete(location: Location): boolean {
      return 'coords' in location;
    }
  },

  components: { BurgerThumb, BasketThumb },

  props: {
    location: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.location-item {
  display: grid;
  grid-template-columns: 1rem calc(100% - 3rem) 1rem;
  align-items: center;
  width: 100%;
  grid-gap: .5rem;
  padding: .5rem;

  &__name {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: var(--c-dark-grey);
  }

  &__move-btn,
  &__delete-btn {
    ::deep svg {
      width: 1rem;

      rect,
      path {
        fill: var(--c-dark-grey);
      }
    }
  }
}
</style>
