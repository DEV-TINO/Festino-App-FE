<script setup>
import { useBaseModal } from '@/stores/baseModal';

const { closeModal } = useBaseModal();
</script>
<template>
  <div
    class="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
    @click.stop=""
  >
    <div class="w-12 h-12 rounded-full bg-primary-900-light-16 grid place-items-center">
      <img src="/icons/info.svg" />
    </div>
    <div class="w-full flex flex-col gap-3 items-center">
      <p class="text-secondary-700 text-xl font-bold">업데이트 예정</p>
      <div class="flex items-center flex-col">
        <p class="text-secondary-500">준비 중인 기능입니다</p>
        <p class="text-secondary-500">축제에서 만나요!</p>
      </div>
    </div>
    <button class="w-full h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl" @click="closeModal()">
      확인
    </button>
  </div>
</template>

<style lang="css" scoped>
.dynamic-width {
  width: calc(390 / 430 * 100%) !important;
}
</style>
