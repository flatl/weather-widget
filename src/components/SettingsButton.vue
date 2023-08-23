<template>
  <button
    :class="[
      'settings-button',
      { disabled: disabled },
      { 'enter-animation': enableEnterButtonAnimation },
      { 'leave-animation': enableLeaveButtonAnimation },
    ]"
    @click="toggleDisplay"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <settings-thumb class="settings-button__thumb" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsThumb from '@/components/icons/SettingsThumb.vue';

interface Data {
  enableEnterButtonAnimation: boolean,
  enableLeaveButtonAnimation: boolean
}

export default defineComponent({
  components: { SettingsThumb },

  props: {
    display: {
      type: String,
      default: 'weather',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data(): Data {
    return {
      enableEnterButtonAnimation: false,
      enableLeaveButtonAnimation: false
    };
  },

  methods: {
    toggleDisplay(): void {
      if (this.disabled) return;

      if (this.display === 'settings') {
        this.$emit('changeDisplay', 'weather');
      } else {
        this.$emit('changeDisplay', 'settings');
      }
    },

    handleMouseEnter(): void {
      this.enableEnterButtonAnimation = true;
      this.enableLeaveButtonAnimation = false;
    },

    handleMouseLeave(): void {
      if (this.display !== 'settings') {
        this.enableEnterButtonAnimation = false;
        this.enableLeaveButtonAnimation = true;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.settings-button {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;

  &.enter-animation,
  &.disabled {
    svg {
      transform: rotateZ(45deg);

      path,
      circle {
        stroke: var(--c-violet-blue);
      }
    }
  }

  &.leave-animation {
    svg {
      transform: rotateZ(0);

      path,
      circle {
        stroke: var(--c-black);
        animation: stroke-anim .15s 1;
      }
    }
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform .15s linear;
    outline: none;

    path,
    circle {
      stroke: var(--c-black);
    }
  }
}

@keyframes stroke-anim {
  0% {
    stroke: var(--c-violet-blue);
  }

  90% {
    stroke: var(--c-violet-blue);
  }

  100% {
    stroke: var(--c-black);
  }
}
</style>
