<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
  import { onMounted, watch, ref } from "vue";
  import "./Button.native";

  const props = defineProps<{
    tag: "button" | "a";
    is: string;
    label?: string;
    variant?: string;
    disabled?: boolean;
    accessibleLabel?: string;
    href?: string;
  }>();

  const container = ref<HTMLElement | null>(null);

  function updateNativeElement() {
    if (!container.value) {
      return;
    }

    container.value.innerHTML = "";

    const el = document.createElement(props.tag, { is: props.is });
    if (props.label) el.setAttribute("label", props.label);
    if (props.variant) el.setAttribute("variant", props.variant);
    if (props.disabled) el.setAttribute("disabled", "");
    if (props.accessibleLabel) {
      el.setAttribute("accessible-label", props.accessibleLabel);
    }

    if (props.tag === "a" && props.href) {
      el.setAttribute("href", props.href);
    }
    container.value.appendChild(el);
  }

  onMounted(updateNativeElement);
  watch(() => ({ ...props }), updateNativeElement, { deep: true });
</script>
