<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { useReservationStore } from '@/stores/tablings/tablingStore';
import { useBaseModal } from '@/stores/baseModal';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import NoBooth from '@/components/tablings/NoBooth.vue';

const { getAllNightBooth, setSelectedNightBoothInfo } = useReservationStore();
const { openNightBoothInfo, selectedNightBoothInfo, openNightBoothInfoLength } = storeToRefs(useReservationStore());
const { getBoothData } = useGetBoothDataStore();
const { openModal } = useBaseModal();

const selectedBoothId = ref('');
const handleClickMajorBox = (boothInfo) => {
  if (selectedBoothId.value === boothInfo.boothId) {
    selectedBoothId.value = '';
    setSelectedNightBoothInfo(null);
    return;
  }
  selectedBoothId.value = boothInfo.boothId;
  setSelectedNightBoothInfo({ ...boothInfo });
};

const handleClickReserveButton = () => {
  if (!selectedBoothId.value) return;
  openModal('reserveModal');
};

const router = useRouter();
const route = useRoute();
const handleClickDetailButton = () => {
  if (!selectedBoothId.value) return;
  getBoothData('야간부스', selectedBoothId.value);
  router.push({ path: `/booth/detail/night/${selectedBoothId.value}` });
};

const handleScrollToSelectedBooth = () => {
  if (!selectedBoothId.value) return;

  const container = document.getElementById('reserve-container');
  const element = document.getElementById(selectedBoothId.value);

  if (element && container) {
    const containerWidth = container.offsetWidth;
    const elementWidth = element.offsetWidth;
    const elementLeft = element.offsetLeft;
    const scrollLeft = elementLeft - containerWidth / 2 + elementWidth / 2;
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
};

const getNightBoothImage = (nightBoothImage) => {
  return {
    style: nightBoothImage
      ? `background-image: url(${nightBoothImage})`
      : 'background-image: url(/images/booth/booth-default-image.png)',
  };
};

watch(selectedBoothId, () => {
  handleScrollToSelectedBooth();
});

onMounted(async () => {
  await getAllNightBooth();
  selectedBoothId.value = route.params?.boothId ?? selectedNightBoothInfo.value?.boothId ?? '';
  if (selectedBoothId.value) {
    openNightBoothInfo.value.forEach((info) => {
      if (info.boothId === selectedBoothId.value) {
        selectedBoothId.value = '';
        handleClickMajorBox(info);
      }
    });
  }
  await nextTick();
  handleScrollToSelectedBooth();
});
</script>

<template>
  <div class="w-screen max-w-[500px] min-w-[375px]">
    <div class="w-full flex justify-start">
      <div
        :class="{ 'overflow-x-scroll': openNightBoothInfoLength > 4 }"
        class="pt-10 w-full flex"
        @touchstart.stop=""
        id="reserve-container"
      >
        <div class="dynamic-width"></div>
        <NoBooth v-if="!openNightBoothInfo || openNightBoothInfoLength === 0" />
        <div
          class="gap-2"
          :class="{
            'flex justify-start': openNightBoothInfoLength <= 2,
            'grid place-content-start grid-rows-2 grid-flow-col': openNightBoothInfoLength > 2,
          }"
        >
          <div
            v-for="nightBooth in openNightBoothInfo"
            :key="nightBooth.boothId"
            @click="handleClickMajorBox(nightBooth)"
            class="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0"
            v-bind="getNightBoothImage(nightBooth.boothImage)"
            :class="{
              'opacity-50': selectedBoothId && selectedBoothId !== nightBooth.boothId,
            }"
            :id="nightBooth.boothId"
          >
            <div class="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-700 via-30% opacity-50 rounded-3xl"></div>
              <div class="relative z-10">
                <h2 class="font-bold mb-0.5 break-keep">{{ nightBooth.adminName }}</h2>
                <h2 class="text-2xs">대기중인 팀 : {{ nightBooth.totalReservationNum }}</h2>
              </div>
            </div>

            <div
              v-if="selectedBoothId == nightBooth.boothId"
              class="absolute rounded-3xl border-4 border-primary top-0 left-0 dynamic-item"
            ></div>
          </div>
        </div>
        <div class="dynamic-width"></div>
      </div>
    </div>
    <div class="flex flex-row dynamic-padding justify-between gap-[10px] text-white font-bold mt-5 mb-20">
      <button
        class="h-[60px] rounded-10xl w-1/2"
        :class="
          selectedBoothId
            ? 'bg-white border-1 border-primary-900-light-68 text-primary-900 font-medium'
            : 'bg-secondary-100'
        "
        @click="handleClickDetailButton()"
      >
        자세히보기
      </button>
      <button
        class="h-[60px] rounded-10xl w-1/2"
        :class="selectedBoothId ? 'bg-primary-900' : 'bg-secondary-100'"
        @click="handleClickReserveButton()"
      >
        예약하기
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-item {
  width: calc(100vw * 190 / 430) !important;
  max-width: calc(500px * 190 / 430) !important;
  min-width: calc(375px * 190 / 430) !important;
  height: calc(100vw * 190 / 430) !important;
  max-height: calc(500px * 190 / 430) !important;
  min-height: calc(375px * 190 / 430) !important;
}

.dynamic-width {
  width: calc(100vw * 20 / 430) !important;
  max-width: calc(500px * 20 / 430) !important;
  flex-shrink: 0;
}

#reserve-container::-webkit-scrollbar {
  display: none;
}
#reserve-container {
  scrollbar-width: none;
}
</style>
