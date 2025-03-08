<script setup>
import { useBaseModal } from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watchEffect } from 'vue';
import { formatPrice, prettyPhoneNum } from '@/utils/utils';

const { boothId, tableNum, totalPrice, userName, phoneNum, userOrderList, isCoupon, accountInfo, note } = storeToRefs(
  useOrderStore(),
);
const { saveOrder, getAccountInfo } = useOrderStore();
const { closeModal } = useBaseModal();

const orderMenus = ref([]);
const isSame = ref(false);
const isDone = ref(false);
const isSumbit = ref(false);

const handleClickConfirmDepositButton = async () => {
  if (!isSame.value || !isDone.value || isSumbit.value) return;
  console.log(isSumbit);
  isSumbit.value = true;
  await saveOrder({
    boothId: boothId.value,
    tableNum: Number(tableNum.value),
    userName: userName.value,
    phoneNum: phoneNum.value,
    menuInfo: orderMenus.value,
    totalPrice: totalPrice.value,
    isCoupon: isCoupon.value,
    note: note.value,
  });
  isSumbit.value = false;
};

const clipAccount = () => {
  window.navigator.clipboard.writeText(accountInfo.value?.account);
  alert('계좌번호가 복사되었습니다.');
};

const handleClickSameCheckBox = () => {
  isSame.value = !isSame.value;
};
const handleClickDoneCheckBox = () => {
  isDone.value = !isDone.value;
};

watchEffect(() => {
  if (userOrderList.value) {
    orderMenus.value = userOrderList.value.filter((orderInfo) => orderInfo.menuCount > 0);
  }
});

onMounted(() => {
  getAccountInfo();
});
</script>

<template>
  <div
    class="relative col-start-2 row-start-2 h-full min-w-[346px] dynamic-width bg-white rounded-3xl flex flex-col items-center px-[21px] py-7 gap-5"
    @click.stop=""
  >
    <div class="font-semibold text-xl text-secondary-700">주문 확인서</div>
    <div class="w-full gap-1">
      <div class="font-semibold text-secondary-700 mb-1">주문자 정보</div>
      <div class="w-full rounded-xl bg-primary-900-light-12 p-4 flex flex-col gap-3 text-secondary-500 text-sm">
        <div class="flex justify-between">
          <div>입금자명</div>
          <div>{{ userName }}</div>
        </div>
        <div class="flex justify-between">
          <div>전화번호</div>
          <div>{{ prettyPhoneNum(phoneNum) }}</div>
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
          <div>{{ formatPrice(totalPrice) }}원</div>
        </div>
      </div>
    </div>

    <div class="text-xs text-secondary-500 flex flex-col items-start w-full">
      <label for="same-checkbox" class="flex mb-2">
        <input
          @click.stop="handleClickSameCheckBox()"
          id="same-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 mr-2 text-primary-900 bg-gray-100 border-gray-300 rounded-4xl focus:ring-primary-900 focus:ring-offset-1 focus:ring-1 focus:rounded-3xl"
        />
        입금자명과 주문자명을 확인해주세요. <span class="text-danger">&nbsp; (필수)</span>
      </label>
      <label for="done-checkbox" class="flex mb-4">
        <input
          @click.stop="handleClickDoneCheckBox()"
          id="done-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 mr-2 text-primary-900 bg-gray-100 border-gray-300 rounded-4xl focus:ring-primary-900 focus:ring-offset-1 focus:ring-1 focus:rounded-3xl"
        />
        입금 후 입금 완료 버튼을 눌러주세요. <span class="text-danger">&nbsp; (필수)</span>
      </label>
      <div class="text-danger text-center w-full">입금 미확인 시 주문이 취소될 수 있습니다.</div>
    </div>

    <div class="gap-5 w-full flex font-bold">
      <button
        class="w-full h-[42px] flex justify-center items-center border-2 border-primary-700 rounded-3xl text-primary-700"
        @click="closeModal()"
      >
        취소
      </button>
      <button
        :disabled="!isSame || !isDone"
        :class="{
          'bg-primary-700 border-2 border-primary-700': isSame && isDone,
          'bg-secondary-100': !isSame || !isDone,
        }"
        class="w-full h-[42px] flex justify-center items-center text-white rounded-3xl"
        @click="handleClickConfirmDepositButton()"
      >
        입금 완료
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-modal-width {
  width: calc(346 / 430 * 100%) !important;
}
</style>
