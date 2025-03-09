<script setup>
import { ref, onMounted, watch } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import { useTimetableStore } from '@/stores/timetableStore';
import { storeToRefs } from 'pinia';

const { handleClickOpenModal } = useModalStore();
const { getClubTimetable } = useTimetableStore();
const { clubData, day } = storeToRefs(useTimetableStore());
const showData = ref([]);

const getImage = (data) => {
  return { backgroundImage: `url('${data.clubImage}')` }
};

const handleClickInstagram = () => {
  window.open(`https://www.instagram.com/22th_yoonseul/`, '_blank');
};

watch(() => day.value, async () => {
  await getClubTimetable();
  showData.value = clubData.value.showInfo;
});

onMounted(async () => {
  await getClubTimetable();
  showData.value = clubData.value.showInfo;
});
</script>

<template>
  <div
    class="w-full h-[162px] sm:h-[178px] bg-white rounded-3xl border-primary-900-light-68 border-1 flex justify-center select-none"
    v-bind="$attrs"
  >
    <div class="flex pt-4 w-full px-3 justify-evenly gap-1 overflow-x-auto reserve-container">
      <div class="flex flex-col items-center cursor-pointer px-1.5" v-for="show in showData" :key="show" @click="handleClickOpenModal(show)">
        <div :style="getImage(show)" class="border-2 border-primary-900-light-68 bg-cover bg-center w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"></div>
        <div class="text-xs font-normal pt-2">{{ show.showStartTime }}</div>
        <div class="text-primary-700 font-medium">{{ show.performer }}</div>
      </div>
      <div class="flex flex-col items-center cursor-pointer" @click="handleClickInstagram()">
        <div class="border-2 border-primary-900-light-68 bg-cover bg-center bg-talent-icon w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"></div>
        <div class="text-primary-700 font-medium pt-6">연예인 공연</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reserve-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.reserve-container::-webkit-scrollbar {
  display: none;
}
</style>
