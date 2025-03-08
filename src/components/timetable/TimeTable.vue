<script setup>
import { onMounted, watch, ref } from 'vue';
import { useTimetableStore } from '@/stores/timetableStore.js';
import { storeToRefs } from 'pinia';
import TimeTableDetail from './TimeTableDetail.vue';

const { getClubTimetable } = useTimetableStore();
const { clubData, day } = storeToRefs(useTimetableStore());
const activateTimetable = ref(false);

const isShowingTime = (isShowing) => {
  if (isShowing) return 'text-secondary-700';
  else return 'text-secondary-100';
};

const isShowingPin = (isShowing) => {
  if (isShowing) return 'bg-primary-700';
  else return 'bg-secondary-100';
};

const isShowingBgPin = (isShowing) => {
  if (isShowing) return 'bg-primary-700-light';
  else return 'bg-secondary-50';
};

const updateActiveTimetable = () => {
  activateTimetable.value = false;
  if(clubData.value.showInfo) {
    clubData.value.showInfo.forEach((data) => {
      if(data.isShowing) activateTimetable.value = true;
      if(activateTimetable.value) data.isShowing = true;
    });
    if (!activateTimetable.value) {
      clubData.value.showInfo.forEach((data) => {
      data.isShowing = true;
      });
    }
  }
};

const handleClickInstagram = () => {
  window.open(`https://www.instagram.com/tukorea_25_wind/`, '_blank');
};

watch(() => day.value, async () => {
  await getClubTimetable();
  updateActiveTimetable();
});

onMounted(async () => {
  await getClubTimetable();
  updateActiveTimetable();
});
</script>

<template>
  <div class="w-full select-none pb-20">
    <div class="flex flex-col items-center border-1 border-primary-900-light-68 rounded-3xl py-5 shadow-4xl gap-4">
      <div class="text-gray-400 text-2xs">* 주최측의 사정에 따라 일정이 달라질 수 있습니다.</div>
      <div class="px-5 pb-5">
        <div
          class="w-[300px] xs:w-[350px] sm:w-[390px] py-2 text-white bg-primary-700 rounded-full flex justify-center"
        >
          DAY {{ day }} 공연 타임테이블
        </div>
      </div>
      <div v-if="!clubData.showInfo || clubData.showInfo.length == 0" class="w-full flex flex-col items-center pb-4">
        <div class="pt-6 pb-[48px] gap-1 flex flex-col items-center">
          <div class="text-secondary-700 font-bold">현재 공연정보가 없습니다.</div>
          <div class="text-secondary-500 text-xs">추후 업데이트 예정입니다.</div>
        </div>
        <div class="bg-tino-error-timetable bg-cover bg-center bg-no-repeat w-full aspect-[35/26]"></div>
      </div>
      <div class="flex h-full w-full justify-center">
        <div class="flex flex-col items-center text-secondary-700 gap-[162px] pt-1 mt-[-9px]">
          <div v-for="data in clubData.showInfo" :key="data" :class="isShowingTime(data.isShowing)">{{ data.showStartTime }} ~ {{ data.showEndTime }}</div>
        </div>
        <div v-if="clubData.showInfo && clubData.showInfo.length != 0" class="pt-3 pl-4 sm:pl-7 pr-3 xs:pr-4 sm:pr-7">
          <div class="border-2 border-primary-900-light-68 h-[auto] w-0 border-dashed flex flex-col items-center gap-44 pb-32 mt-[-10px]">
            <div class="w-[16px] h-[16px] mt-[-5px] rounded-full flex items-center justify-center" :class="isShowingBgPin(data.isShowing)" v-for="data in clubData.showInfo" :key="data">
              <div class="w-[8px] h-[8px] rounded-full" :class="isShowingPin(data.isShowing)"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-6">
          <div v-for="data in clubData.showInfo" :key="data">
            <TimeTableDetail :data="data" />
          </div>
        </div>
      </div>
      <div class="text-center flex flex-col gap-2">
        <p class="text-primary-700 text-xs">자세한 공연 정보가 궁금하다면?</p>
        <button @click="handleClickInstagram()" class="text-white w-[232px] h-[30px] rounded-full bg-primary-700 text-sm">총학생회 wind 인스타그램 바로가기</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
