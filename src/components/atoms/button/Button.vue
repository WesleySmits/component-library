<template>
  <component
    :is="isLink ? ButtonLink : BaseButton"
    v-bind="componentProps"
    @click="$emit('click', $event)"
    :class="cssClasses"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      class="ws-button__icon"
      :class="`ws-button__icon--${iconPosition}`"
      :style="{ order: iconPosition === 'left' ? 0 : 2 }"
    />
    <span class="ws-button__content" :style="{ order: 1 }">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script lang="ts" setup>
  import { computed, useAttrs } from "vue";
  import BaseButton from "./BaseButton.vue";
  import ButtonLink from "./ButtonLink.vue";
  import Icon from "../icon/Icon.vue";
  import type { ButtonProps } from "./Button.type";

  const props = defineProps<ButtonProps>();

  const cssClasses = [
    "ws-button",
    props.variant ? `ws-button--${props.variant}` : "",
    { "ws-button--disabled": props.disabled },
  ];

  const emit = defineEmits(["click"]);
  const attrs = useAttrs();
  const isLink = computed(() => !!props.href);

  // icon can be a string (icon name) or true (show icon)
  const icon = computed(() => {
    if (typeof props.icon === "string") return props.icon;
    // If you want to support icon=true for a default icon, set it here, e.g. 'external' or null
    return null;
  });
  const iconPosition = computed(() => props.iconPosition ?? "right");

  const componentProps = computed(() => {
    // Always provide href as a string for both cases to satisfy the union type
    const { href, ...rest } = props;
    return {
      ...rest,
      href: isLink.value ? href ?? "" : "",
      ...attrs,
      classes: cssClasses,
      icon: undefined,
      iconPosition: undefined,
    };
  });
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

  .ws-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    pointer-events: none;
  }
  .ws-button__icon--left {
    order: 0;
  }
  .ws-button__icon--right {
    order: 2;
  }
  .ws-button__content {
    order: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
