<script setup>
import ShowState from '@/components/booth/ShowState.vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { truncateText } from '@/utils/utils';
import { storeToRefs } from 'pinia';

const { getBoothData, setBoothType } = useGetBoothDataStore();
const { boothList, selectBoothMenu } = storeToRefs(useGetBoothDataStore());

const handleClickBoothIntroduction = (type, id) => {
  getBoothData(type, id);
};

const getBoothImageProps = (boothImage) => {
  return {
    class: { 'bg-booth-default-image': !boothImage },
    style: boothImage ? `background-image: url(${boothImage})` : '',
  };
};
</script>

<template>
  <div v-if="boothList[selectBoothMenu] !== ''" class="dynamic-booth-list-padding w-full h-auto">
    <div v-if="boothList[selectBoothMenu]?.length === 0">
      <div
        class="w-full h-[160px] bg-white shadow-3xl flex flex-col justify-between items-center rounded-3.5xl border border-primary-900-light-16"
      >
        <div class="pt-5 font-semibold">부스 정보가 없습니다.</div>
        <div class="w-[220px] h-[100px] bg-tino-error-half bg-cover"></div>
      </div>
    </div>
    <div
      @click="handleClickBoothIntroduction(booth.adminCategory, booth.boothId)"
      v-for="(booth, index) in boothList[selectBoothMenu]"
      :key="index"
      class="pb-2 cursor-pointer"
    >
      <div
        class="w-full h-[160px] bg-white shadow-3xl flex flex-row justify-between items-center rounded-3.5xl border border-primary-900-light-16 px-4 py-3"
        v-if="!booth.boothIntro.includes('총학생회')"
      >
        <div class="w-[222px] h-full flex flex-col justify-between pr-1">
          <div>
            <div
              class="px-2 py-1 w-fit flex justify-center text-center rounded-3.5xl border border-primary text-primary-900 text-3xs font-pretendard font-semibold"
            >
              #{{ booth.adminCategory }}
            </div>
            <div>
              <div class="py-1.5 text-base font-pretendard font-semibold">{{ booth.boothName }}</div>
              <div class="pb-2 text-2xs text-secondary-500">{{ truncateText(booth.boothIntro, 50) }}</div>
            </div>
          </div>
          <div class="flex flex-row">
            <ShowState class="mr-1" :isState="booth.isOpen">{{ booth.isOpen ? '운영중' : '준비중' }}</ShowState>
            <div
              class="px-2 py-1 w-fit flex justify-center text-center items-center text-3xs text-secondary-500 bg-primary-100 rounded-full"
            >
              <img class="mr-1 w-2 h-2 flex justify-center" src="/images/booth/booth-clock-icon.png" />
              <div>{{ booth.openTime }} ~ {{ booth.closeTime }}</div>
            </div>
          </div>
        </div>
        <div class="w-32 min-w-[128px] h-32 flex justify-center items-center">
          <div class="w-full h-full bg-cover rounded-3.5xl border" v-bind="getBoothImageProps(booth.boothImage)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-booth-list-padding {
  padding-left: calc(20 / 430 * 100%) !important;
  padding-right: calc(20 / 430 * 100%) !important;
  padding-bottom: 5rem;
}
</style>
