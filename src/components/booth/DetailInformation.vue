<script setup>
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { booth, boothType } = storeToRefs(useGetBoothDataStore());
</script>

<template>
  <div class="dynamic-padding pb-8">
    <div class="w-full h-auto bg-secondary-700-light-3 rounded-2xl">
      <div class="flex items-center px-4 pt-4 pb-1">
        <div
          class="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-pretendard font-semibold text-xs"
        >
          위치
        </div>
        <div class="pl-4 text-secondary-500 font-pretendard font-light text-xs">
          {{ booth.location != '' ? booth.location : boothType }}
        </div>
      </div>
      <div class="flex items-center px-4 pb-4 pt-1">
        <div
          class="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-pretendard font-semibold text-xs"
        >
          운영시간
        </div>
        <div class="pl-4 text-secondary-500 font-pretendard font-light text-xs">
          {{ booth.openTime }} ~ {{ booth.closeTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
