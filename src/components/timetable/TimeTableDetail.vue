<script setup>
import { useModalStore } from '@/stores/modalStore.js';

const { handleClickOpenModal } = useModalStore();

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
});

const handleClickOpenClubModal = () => {
  handleClickOpenModal(props.data);
};

const isShowing = (isShowing) => {
  if(isShowing) return 'border-primary-900-light-68 text-primary-700'
  else return 'bg-secondary-50 border-secondary-100 text-secondary-100'
};

const getImage = () => {
  return { backgroundImage: `url('${props.data.clubImage}')` };
};
</script>

<template>
  <div class="cursor-pointer flex py-5 rounded-3xl w-[170px] xs:w-[210px] sm:w-[230px] border-2 flex-col items-center gap-2.5 shadow-4xl "
    :class="isShowing(data.isShowing)">
    <div class="rounded-full bg-primary-700 w-9 h-9 border-2 border-primary-900-light-68 bg-cover bg-center"
    :style="getImage()"></div>
    <div class="text-center leading-none">
      <div>교내 </div>
      <div>' {{ data.performer }} '</div>
    </div>
    <button @click="handleClickOpenClubModal()" class="text-white bg-primary-700 w-[120px] h-[30px] rounded-full text-xs">공연 정보 상세보기</button>
  </div>
</template>

<style lang="css" scoped>
</style>
