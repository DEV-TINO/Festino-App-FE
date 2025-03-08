<script setup>
const props = defineProps({
  isState: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    :class="{'state-show': true, 'is-active': isState}"
  >
    <slot></slot>
  </div>
</template>

<style lang="css" scoped></style>
