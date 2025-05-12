<template>
  <div class="cta-block">
    <img v-if="image" :src="image" alt="" class="cta-block__image" />
    <div class="cta-block__content">
      <h2 class="cta-block__heading">{{ heading }}</h2>
      <p class="cta-block__text">{{ text }}</p>
      <BaseButton
        v-if="buttonLabel && buttonUrl"
        :label="buttonLabel"
        :variant="'primary'"
        :accessible-label="buttonLabel"
        @click="onButtonClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BaseButton from "@/components/atoms/button/BaseButton.vue";

  const props = defineProps<{
    image?: string;
    heading: string;
    text: string;
    buttonLabel?: string;
    buttonUrl?: string;
  }>();

  function onButtonClick() {
    if (props.buttonUrl) {
      window.open(props.buttonUrl, "_blank");
    }
  }
</script>

<style scoped>
  .cta-block {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    background: var(--color-background);
    padding: var(--spacing-lg);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  .cta-block__image {
    max-width: 200px;
    border-radius: 4px;
  }
  .cta-block__content {
    flex: 1;
  }
  .cta-block__heading {
    font-size: var(--font-size-xl);
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
  }
  .cta-block__text {
    font-size: var(--font-size-base);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
  }
</style>
