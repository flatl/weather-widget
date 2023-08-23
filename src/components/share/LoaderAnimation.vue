<template>
  <loader-icon class="loader" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoaderIcon from '../icons/LoaderIcon.vue';

export default defineComponent({
  components: { LoaderIcon },
});
</script>

<style scoped lang="scss">
.loader {
  width: px-to-rem(100px);
  height: px-to-rem(100px);
}
</style>
