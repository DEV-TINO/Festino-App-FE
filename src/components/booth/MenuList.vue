<script setup>
import MenuInformation from './MenuInformation.vue';
import MenuSummary from '@/components/booth/MenuSummary.vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { booth } = storeToRefs(useGetBoothDataStore());
</script>

<template>
  <div class="w-full h-3 mb-7 bg-secondary-700-light-3"></div>
  <div class="mb-[28px]">
    <MenuSummary v-if="booth.adminCategory == '야간부스'" />
    <MenuInformation />
  </div>
</template>

<style lang="css" scoped></style>
