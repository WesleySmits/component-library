<template>
  <font-awesome-icon
    v-if="iconDef"
    :icon="iconDef"
    :size="faSize"
    class="ws-icon"
    :class="`ws-icon--${icon}`"
    :style="iconStyle"
    aria-hidden="true"
    focusable="false"
  />
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
  import {
    extractIcons,
    findFaIcon,
    getFaSize,
    getAllIconsAndRegister,
  } from "@/utilities/icon";

  // Type for allowed FA sizes
  export type FaSize =
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";

  const props = defineProps<{
    icon: string;
    size?: number | string;
  }>();

  const iconDef = computed<IconDefinition | null>(() => findFaIcon(props.icon));
  const faSize = computed(() => getFaSize(props.size));
  const iconStyle = computed(() =>
    typeof props.size === "number" ? { fontSize: props.size + "px" } : undefined
  );
</script>

<style scoped>
  .ws-icon {
    display: inline-block;
    vertical-align: middle;
    pointer-events: none;
  }
</style>
