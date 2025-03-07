<script setup>
import { computed } from 'vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const boothDataStore = useGetBoothDataStore();
const { mainMenu, subMenu } = storeToRefs(boothDataStore);

const formattedMainMenu = computed(() => mainMenu.value.join(', '));
const formattedSubMenu = computed(() => subMenu.value.join(', '));
</script>

<template>
  <div class="dynamic-padding pb-8">
    <div class="w-full h-auto bg-primary-50 rounded-2xl py-4">
      <div v-if="formattedMainMenu" class="flex items-center px-4 pb-1">
        <div
          class="flex justify-center items-center min-w-[72px] w-[72px] h-[26px] rounded-full bg-secondary-50 text-secondary-500 font-pretendard font-semibold text-xs"
        >
          메인메뉴
        </div>
        <div class="pl-4 text-secondary-500 font-pretendard font-light text-xs">{{ formattedMainMenu }}</div>
      </div>
      <div v-if="formattedSubMenu" class="flex items-center px-4 pt-1">
        <div
          class="flex justify-center items-center min-w-[72px] w-[72px] h-[26px] rounded-full bg-secondary-50 text-secondary-500 font-pretendard font-semibold text-xs"
        >
          서브메뉴
        </div>
        <div class="pl-4 text-secondary-500 font-pretendard font-light text-xs">{{ formattedSubMenu }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
