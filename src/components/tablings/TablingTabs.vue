<script setup>
import { ref, watchEffect } from 'vue';
import Reservation from './Reservation.vue';
import SearchReservation from './SearchReservation.vue';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import { storeToRefs } from 'pinia';

const { isAgreed } = storeToRefs(usePersonalInfoStore());

const SLIDE_LIMIT = 100;

const isActive = ref({
  예약하기: true,
  예약조회: false,
});

const sliderContainer = ref(null);
const currentPosition = ref(0);

const toggleTab = (type) => {
  if (type === '예약하기') {
    isActive.value.예약하기 = true;
    isActive.value.예약조회 = false;
    moveSlider(0);
  } else {
    isActive.value.예약하기 = false;
    isActive.value.예약조회 = true;
    moveSlider(-SLIDE_LIMIT);
  }
};

const moveSlider = (percentage) => {
  currentPosition.value = percentage;
  sliderContainer.value.style.transform = `translateX(${currentPosition}%)`;
};

watchEffect(() => {
  if (isActive.value.예약하기 || isActive.value.예약조회) {
    isAgreed.value = false;
  }
});
</script>

<template>
  <div class="relative">
    <div class="dynamic-padding mt-[13px] h-auto w-full rounded-3xl bg-inherit z-50 absolute">
      <div class="flex gap-[30px]">
        <div
          class="w-[86px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative"
          @click="toggleTab('예약하기')"
        >
          <div
            class="text-xl"
            :class="{ 'font-bold': isActive['예약하기'], 'text-secondary-300': !isActive['예약하기'] }"
          >
            예약하기
          </div>
          <div v-if="isActive['예약하기']" class="w-[86px] h-1 rounded-full bg-primary-900 absolute top-8"></div>
        </div>
        <div
          class="w-[86px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative"
          @click="toggleTab('예약조회')"
        >
          <div
            class="text-xl"
            :class="{ 'font-bold': isActive['예약조회'], 'text-secondary-300': !isActive['예약조회'] }"
          >
            예약조회
          </div>
          <div v-if="isActive['예약조회']" class="w-[86px] h-1 rounded-full bg-primary-900 absolute top-8"></div>
        </div>
      </div>
    </div>
    <div
      :class="`transition-transform duration-500 ease ${
        currentPosition === 0 ? 'translate-x-0' : '-translate-x-full'
      } `"
      ref="sliderContainer"
    >
      <div class="pt-6 flex flex-row w-[200%]">
        <Reservation />
        <SearchReservation />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
