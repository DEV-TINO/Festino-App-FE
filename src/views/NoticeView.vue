<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import NoticePage from '@/components/notice/NoticePage.vue';
import Header from '@/components/header/Header.vue';
import { useNoticeStore } from '@/stores/noticeStore.js';

const { getNotice } = useNoticeStore();
const { noticeData } = storeToRefs(useNoticeStore());
const { noticeId } = history.state;
const isDataLoaded = ref(false);

const router = useRouter();

const handleClickBackArrow = () => {
  router.push({ name: 'notification' });
};

const noticeDate = () => {
  const date = noticeData.value.updateAt.replace(/:/g, '-').replace('T', '-').split('-');
  return `${date[0]}.${date[1]}.${date[2]} ${date[3]}:${date[4]}`;
};

const convertNoticeTitle = (notice) => {
  if (notice.content.includes('총학생회')) return '총학생회 정보';
  else return notice.title;
};

onMounted(async () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  await getNotice(noticeId);
  isDataLoaded.value = true;
});
</script>

<template>
  <div class="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-16">
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
    <div v-if="isDataLoaded" class="flex flex-col py-5 gap-5 px-4 justify-center w-full">
      <div class="flex items-center justify-between px-2">
        <div class="font-medium break-words text-secondary-500">{{ convertNoticeTitle(noticeData) }}</div>
        <div class="text-xs text-secondary-300">{{ noticeDate() }}</div>
      </div>
      <NoticePage :noticeData="noticeData" />
    </div>
    <div class="py-30"></div>
  </div>
</template>

<style lang="css" scoped></style>
