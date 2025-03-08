<script setup>
import MenuOption from '@/components/booth/MenuOption.vue';
import MenuStatus from '@/components/booth/ShowState.vue';

import { useBaseModal } from '@/stores/baseModal';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { closeModal } = useBaseModal();
const { menuList, selectedIndex } = storeToRefs(useGetBoothDataStore());
</script>

<template>
  <div class="col-start-2 row-start-2 px-8 relative" @click.stop="">
    <div class="relative">
      <div
        class="absolute top-2 right-2 w-4 h-4 bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
        @click="closeModal()"
      ></div>
      <img
        :src="`${menuList[selectedIndex].menuImage}`"
      />
    </div>
  </div>
</template>

<style lang="css" scoped></style>