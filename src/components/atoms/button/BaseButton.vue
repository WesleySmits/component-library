<template>
  <button
    :type="type ?? undefined"
    :aria-label="ariaLabel"
    :aria-disabled="disabled ? 'true' : undefined"
    :disabled="disabled ?? false"
    :tabindex="disabled ? -1 : 0"
    v-bind="attrs"
    @click="onClick"
    @keydown.enter.space="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  import { computed, useAttrs } from "vue";
  import type { BaseButtonProps } from "./Button.type";

  const props = defineProps<BaseButtonProps>();
  const attrs = useAttrs();
  const disabled = props.disabled || false;
  const ariaLabel = computed(
    () => props.accessibleLabel || props.label || undefined
  );

  function onClick(event: Event) {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      return;
    }
  }
</script>
