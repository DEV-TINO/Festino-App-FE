<script setup></script>

<template>
  <div class="relative">
    <div class="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-banner bg-no-repeat bg-cover z-1">
      <div class="drop-shadow-title absolute w-auto h-auto top-[60px] xs:dynamic-top dynamic-padding sm:top-[72px]">
        <div
          class="text-white font-jalnan2 text-xs"
        >
          티노와 함께
        </div>
        <div
          class="text-white font-jalnan2 text-3xl"
        >
          동아리 부스 알아보기
        </div>
      </div>
    </div>
    <div class="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
  </div>
</template>

<style lang="css" scoped>
.dynamic-top {
  top: calc(52 / 230 * 100%) !important;
}
</style>
