<script setup>
import { onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useNoticeStore } from '@/stores/noticeStore.js';
import PinNotice from '@/components/notice/PinNotice.vue';
import Notice from '@/components/notice/Notice.vue';
import Header from '@/components/header/Header.vue';

const { pinNotices, notices, allNotices } = storeToRefs(useNoticeStore());
const { getAllNotice } = useNoticeStore();

const router = useRouter();

const handleClickBackArrow = () => {
  router.push({ name: 'main' });
};

const convertNotice = (notices) => {
  if (!notices) return [];
  if (notices.length === 0) return [];

  let saveNotice = null;
  return [
    ...notices
      .map((notice) => {
        if (notice.content.includes('총학생회')) {
          if (saveNotice === null) {
            saveNotice = { ...notice, title: '총학생회 정보' };
          }
        } else {
          return notice;
        }
      })
      .filter((notice) => notice !== undefined),
    saveNotice,
  ];
};

onMounted(async () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  getAllNotice();
});
</script>

<template>
  <div class="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-20">
    <Header />
    <div
      class="flex flex-row w-full h-[48px] text-secondary-700 bg-white justify-center items-center font-medium text-xl relative"
    >
      <div
        class="w-[28px] h-[28px] bg-back-arrow bg-cover bg-no-repeat absolute left-[24px] cursor-pointer"
        @click="handleClickBackArrow()"
      ></div>
      <div>공지사항</div>
    </div>
    <div v-if="convertNotice(allNotices) == 0" class="flex flex-col items-center gap-4 pt-14">
      <div class="bg-tino-error bg-cover bg-center w-[264px] h-[244px]"></div>
      <div>공지사항을 불러오지 못했습니다</div>
    </div>
    <div v-for="notice in convertNotice(pinNotices)" :key="notice" class="px-4 flex justify-center w-full">
      <PinNotice class="shadow-4xl" :notice="notice" />
    </div>
    <div v-for="notice in convertNotice(notices)" :key="notice" class="px-4 flex justify-center w-full">
      <Notice class="shadow-4xl" :notice="notice" />
    </div>
  </div>
</template>

<style scoped></style>
