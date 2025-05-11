<template>
  <component
    :is="isLink ? ButtonLink : BaseButton"
    v-bind="componentProps"
    @click="$emit('click', $event)"
    :class="cssClasses"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
  import { computed, useAttrs } from "vue";
  import BaseButton from "./BaseButton.vue";
  import ButtonLink from "./ButtonLink.vue";

  const props = defineProps<{
    label?: string;
    href?: string;
    accessibleLabel?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    classes?: string | string[] | Record<string, boolean>;
  }>();

  const cssClasses = [
    "ws-button",
    props.variant ? `ws-button--${props.variant}` : "",
    { "ws-button--disabled": props.disabled },
  ];

  const emit = defineEmits(["click"]);
  const attrs = useAttrs();
  const isLink = computed(() => !!props.href);

  const componentProps = computed(() => ({
    ...props,
    ...attrs,
    classes: cssClasses,
  }));
</script>

<style>
  @property --button-height {
    syntax: "<length>+";
    inherits: true;
    initial-value: 2.5rem;
  }
  @property --button-padding-x {
    syntax: "<length>+";
    inherits: true;
    initial-value: 0.5rem 1rem;
  }
  @property --button-padding-y {
    syntax: "<length>+";
    inherits: true;
    initial-value: 0.5rem 1rem;
  }
  @property --button-font-size {
    syntax: "<length>";
    inherits: true;
    initial-value: 1rem;
  }
  @property --button-radius {
    syntax: "<length>";
    inherits: true;
    initial-value: 0.25rem;
  }
  @property --button-background {
    syntax: "<color>";
    inherits: true;
    initial-value: #007cba;
  }
  @property --button-color {
    syntax: "<color>";
    inherits: true;
    initial-value: #fff;
  }
  @property --button-focus-color {
    syntax: "<color>";
    inherits: true;
    initial-value: #007cba;
  }
</style>

<style scoped>
  .ws-button {
    --button-height: 2.5rem;
    --button-padding-x: var(--spacing-md);
    --button-padding-y: var(--spacing-sm);
    --button-radius: var(--border-radius);
    --button-background: var(--color-brand);
    --button-color: var(--color-contrast);
    --button-font-size: var(--font-size-base);
    --button-line-height: var(--line-height-base);
    --button-focus-color: var(--color-brand-accent);

    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: var(--spacing-xs);
    height: var(--button-height);
    padding: var(--button-padding-y) var(--button-padding-x);
    border: none;
    border-radius: var(--button-radius);
    outline: none;
    background-color: var(--button-background);
    color: var(--button-color);

    font-family: var(--font-family-body);
    font-size: var(--button-font-size);
    line-height: var(--button-line-height);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--letter-spacing-base, 0);

    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--animation-duration-fast) ease-in-out,
      border-color var(--animation-duration-fast) ease-in-out,
      color var(--animation-duration-fast) ease-in-out;
    touch-action: manipulation;
    white-space: nowrap;
    appearance: none;
  }

  .ws-button--primary:hover {
    --button-color: var(--color-base);
  }

  .ws-button--secondary {
    --button-background: var(--color-brand-alt);
    --button-focus-color: var(--color-brand-alt-accent);

    &:hover {
      --button-color: var(--color-contrast-accent);
    }
  }

  .ws-button[aria-disabled="true"],
  .ws-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .ws-button:focus-visible {
    outline: 2px solid var(--button-focus-color);
    outline-offset: 2px;
  }
</style>
