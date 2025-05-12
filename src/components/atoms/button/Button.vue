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
  import "./Button.css";

  const props = defineProps<ButtonProps>();

  const cssClasses = [
    "ws-button",
    props.variant ? `ws-button--${props.variant}` : "",
    { "ws-button--disabled": props.disabled },
  ];

  const emit = defineEmits(["click"]);
  const attrs = useAttrs();
  const isLink = computed(() => !!props.href);

  const icon = computed(() => {
    if (typeof props.icon === "string") return props.icon;
    return null;
  });
  const iconPosition = computed(() => props.iconPosition ?? "right");

  const componentProps = computed(() => {
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
