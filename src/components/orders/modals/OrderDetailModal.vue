<script setup>
import { useBaseModal } from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { formatPrice, prettyPhoneNum } from '@/utils/utils';
import { storeToRefs } from 'pinia';

const { closeModal } = useBaseModal();

const { selectedOrder, recentName, recentPhoneNum, accountInfo } = storeToRefs(useOrderStore());

const clipAccount = () => {
  window.navigator.clipboard.writeText(accountInfo.value?.account);
  alert('계좌번호가 복사되었습니다.');
};
</script>
<template>
  <div
    class="relative col-start-2 row-start-2 dynamic-width bg-white rounded-3xl flex flex-col items-center px-[21px] py-7 max-h-full overflow-y-auto"
    @click.stop=""
  >
    <div class="text-secondary-700 text-xl font-semibold mb-5">주문 확인서</div>

    <div class="flex-grow overflow-y-auto w-full flex flex-col gap-5 overflow-x-hidden">
      <div class="w-full gap-1 flex flex-col">
        <div class="font-semibold text-secondary-700">주문하기</div>
        <div class="w-full rounded-xl bg-primary-900-light-6 p-4">
          <div
            v-for="menu in selectedOrder.menuInfo"
            :key="menu.menuId"
            class="grid grid-cols-3 pb-[12px] text-secondary-700 text-sm"
          >
            <div class="text-left text-wrap">{{ menu.menuName }}</div>
            <div class="text-center">{{ menu.menuCount }}개</div>
            <div class="text-right">{{ formatPrice(menu.menuPrice) }}원</div>
          </div>
          <div class="w-full border-secondary-300 border-1"></div>
          <div class="pt-[10px] pb-[4px] flex justify-between text-sm text-secondary-700">
            <div>총 가격</div>
            <div>{{ formatPrice(selectedOrder.totalPrice) }}원</div>
          </div>
        </div>
      </div>
      <div class="w-full gap-1">
        <div class="font-semibold text-secondary-700 mb-1">주문자 정보</div>
        <div class="w-full rounded-xl bg-primary-900-light-6 p-4 flex flex-col gap-3 text-secondary-500 text-sm">
          <div class="flex justify-between">
            <div>입금자명</div>
            <div>{{ recentName }}</div>
          </div>
          <div class="flex justify-between">
            <div>전화번호</div>
            <div>{{ prettyPhoneNum(recentPhoneNum) }}</div>
          </div>
        </div>
      </div>

      <div class="w-full gap-1">
        <div class="font-semibold text-secondary-700 mb-1">결제 정보 확인</div>
        <div class="w-full rounded-xl bg-primary-900-light-6 p-4">
          <div class="font-bold flex pb-[12px] justify-between text-secondary-500">
            <div class="text-sm">{{ accountInfo.bankName }}</div>
            <div class="flex gap-[8px] items-center cursor-pointer" @click="clipAccount()">
              <div class="text-sm">{{ accountInfo.account }}</div>
              <div class="w-[16px] h-[16px] bg-center bg-board-icon bg-no-repeat bg-[length:16px_16px]"></div>
            </div>
          </div>
          <div class="flex pb-[12px] justify-between text-secondary-500">
            <div class="text-sm">예금주</div>
            <div class="text-sm">{{ accountInfo.accountHolder }}님</div>
          </div>
          <div class="w-full border-secondary-300 border-1"></div>
          <div class="pt-[10px] pb-[4px] flex justify-between text-sm text-secondary-500">
            <div>총 가격</div>
            <div>{{ formatPrice(selectedOrder.totalPrice) }}원</div>
          </div>
        </div>
      </div>

      <div class="w-full gap-1">
        <div class="font-semibold text-secondary-700 mb-1">메모</div>
        <div class="min-h-[63px] h-full rounded-3xl border-2 border-secondary-50-light p-4 text-xs text-secondary-700">
          {{ selectedOrder.note === '' ? '메모가 없습니다.' : selectedOrder.note }}
        </div>
      </div>

      <button
        class="w-full h-11 rounded-3xl bg-primary-900 text-white font-semibold flex-shrink-0"
        @click="closeModal()"
      >
        닫기
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-width {
  width: calc(390 / 430 * 100%) !important;
}
</style>
