<script setup>
import { useBaseModal } from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { storeToRefs } from 'pinia';

const { openModal } = useBaseModal();

const { selectedOrder } = storeToRefs(useOrderStore());
const props = defineProps({
  orderInfo: {
    type: Object,
    required: true,
  },
});

const orderStatus = [
  {
    text: '입금대기',
    color: 'bg-waiting',
    bgColor: 'bg-waiting-light',
  },
  {
    text: '조리중',
    color: 'bg-cooking',
    bgColor: 'bg-cooking-light',
  },
  {
    text: '조리완료',
    color: 'bg-prepared',
    bgColor: 'bg-prepared-light',
  },
  {
    text: '주문취소',
    color: 'bg-cancel',
    bgColor: 'bg-secondary-700-light-3',
  },
];

const createAt = props.orderInfo.createAt.slice(5, 16).replace('T', ' ').replaceAll('-', '/');

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

const handleClickRecipe = () => {
  selectedOrder.value = props.orderInfo;
  openModal('orderDetailModal');
};
</script>

<template>
  <div class="w-full flex flex-col p-4 rounded-3xl text-sm" :class="`${orderStatus[orderInfo.orderType].bgColor}`">
    <div class="flex flex-col w-full gap-3">
      <div
        class="min-h-9 h-fit flex justify-between w-full border-b-1 border-secondary-300 flex-wrap py-1 gap-x-[10px]"
      >
        <div class="flex gap-1 items-center">
          <img src="/icons/orders/map.svg" />
          <p>{{ orderInfo.adminName }} - {{ orderInfo.tableNum }}번 테이블</p>
        </div>
        <div class="flex gap-1 items-center">
          <img src="/icons/orders/clock.svg" />
          <p>{{ createAt }}</p>
          <img src="/icons/orders/recipe.svg" @click="handleClickRecipe()" />
        </div>
      </div>
      <div
        class="grid grid-cols-3 min-h-[17px] text-center break-keep"
        v-for="(menu, index) in orderInfo.menuInfo"
        :key="index"
      >
        <p class="text-left">
          {{ menu.menuName }}
        </p>
        <p>{{ menu.menuCount }}개</p>
        <p class="text-right">{{ formatPrice(menu.menuPrice) }}원</p>
      </div>
      <div class="flex justify-between h-[31px] items-center border-t-1 border-secondary-300">
        <p>총 가격</p>
        <p class="font-bold">{{ formatPrice(orderInfo.totalPrice) }}원</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
