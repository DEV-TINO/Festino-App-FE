<script setup>
import { watch } from 'vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore.js';
import { storeToRefs } from 'pinia';

const { convertBoothMenuTab } = useGetBoothDataStore();
const { selectBoothMenu } = storeToRefs(useGetBoothDataStore());

const MENU_ITEMS = [
  { id: 0, name: "전체" },
  { id: 1, name: "야간부스" },
  { id: 2, name: "주간부스" },
  { id: 3, name: "푸드트럭" },
  { id: 4, name: "편의시설" },
];

watch(selectBoothMenu, () => {
  handleScrollToSelectedCategory();
});

const handleScrollToSelectedCategory = () => {
  const container = document.getElementById('category-container');
  if (container) {
    const containerWidth = container.scrollWidth;
    let scrollLeft = 0;

    if (selectBoothMenu.value === 0) {
      scrollLeft = 0;
    } else if (selectBoothMenu.value === 4) {
      scrollLeft = container.scrollWidth - container.clientWidth;
    } else {
      const itemWidth = containerWidth / MENU_ITEMS.length;
      scrollLeft = itemWidth * selectBoothMenu.value;
    }

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
};
</script>

<template>
  <div 
    class="overflow-x-auto flex dynamic-booth-category-padding booth-menu"
    id="category-container"
  >
    <div v-for="(item, index) in MENU_ITEMS" :key="item.id">
      <div
        @click="convertBoothMenuTab(index)"
        class="w-[88px] h-[44px] mr-2 rounded-full flex justify-center items-center cursor-pointer"
        :class="{
          'border border-primary bg-primary-900 text-white': selectBoothMenu === index,
          'border border-primary-900-light text-primary-900-light': selectBoothMenu !== index,
        }"
        tabindex="0"
        :id="index"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-booth-category-padding {
  padding-left: calc(20 / 430 * 100%) !important;
  padding-bottom: 1.5rem;
  flex-shrink: 0;
}
</style>