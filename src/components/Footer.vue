<script setup>
import Home from './footers/HomeIcon.vue';
import TimeTableIcon from './footers/TimeTableIcon.vue';
import BoothIcon from './footers/BoothIcon.vue';
import TablingIcon from './footers/TablingIcon.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const ICON_URL_MAP = [
  { name: '홈', component: Home, width: '28px', router: 'main' },
  { name: '타임테이블', component: TimeTableIcon, url: '/icons/acute.svg', width: '44px', router: 'timetable' },
  { name: '부스', component: BoothIcon, url: '/icons/distance.svg', width: '28px', router: 'booth' },
  { name: '테이블링', component: TablingIcon, url: '/icons/hourglass_bottom.svg', width: '35px', router: 'reserve' },
];

const selectedFooterIndex = ref(-1);

watch(
  () => router.currentRoute.value,
  (currentRoute) => {
    const currentRouteName = currentRoute.name;
    if (currentRouteName === 'booth-detail') return (selectedFooterIndex.value = 2);
    if (currentRouteName === 'notification') return (selectedFooterIndex.value = 0);
    if (currentRouteName === 'notice') return (selectedFooterIndex.value = 0);

    const index = ICON_URL_MAP.findIndex((item) => item.router === currentRouteName);
    selectedFooterIndex.value = index;
  },
  { immediate: true },
);

const handleClickFooter = (index) => {
  selectedFooterIndex.value = index;
  router.push({ name: ICON_URL_MAP[index].router });
};
</script>
<template>
  <div
    class="z-30 w-full h-[60px] bg-white flex items-center justify-around fixed bottom-0 border-t-secondary-100 border-t-1"
  >
    <div
      class="flex flex-col items-center justify-center cursor-pointer"
      v-for="(item, index) in ICON_URL_MAP"
      :class="`w-[${item.width}]`"
      @click="handleClickFooter(index)"
    >
      <component :is="item.component" :isActive="index === selectedFooterIndex" />
      <div class="text-2xs" :class="index === selectedFooterIndex ? 'text-primary-900' : 'text-secondary-100'">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
