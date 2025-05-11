<template>
  <a
    :class="ws - button - link"
    :href="href"
    :aria-label="ariaLabel"
    :aria-disabled="disabled ? 'true' : undefined"
    :tabindex="disabled ? -1 : 0"
    v-bind="attrs"
    @click="onClick"
    @keydown.enter.space="onClick"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<script lang="ts" setup>
  import { computed, useAttrs } from "vue";

  const props = defineProps<{
    label?: string;
    href: string;
    accessibleLabel?: string;
    disabled?: boolean;
  }>();

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

<style scoped></style>
