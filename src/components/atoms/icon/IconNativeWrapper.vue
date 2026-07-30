<template>
  <div ref="container"></div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import "./Icon.native";

const props = defineProps<{
  icon: string;
  size?: string | number;
}>();

const container = ref<HTMLElement | null>(null);

function updateNativeElement() {
  if (!container.value) return;
  container.value.innerHTML = "";

  const iconEl = document.createElement("ws-icon");
  iconEl.setAttribute("icon", props.icon);
  if (props.size) {
    iconEl.setAttribute("size", String(props.size));
  }
  iconEl.className = `ws-icon ws-icon--${props.icon}`;
  iconEl.setAttribute("aria-hidden", "true");
  iconEl.setAttribute("focusable", "false");

  container.value.appendChild(iconEl);
}

onMounted(updateNativeElement);
watch(() => ({ ...props }), updateNativeElement, { deep: true });
</script>
