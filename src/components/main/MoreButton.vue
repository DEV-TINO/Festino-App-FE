<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(["componentName"]);
const isMoreButton = ref(true);

const handleClickMoreButton = (name) => {
  if (name == "타임테이블") router.push({ name: "timetable", state: { isMoreButton } });
  else if (name == "공지사항") router.push({ name: "notification"});
  else return;
};
</script>

<template>
  <div class="flex justify-between items-center px-5 pb-3 select-none">
    <div class="text-xl font-semibold">{{ componentName }}</div>
    <div class="flex items-center gap-0.5 cursor-pointer" @click="handleClickMoreButton(componentName)">
      <div class="text-secondary-300 text-xs">더보기</div>
      <div class="w-[12px] h-[12px] bg-more-arrow bg-center bg-no-repeat bg-[length:12px_12px]"></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
</style>
