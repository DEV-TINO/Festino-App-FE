<script setup>
import router from '@/router';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { booth } = storeToRefs(useGetBoothDataStore());

const handleRoutertoReserve = () => {
  router.push({ path: `/reserve/${booth.value.boothId}` });
};
</script>

<template>
  <div class="w-full h-3 mb-7 bg-primary-50"></div>
  <div class="dynamic-padding">
    <div class="font-pretendard text-2xl font-semibold pb-5">현재 대기중</div>
    <div
      class="mb-5 relative aspect-auto w-full h-[155px] xs:h-[171.3px] sm:h-[207px] bg-booth-reservation-status bg-no-repeat bg-cover rounded-3xl"
    >
      <div class="absolute right-8 xs:right-10 top-6 xs:top-8 sm:top-12 flex flex-col items-center">
        <div class="px-4 py-1 mb-2 w-fit h-fit rounded-full bg-white text-primary-900 font-bold font-pretendard">
          대기중인 팀
        </div>
        <div class="flex items-end">
          <div class="font-bold text-7xl text-white font-pretendard">{{ booth.totalReservationNum }}</div>
          <div class="pb-2 font-semibold text-xl text-white font-pretendard">팀</div>
        </div>
      </div>
    </div>
    <button
      @click="handleRoutertoReserve()"
      class="w-full h-auto py-4 mt-3 mb-3 shadow-3xl border-1 border-primary-900-light-68 rounded-full text-primary-900 font-pretendard text-base active:text-white active:bg-primary-900"
    >
      예약하기
    </button>
  </div>
</template>

<style lang="css" scoped></style>
