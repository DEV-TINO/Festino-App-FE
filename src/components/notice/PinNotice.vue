<script setup>
import { useRouter } from 'vue-router';
import { useNoticeStore } from '@/stores/noticeStore.js';

const { timeAgo } = useNoticeStore();

const router = useRouter();
const props = defineProps({
  notice: {
    type: Object,
    required: true,
  },
});

const handleClickNotice = async (noticeId) => {
  router.push({ path: `/notice/${noticeId}`, state: { noticeId } });
};
</script>

<template>
  <div v-if="notice"
    class="w-full h-auto flex flex-row bg-white rounded-3xl border-primary-900-light-68 border-1 justify-between items-center cursor-pointer select-none mt-5"
    @click="handleClickNotice(notice.noticeId)"
  >
    <div class="flex pl-4 items-center py-3 gap-[12px]">
      <div class="w-[20px] h-[20px] bg-center bg-pin-icon bg-no-repeat bg-[length:20px_20px]"></div>
      <div class="py-1 text-base font-normal text-primary-700 leading-tight">{{ notice.title }}</div>
    </div>
    <div class="flex justify-end pr-4 text-xs font-normal text-secondary-500 w-[140px]">
      {{ timeAgo(notice.updateAt) }}
    </div>
  </div>
</template>

<style lang="css" scoped></style>
