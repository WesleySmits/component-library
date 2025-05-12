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
  import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
  import { findFaIcon, getFaSize } from "../../../utilities/icon";
  import type { IconProps } from "./Icon.type";

  const props = defineProps<IconProps>();

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
