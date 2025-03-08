<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNoticeStore } from '@/stores/noticeStore.js';
import { storeToRefs } from 'pinia';
import DateButtons from './DateButtons.vue';
import ShowPreview from '../timetable/ShowPreview.vue';
import SlideBanner from './SlideBanner.vue';
import MoreButton from './MoreButton.vue';

const { getMainNotice, timeAgo } = useNoticeStore();
const { mainNoticeData } = storeToRefs(useNoticeStore());

const timeTable = ref("타임테이블");
const notification = ref("공지사항");
const router = useRouter();

const handleClickNotice = async (noticeId) => {
  router.push({ path: `/notice/${noticeId}`, state: { noticeId } });
};

onMounted(() => {
  getMainNotice();
});
</script>

<template>
  <DateButtons />
  <MoreButton :componentName="timeTable" />
  <div class="px-5">
    <ShowPreview class="shadow-4xl" />
  </div>
  <MoreButton :componentName="notification" />
  <div class="px-5">
    <div v-if="mainNoticeData"
      class="py-3 select-none px-4 rounded-2xl border-primary-900-light-68 border-1 shadow-4xl flex justify-between items-center cursor-pointer"
      @click="handleClickNotice(mainNoticeData.noticeId)"
    >
      <div class="flex">
        <div class="w-[57px] text-secondary-700 text-xs font-medium">Festino</div>
        <div class="text-secondary-500 text-xs font-normal">{{ mainNoticeData.title }}</div>
      </div>
      <div class="text-secondary-700 text-2xs font-normal">{{ timeAgo(mainNoticeData.updateAt) }}</div>
    </div>
    <div v-else class="py-3 select-none px-4 rounded-2xl border-primary-900-light-68 border-1 shadow-4xl flex justify-between items-center">
      <div class="text-secondary-500 text-xs font-normal">공지사항을 불러오지 못했습니다</div>
    </div>
  </div>
  <div class="px-5 pt-5 pb-20">
    <SlideBanner class="border-primary-900-light-68 border"/>
  </div>
</template>

<style lang="css" scoped>
</style>
