<script setup>
import OrderMainBanner from '@/components/orders/OrderMainBanner.vue';
import { useOrderStore } from '@/stores/orders/orderStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const orderStore = useOrderStore();
const { resetOrderInfo, setBoothInfo, isUUID } = orderStore;
const { customTableNum } = storeToRefs(orderStore);
const route = useRoute();
const router = useRouter();

const handleClickFestinoButton = () => {
  router.push({ name: 'main' });
};

const handleClickOrderSearchButton = () => {
  router.push({ name: 'order-search', params: { boothId: route.params.boothId } });
};

const handleClickPayment = () => {
  router.push({ name: 'order-payment', params: { boothId: route.params.boothId } });
};

onMounted(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (!isUUID(route.params.boothId) || isNaN(route.params.tableNum)) {
    return router.push({ name: 'error', params: { page: 'NotFound' } });
  }
  setBoothInfo(route.params.boothId, route.params.tableNum);
  resetOrderInfo();
});
</script>
<template>
  <div class="flex flex-col">
    <OrderMainBanner />
    <div class="w-full rounded-t-3xl bg-white pt-[25px] flex flex-col items-center -translate-y-12">
      <div
        class="h-11 rounded-10xl bg-primary-900-light-12 font-semibold text-primary-900 shrink-0 grid place-items-center px-6"
      >
        테이블 번호 {{ customTableNum }}
      </div>
      <div class="py-11 flex flex-col w-full px-2 gap-y-11 h-full">
        <div class="flex flex-row justify-evenly gap-x-2">
          <div
            @click="handleClickPayment()"
            class="h-[280px] w-[190px] min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow-xs overflow-clip cursor-pointer"
          >
            <div class="font-jalnan2 text-2xl text-primary-900 pt-5">주문하기</div>
            <img src="/icons/orders/orderIcon.svg" />
          </div>
          <div
            class="h-[280px] w-[190px] min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow-xs cursor-pointer"
            @click="handleClickOrderSearchButton()"
          >
            <div class="font-jalnan2 text-2xl text-primary-900 pt-5">주문조회</div>
            <img src="/icons/orders/orderSearch.svg" />
          </div>
        </div>
        <div class="relative">
          <img
            src="/images/orders/tino-order-main.png"
            class="w-full h-full cursor-pointer"
            @click="handleClickFestinoButton()"
          />
          <div class="absolute flex flex-col top-[8px] items-end pointer-events-none xs:right-[40px] right-[20px]">
            <div class="text-white font-jalnan2 text-xs pt-[20px]">2024 한국공학대학교 축제의 모든 것을 한눈에!</div>
            <div
              class="bg-gradient-to-t from-white-opacity from-20% to-white text-transparent to-100% bg-clip-text font-jalnan2 text-2xl"
            >
              ‘한국공대 축제’
            </div>
            <button class="border-2 border-white w-[155px] h-[26px] text-white font-bold text-xs rounded-3.5xl mt-1">
              페스티노 사이트 바로가기 ->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
