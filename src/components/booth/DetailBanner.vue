<script setup>
import 'primeicons/primeicons.css';
import { useRouter } from 'vue-router';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { booth } = storeToRefs(useGetBoothDataStore());
const router = useRouter();

const handleClickBoothDetailBackArrow = () => {
  router.push({ path: '/booth' });
};

const getSlogan = () => {
  if(booth.value.adminCategory === "야간부스") return "먹거리가 가득한"
  if(booth.value.adminCategory === "주간부스") return "즐거움이 가득한"
  if(booth.value.adminCategory === "푸드트럭") return "먹거리가 가득한"
};
</script>

<template>
  <div class="relative">
    <div class="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-detail-banner bg-cover">
      <div
        @click="handleClickBoothDetailBackArrow()"
        class="z-4 bg-back-arrow-white w-[18px] h-[18px] bg-no-repeat text-xl absolute top-[24px] left-[24px] bg-cover pointer-events-auto cursor-pointer"
      ></div>
      <div class="drop-shadow-title absolute w-auto h-auto dynamic-top dynamic-padding">
        <div
          class="text-white font-jalnan2 text-md xs:text-md sm:text-[19px]"
        >
          {{ getSlogan() }}
        </div>
        <div
          class="font-jalnan2 text-3xl text-white"
        >
          {{ booth?.adminName ? booth.adminName : booth.boothName }}
        </div>
      </div>
    </div>
    <div class="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-top {
  top: calc(130 / 400 * 100%) !important;
}
</style>
