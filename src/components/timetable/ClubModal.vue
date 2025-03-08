<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modalStore.js';
import { useBaseModal } from '@/stores/baseModal';

const { modalData } = storeToRefs(useModalStore());
const { closeModal } = useBaseModal();

const handleClickInstagram = () => {
  window.open(`https://www.instagram.com/${modalData.value.instagram}/`, '_blank');
};

const getImage = () => {
  if (modalData.value?.clubImage === null || modalData.value?.clubImage === undefined || !modalData.value?.clubImage) {
    return { backgroundImage: 'url("/images/booth/booth-default-image.png")' };
  }
  return { backgroundImage: `url('${modalData.value.clubImage}')` };
};
</script>

<template>
  <div
    class="relative col-start-2 row-start-2 dynamic-width h-auto bg-white rounded-2xl flex flex-col items-center select-none"
    @click.stop
  >
    <div class="w-full flex justify-between px-5 pt-5">
      <div class="w-[20px] h-[20px]"></div>
      <div
        class="text-xs text-primary-700 rounded-full w-[80px] h-[22px] flex justify-center items-center border-2 border-primary-900-light-68 font-medium"
      >
        교내 동아리
      </div>
      <div
        class="w-[20px] h-[20px] bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
        @click="closeModal()"
      ></div>
    </div>
    <div class="pb-2 pt-4 flex justify-center">
      <div
        :style="getImage()"
        class="border-2 border-primary-900-light-68 bg-cover bg-center w-[120px] h-[120px] rounded-full"
      ></div>
    </div>
    <div class="text-secondary-700 font-medium pb-2">{{ modalData.performer }}</div>
    <div
      class="text-secondary-500 text-xs flex flex-col items-center font-medium pb-4 leading-tight whitespace-pre-wrap text-center"
    >
      <div class="px-4 xs:px-8">{{ modalData.clubDescription }}</div>
    </div>
    <div
      @click="handleClickInstagram()"
      class="text-xs text-secondary-500 rounded-full h-[26px] flex items-center justify-center bg-instagram-bg gap-1 px-2"
    >
      <div class="w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]"></div>
      <div>@{{ modalData.instagram }}</div>
    </div>
    <div class="pb-7 w-full pt-4">
      <div class="px-4 xs:px-8 w-full flex flex-col gap-3 max-h-[224px] overflow-y-auto">
        <div
          v-for="data in modalData.musicList"
          :key="data"
          class="shadow-3xl text-xs text-secondary-700 w-full min-h-[60px] rounded-3xl flex items-center justify-between border-2"
        >
          <div class="px-8 w-[30px] h-[30px] bg-tino-cd bg-center bg-no-repeat bg-[length:30px_30px]"></div>
          <div class="w-full flex flex-col pr-4">
            <div class="flex gap-1">
              <div class="font-bold">{{ data.title }}</div>
              <div>-</div>
              <div>{{ data.artist }}</div>
            </div>
            <div class="text-2xs whitespace-pre-line">{{ data.performer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-width {
  width: calc(388 / 430 * 100%) !important;
}
</style>
