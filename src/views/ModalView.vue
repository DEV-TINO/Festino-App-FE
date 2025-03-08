<script setup>
import ModalBackground from '@/components/modals/ModalBackground.vue';
import CompleteReserveModal from '@/components/tablings/modals/CompleteReserveModal.vue';
import DuplicateModal from '@/components/tablings/modals/DuplicateModal.vue';
import EnterBoothModal from '@/components/tablings/modals/EnterBoothModal.vue';
import FailReservationModal from '@/components/tablings/modals/FailReservationModal.vue';
import LoadingModal from '@/components/tablings/modals/LoadingModal.vue';
import MessageFailModal from '@/components/tablings/modals/MessageFailModal.vue';
import NoReserveModal from '@/components/tablings/modals/NoReserveModal.vue';
import ReservationModal from '@/components/tablings/modals/ReservationModal.vue';
import SearchReservationModal from '@/components/tablings/modals/SearchReservationModal.vue';
import ClubModal from '@/components/timetable/ClubModal.vue';
import { useBaseModal } from '@/stores/baseModal';
import { storeToRefs } from 'pinia';
import OrderModal from '@/components/orders/modals/OrderModal.vue';
import OrderCheckModal from '@/components/orders/modals/OrderCheckModal.vue';
import OrderCompleteModal from '@/components/orders/modals/OrderCompleteModal.vue';
import NotExistOrderModal from '@/components/orders/modals/NotExistOrderModal.vue';
import OrderDetailModal from '@/components/orders/modals/OrderDetailModal.vue';
import TablingPreventModal from '@/components/tablings/modals/TablingPreventModal.vue';

const baseModalStore = useBaseModal();
const { isModalOpen, modalType } = storeToRefs(baseModalStore);
</script>
<template>
  <ModalBackground v-if="isModalOpen">
    <!-- Reservation -->
    <ReservationModal v-if="modalType === 'reserveModal'" />
    <SearchReservationModal v-if="modalType === 'searchReserveModal'" />
    <EnterBoothModal v-if="modalType === 'enterBoothModal'" />
    <NoReserveModal v-if="modalType === 'noReserveModal'" />
    <DuplicateModal v-if="modalType === 'duplicateModal'" />
    <MessageFailModal v-if="modalType === 'messageFailModal'" />
    <CompleteReserveModal v-if="modalType === 'completeReserveModal'" />
    <FailReservationModal v-if="modalType === 'failReservationModal'" />
    <TablingPreventModal v-if="modalType === 'tablingPreventModal'" />
    <!-- Loading -->
    <LoadingModal v-if="modalType === 'loadingModal'" />
    <!--Timetable -->
    <ClubModal v-if="modalType === 'clubModal'" />
    <!-- Order -->
    <OrderModal v-if="modalType === 'orderModal'" />
    <OrderCheckModal v-if="modalType === 'orderCheckModal'" />
    <OrderCompleteModal v-if="modalType === 'orderCompleteModal'" />
    <NotExistOrderModal v-if="modalType === 'notExistOrderModal'" />
    <OrderDetailModal v-if="modalType === 'orderDetailModal'" />
  </ModalBackground>
</template>

<style lang="scss" scoped></style>
