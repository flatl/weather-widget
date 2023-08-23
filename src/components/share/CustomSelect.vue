<template>
  <div class="custom-select" @click.stop>
    <input
      v-model="input"
      type="text"
      :class="['custom-select__input', 'priority', { opened: isOpened }]"
      @focus="isOpened = true"
    />
    <div
      v-if="isOpened"
      :class="[
        'custom-select__options',
        {
          loading: isLoading,
          opened: isOpened
        }
      ]"
    >
      <loader-animation v-if="isLoading" class="custom-select__loader" />
      <div v-else class="custom-select__options__container">
        <div
          v-for="(option, index) of options"
          :key="index"
          class="custom-select__options__option"
          @click="$emit('select', option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoaderAnimation from './LoaderAnimation.vue';
import type { PropType } from 'vue';

interface Data {
  inputValue: string
  isOpened: boolean
}

export default defineComponent({
  components: { LoaderAnimation },

  emits: {
    select(option: string): boolean {
      return typeof option === 'string';
    },
    input(value: string): boolean {
      return typeof value === 'string';
    },
  },

  props: {
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    isLoading: {
      type: Boolean,
      default: false,
    }
  },

  data(): Data {
    return { inputValue: '', isOpened: false };
  },

  computed: {
    input: {
      get(): string {
        return this.inputValue;
      },
      set(value: string) {
        this.inputValue = value;
        this.$emit('input', value);
      }
    }
  },

  mounted() {
    document.addEventListener('click', this.handleGlobalClick);
  },

  unmounted() {
    document.removeEventListener('click', this.handleGlobalClick);
  },

  methods: {
    handleGlobalClick(): void {
      this.isOpened = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-select {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;

  &__input.priority {
    border: 1px solid var(--c-grey);

    &.opened {
      border-color: var(--c-violet-blue);
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &__loader {
    width: 6rem;
    height: 6rem
  }

  &__options {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 6px;
    border-radius: 6px;
    // padding: .25rem;
    border: 1px solid var(--c-violet-blue);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;

    &.loading {
      justify-content: center;
      align-items: center;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__option {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      padding: .5rem;
      cursor: pointer;

      &:first-of-type {
        margin-top: .5rem;
      }

      &:last-of-type {
        margin-bottom: .5rem;
      }

      &:hover {
        color: var(--c-white);
        background-color: var(--c-violet-blue);
      }
    }
  }
}
</style>
