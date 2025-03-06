<script setup>
import { onMounted } from 'vue';
import { useTimetableStore } from '@/stores/timetableStore';
import { storeToRefs } from 'pinia';

const { changeDate } = useTimetableStore();
const { day } = storeToRefs(useTimetableStore());
const { isMoreButton } = history.state;

const handleClickDateButton = async (index) => {
  if (day.value === index) {
    return;
  }
  changeDate(index);
};

const defineButtonDate = () => {
  const date = new Date();
  if (date.getMonth() + 1 < 9) changeDate(1);
  else if (date.getMonth() > 9) changeDate(3);
  else if (date.getDate() <= 11) changeDate(1);
  else if (date.getDate() >= 13) changeDate(3);
  else if (date.getDate() == 12) changeDate(2);
};

onMounted(() => {
  if (!isMoreButton) defineButtonDate();
});
</script>

<template>
  <div class="flex px-5 justify-between z-50 select-none">
    <div v-for="date in 3" :key="date">
      <div
        class="flex justify-center gap-2 w-[105px] xs:gap-4 xs:w-[122px] sm:gap-5 sm:w-[140px] py-2.5 px-0.5 rounded-full shadow-4xl text-xs items-center cursor-pointer"
        :class="
          day == date
            ? 'bg-primary-900 text-white font-bold'
            : 'text-primary-900 font-normal border-primary border-1'
        "
        @click="handleClickDateButton(date)"
      >
        <div>DAY {{ date }}</div>
        <div>24.09.{{ date + 10 }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
