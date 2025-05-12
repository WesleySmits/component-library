<template>
  <a
    :class="['ws-button-link']"
    :href="disabled ? undefined : href"
    :aria-label="ariaLabel"
    :aria-disabled="disabled ? 'true' : undefined"
    :tabindex="disabled ? -1 : 0"
    v-bind="attrs"
    @click="onClick"
    @keydown.enter.space="onClick"
  >
    <Icon
      v-if="showExternalIcon"
      icon="arrow-up-right-from-square"
      class="ws-button__icon ws-button__icon--right"
    />
    <slot>{{ label }}</slot>
  </a>
</template>

<script lang="ts" setup>
  import { computed, useAttrs } from "vue";
  import Icon from "../icon/Icon.vue";
  import { isExternalLink } from "../../../utilities/link";

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

  const showExternalIcon = computed(() => isExternalLink(props.href));

  function onClick(event: Event) {
    if (disabled) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      return;
    }
  }
</script>
