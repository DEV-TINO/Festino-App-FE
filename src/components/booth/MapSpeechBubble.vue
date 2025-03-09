<script setup>
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { boothMarkerData } = storeToRefs(useGetBoothDataStore());
</script>

<template>
  <div class="px-[18px] py-[11px] speech-bubble shadow-5xl flex flex-col justify-center">
		<div v-if="boothMarkerData?.boothId">
			<div 
				class="text-primary-900 font-semibold text-[11px] pb-1"
				:class="`${!boothMarkerData?.boothName.includes('총학생회') ? '' : 'flex justify-center items-center'}`"
			>
				{{ boothMarkerData?.adminCategory !== '편의시설' ? `${boothMarkerData.adminName}` : boothMarkerData.boothName }}{{ boothMarkerData?.adminCategory.includes('부스') ? ' 부스' : '' }}
			</div>
			<div v-if="boothMarkerData?.boothName.includes('총학생회')" class="w-full flex justify-center items-center">
				<div class="text-[8px] text-secondary-500 rounded-full w-fit h-fit px-4 py-[1px] flex items-center justify-center bg-instagram-bg gap-1">
					@22th_yoonseul
				</div>
      </div>
			<div v-if="!boothMarkerData?.boothName.includes('총학생회')" class="flex items-center">
				<div class="w-[10px] h-[10px] bg-[url('/icons/booth/location_on.svg')]"></div>
				<div class="text-[8px] pl-[2px] text-secondary-500">{{ boothMarkerData.location }}</div>
			</div>
			<div v-if="!boothMarkerData?.boothName.includes('총학생회')" class="flex items-center">
				<div class="w-[10px] h-[10px] bg-[url('/icons/booth/alarm.svg')]"></div>
				<div class="text-[8px] pl-[2px] text-secondary-500">{{ boothMarkerData.openTime }} ~ {{ boothMarkerData.closeTime }}</div>
			</div>
		</div>
		<div v-if="!boothMarkerData?.boothId" class="flex flex-col justify-center items-center">
			<div class="text-primary-900 font-semibold text-[11px]">부스 정보 미등록</div>
			<div class="bg-tino-error-half bg-cover w-[75px] h-[40px]"></div>
		</div>
  </div>
</template>

<style lang="css" scoped>
.speech-bubble {
  min-width: 150px;
  min-height: 75px;
	position: relative;
	background-color: #ffffff;
	border-radius: 17px;
}

.speech-bubble::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top-color: #ffffff;
	border-bottom: 0;
	margin-left: -10px;
	margin-bottom: -9px;
}
</style>
