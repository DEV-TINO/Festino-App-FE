<script setup>
import { ref, onMounted, watch, watchEffect, nextTick, computed } from 'vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';
import MapSpeechBubble from './MapSpeechBubble.vue';
import { useRouter, useRoute } from 'vue-router';

const { convertBoothMenuTab, getBoothData } = useGetBoothDataStore();
const {
  selectBoothMenu,
  selectedTicketBooth,
  allBoothList,
  boothMarkerData,
  nightBoothList,
  dayBoothList,
  foodBoothList,
  facilityList,
  booth,
} = storeToRefs(useGetBoothDataStore());

const router = useRouter();
const route = useRoute();

const zoomLevel = ref(1);
const containerRef = ref(null);
const imageLoaded = ref(false);
const isBoothDetail = ref(false);

const currentRoute = ref(router.currentRoute.value);
const currentRouteName = ref(currentRoute.value.name);

isBoothDetail.value = currentRouteName == 'booth-detail';

// 축제
// const markers = ref({
//   more: [
//     // { left: 160, bottom: 120, count: 14, tab: 1 },
//     { left: 425, bottom: 240, count: 21, tab: 2 },
//     // { left: 100, bottom: 280, count: 13, tab: 3 },
//     // { left: 100, bottom: 350, count: 4, tab: 4 },
//     // { left: 290, bottom: 320, count: 2, tab: 5 },
//   ],
//   detail: {
//     smoke: [
//       { markerNum: 77, left: 150, bottom: 430, scrollLeft: 235, scrollTop: 0 }, // 팁 뒤
//       { markerNum: 78, left: 30, bottom: 175, scrollLeft: 0, scrollTop: 580 }, // 운동장 구석
//     ],
//     store: [
//       { markerNum: 75, left: 150, bottom: 370, scrollLeft: 235, scrollTop: 90 }, // 종관
//       { markerNum: 76, left: 500, bottom: 367, scrollLeft: 1200, scrollTop: 110 }, // GS
//     ],
//     toilet: [
//       { markerNum: 71, left: 150, bottom: 350, scrollLeft: 235, scrollTop: 90 },
//       { markerNum: 72, left: 70, bottom: 350, scrollLeft: 20, scrollTop: 130 },
//       { markerNum: 73, left: 520, bottom: 367, scrollLeft: 1200, scrollTop: 110 },
//       { markerNum: 74, left: 440, bottom: 367, scrollLeft: 970, scrollTop: 110 },
//       // 마커 정보 추가 후 수정
//     ],
//     general: [
//       // 총학 이벤트 추가되면 활성화
//       { markerNum: 92, left: 420, bottom: 340, scrollLeft: 925, scrollTop: 170 },
//       { markerNum: 21, left: 476, bottom: 310, scrollLeft: 1065, scrollTop: 240 },
//       { markerNum: 93, left: 476, bottom: 250, scrollLeft: 1065, scrollTop: 390 },
//     ],
//     ticket: [
//       //총학 티켓
//       // { markerNum: 91, left: 302, bottom: 325, scrollLeft: 620, scrollTop: 200 },
//       // { markerNum: 94, left: 360, bottom: 280, scrollLeft: 750, scrollTop: 300 },
//     ],
//     alcohol: [
//       { markerNum: 95, left: 50, bottom: 85, scrollLeft: 0, scrollTop: 820 },
//       // { markerNum: 96, left: 50, bottom: 175, scrollLeft: 0, scrollTop: 580 },
//     ],
//     music: [{ markerNum: 27, left: 420, bottom: 235, scrollLeft: 920, scrollTop: 410 }],
//     join: [
//       // B동 앞
//       { markerNum: 21, left: 385, bottom: 310, scrollLeft: 835, scrollTop: 240 },
//       { markerNum: 22, left: 405, bottom: 310, scrollLeft: 890, scrollTop: 240 },
//       // B동이랑 벙커 사이 통로
//       { markerNum: 23, left: 420, bottom: 300, scrollLeft: 925, scrollTop: 270 },
//       { markerNum: 24, left: 440, bottom: 285, scrollLeft: 970, scrollTop: 310 },
//       { markerNum: 25, left: 420, bottom: 270, scrollLeft: 925, scrollTop: 340 },
//       { markerNum: 26, left: 440, bottom: 255, scrollLeft: 970, scrollTop: 370 },
//       { markerNum: 28, left: 440, bottom: 220, scrollLeft: 970, scrollTop: 480 },
//       { markerNum: 29, left: 420, bottom: 205, scrollLeft: 925, scrollTop: 490 },
//       { markerNum: 30, left: 440, bottom: 190, scrollLeft: 970, scrollTop: 540 },
//       { markerNum: 36, left: 528, bottom: 300, scrollLeft: 1200, scrollTop: 270 },
//       { markerNum: 35, left: 510, bottom: 280, scrollLeft: 1200, scrollTop: 310 },
//       { markerNum: 34, left: 528, bottom: 235, scrollLeft: 1200, scrollTop: 450 },
//       { markerNum: 33, left: 510, bottom: 220, scrollLeft: 1200, scrollTop: 470 },
//       { markerNum: 32, left: 528, bottom: 205, scrollLeft: 1200, scrollTop: 510 },
//       { markerNum: 31, left: 510, bottom: 190, scrollLeft: 1200, scrollTop: 530 },
//       // { markerNum: 32, left: 532, bottom: 280, scrollLeft: 1200, scrollTop: 310 },
//       // { markerNum: 32, left: 532, bottom: 280, scrollLeft: 1200, scrollTop: 310 },
//     ],
//     food: [
//       // 야간부스
//       // { markerNum: 1, left: 145, bottom: 175, scrollLeft: 220, scrollTop: 580 },
//       // { markerNum: 2, left: 120, bottom: 175, scrollLeft: 160, scrollTop: 580 },
//       // { markerNum: 3, left: 95, bottom: 175, scrollLeft: 90, scrollTop: 580 },
//       // { markerNum: 4, left: 70, bottom: 175, scrollLeft: 20, scrollTop: 580 },
//       // { markerNum: 5, left: 50, bottom: 155, scrollLeft: 0, scrollTop: 620 },
//       // { markerNum: 6, left: 50, bottom: 130, scrollLeft: 0, scrollTop: 690 },
//       // { markerNum: 7, left: 50, bottom: 105, scrollLeft: 0, scrollTop: 760 },
//       // { markerNum: 12, left: 170, bottom: 85, scrollLeft: 290, scrollTop: 820 },
//       // { markerNum: 11, left: 145, bottom: 85, scrollLeft: 220, scrollTop: 820 },
//       // { markerNum: 10, left: 120, bottom: 85, scrollLeft: 160, scrollTop: 820 },
//       // { markerNum: 9, left: 95, bottom: 85, scrollLeft: 90, scrollTop: 820 },
//       // { markerNum: 8, left: 70, bottom: 85, scrollLeft: 20, scrollTop: 820 },
//       // 주간부스
//       // 푸드트럭
//       { markerNum: 51, left: 20, bottom: 290, scrollLeft: 0, scrollTop: 300 },
//       { markerNum: 52, left: 40, bottom: 280, scrollLeft: 0, scrollTop: 300 },
//       { markerNum: 53, left: 60, bottom: 290, scrollLeft: 0, scrollTop: 300 },
//       { markerNum: 54, left: 80, bottom: 280, scrollLeft: 45, scrollTop: 300 },
//       { markerNum: 55, left: 100, bottom: 290, scrollLeft: 90, scrollTop: 300 },
//       { markerNum: 56, left: 120, bottom: 280, scrollLeft: 150, scrollTop: 300 },
//       { markerNum: 57, left: 140, bottom: 290, scrollLeft: 200, scrollTop: 300 },
//       { markerNum: 58, left: 160, bottom: 280, scrollLeft: 250, scrollTop: 300 },
//       { markerNum: 59, left: 180, bottom: 290, scrollLeft: 300, scrollTop: 300 },
//       { markerNum: 60, left: 200, bottom: 280, scrollLeft: 350, scrollTop: 300 },
//       { markerNum: 61, left: 220, bottom: 290, scrollLeft: 400, scrollTop: 300 },
//       { markerNum: 62, left: 240, bottom: 280, scrollLeft: 450, scrollTop: 300 },
//       { markerNum: 63, left: 260, bottom: 290, scrollLeft: 500, scrollTop: 300 },
//     ],
//     // alcohol: [
//     //   { markerNum: 95, left: 50, bottom: 85, scrollLeft: 0, scrollTop: 820 },
//     //   { markerNum: 96, left: 50, bottom: 175, scrollLeft: 0, scrollTop: 580 },
//     // ],
//   },
// });

// 동아리 홍보전
const markers = ref({
  more: [
    { left: 425, bottom: 240, count: 26, tab: 2 },
  ],
  detail: {
    smoke: [
      { markerNum: 77, left: 150, bottom: 430, scrollLeft: 235, scrollTop: 0 }, // 팁 뒤
      { markerNum: 78, left: 30, bottom: 175, scrollLeft: 0, scrollTop: 580 }, // 운동장 구석
    ],
    store: [
      { markerNum: 75, left: 150, bottom: 370, scrollLeft: 235, scrollTop: 90 }, // 종관
      { markerNum: 76, left: 500, bottom: 367, scrollLeft: 1200, scrollTop: 110 }, // GS
    ],
    toilet: [
      { markerNum: 71, left: 150, bottom: 350, scrollLeft: 235, scrollTop: 90 },
      { markerNum: 72, left: 70, bottom: 350, scrollLeft: 20, scrollTop: 130 },
      { markerNum: 73, left: 520, bottom: 367, scrollLeft: 1200, scrollTop: 110 },
      { markerNum: 74, left: 440, bottom: 367, scrollLeft: 970, scrollTop: 110 },
    ],
    general: [
      // 동아리 연합회
      { markerNum: 21, left: 476, bottom: 310, scrollLeft: 1065, scrollTop: 240 },
    ],
    join: [
      // 암벽 앞
      { markerNum: 27, left: 375, bottom: 390, scrollLeft: 817, scrollTop: 80 },
      { markerNum: 28, left: 375, bottom: 370, scrollLeft: 817, scrollTop: 130 },
      { markerNum: 29, left: 375, bottom: 350, scrollLeft: 817, scrollTop: 160 },
      // 체육관 옆
      { markerNum: 24, left: 335, bottom: 390, scrollLeft: 730, scrollTop: 80 },
      { markerNum: 25, left: 335, bottom: 365, scrollLeft: 730, scrollTop: 140 },
      { markerNum: 26, left: 335, bottom: 340, scrollLeft: 730, scrollTop: 190 },
      // 체육관 앞
      { markerNum: 22, left: 290, bottom: 330, scrollLeft: 600, scrollTop: 210 },
      // 체육관
      { markerNum: 23, left: 303, bottom: 375, scrollLeft: 650, scrollTop: 120 },
      // 종합관
      { markerNum: 33, left: 520, bottom: 350, scrollLeft: 1200, scrollTop: 160 },
      { markerNum: 32, left: 440, bottom: 350, scrollLeft: 970, scrollTop: 160 },
      // B동 앞
      { markerNum: 35, left: 387, bottom: 310, scrollLeft: 840, scrollTop: 250 },
      { markerNum: 34, left: 405, bottom: 310, scrollLeft: 890, scrollTop: 250 },
      // B동 앞 맞은 편
      { markerNum: 30, left: 387, bottom: 340, scrollLeft: 840, scrollTop: 200 },
      { markerNum: 31, left: 405, bottom: 340, scrollLeft: 890, scrollTop: 200 },
      // B동이랑 벙커 사이 통로
      { markerNum: 39, left: 440, bottom: 305, scrollLeft: 970, scrollTop: 260 },
      { markerNum: 36, left: 420, bottom: 295, scrollLeft: 925, scrollTop: 270 },
      { markerNum: 40, left: 440, bottom: 285, scrollLeft: 970, scrollTop: 340 },
      { markerNum: 37, left: 420, bottom: 275, scrollLeft: 925, scrollTop: 355 },
      { markerNum: 41, left: 440, bottom: 265, scrollLeft: 970, scrollTop: 370 },
      { markerNum: 38, left: 420, bottom: 255, scrollLeft: 925, scrollTop: 380 },
      // C동과 벙커 사이 통로
      { markerNum: 42, left: 510, bottom: 305, scrollLeft: 1200, scrollTop: 260 },
      { markerNum: 45, left: 528, bottom: 295, scrollLeft: 1200, scrollTop: 270 },
      { markerNum: 43, left: 510, bottom: 285, scrollLeft: 1200, scrollTop: 340 },
      { markerNum: 46, left: 528, bottom: 275, scrollLeft: 1200, scrollTop: 355 },
      { markerNum: 44, left: 510, bottom: 265, scrollLeft: 1200, scrollTop: 370 },
      // C동 중 행정동에 가까운 위치
      { markerNum: 47, left: 528, bottom: 245, scrollLeft: 1200, scrollTop: 450 },
      { markerNum: 48, left: 528, bottom: 225, scrollLeft: 1200, scrollTop: 470 },
      { markerNum: 49, left: 528, bottom: 205, scrollLeft: 1200, scrollTop: 510 },
    ],
    food: [
      // 주간부스
      // 푸드트럭
      { markerNum: 51, left: 420, bottom: 227, scrollLeft: 925, scrollTop: 470 },
      { markerNum: 52, left: 420, bottom: 207, scrollLeft: 925, scrollTop: 530 },
      { markerNum: 53, left: 420, bottom: 187, scrollLeft: 925, scrollTop: 590 },
      { markerNum: 54, left: 420, bottom: 167, scrollLeft: 925, scrollTop: 650 },
      { markerNum: 55, left: 420, bottom: 147, scrollLeft: 925, scrollTop: 710 },
      { markerNum: 56, left: 420, bottom: 127, scrollLeft: 925, scrollTop: 770 },
      { markerNum: 57, left: 450, bottom: 127, scrollLeft: 1000, scrollTop: 770 },
      { markerNum: 58, left: 450, bottom: 147, scrollLeft: 1000, scrollTop: 710 },
      { markerNum: 59, left: 450, bottom: 167, scrollLeft: 1000, scrollTop: 650 },
      { markerNum: 60, left: 470, bottom: 167, scrollLeft: 1070, scrollTop: 650 },
    ],
  },
});

const selectedMarker = ref('');

const zoomIn = () => {
  const container = containerRef.value;

  const currentScrollLeft = container.scrollLeft;
  const currentScrollTop = container.scrollTop;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const centerX = currentScrollLeft + containerWidth / 2;
  const centerY = currentScrollTop + containerHeight / 2;

  const newZoomLevel = Math.min(zoomLevel.value + 0.3, 1.6);
  const zoomFactor = newZoomLevel / zoomLevel.value;
  zoomLevel.value = newZoomLevel;

  nextTick(() => {
    container.scrollLeft = centerX * zoomFactor - containerWidth / 2;
    container.scrollTop = centerY * zoomFactor - containerHeight / 2;
  });
};

const zoomOut = () => {
  const container = containerRef.value;

  const currentScrollLeft = container.scrollLeft;
  const currentScrollTop = container.scrollTop;
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const centerX = currentScrollLeft + containerWidth / 2;
  const centerY = currentScrollTop + containerHeight / 2;

  const newZoomLevel = Math.max(zoomLevel.value - 0.3, 1);
  const zoomFactor = newZoomLevel / zoomLevel.value;
  zoomLevel.value = newZoomLevel;

  nextTick(() => {
    container.scrollLeft = centerX * zoomFactor - containerWidth / 2;
    container.scrollTop = centerY * zoomFactor - containerHeight / 2;
  });
};

const moveScroll = () => {
  const container = containerRef.value;
  if (selectBoothMenu.value === 0) {
    // 동아리 홍보전
    zoomLevel.value = 1.3;
    // 축제
    // zoomLevel.value = 1;
    nextTick(() => {
      // 동아리 홍보전
      container.scrollLeft = 500;
      container.scrollTop = 250;
      // 축제
      // container.scrollLeft = 99.5;
      // container.scrollTop = 65;
    });
  } else if (selectBoothMenu.value === 1) {
    // 야간부스 눌렀을 때
    zoomLevel.value = 1.6;
    nextTick(() => {
      focusMarker();
    });
  } else if (selectBoothMenu.value === 2) {
    // 벙커 눌렀을 때
    zoomLevel.value = 1.6;
    nextTick(() => {
      focusMarker();
    });
  } else if (selectBoothMenu.value === 3) {
    // 푸드트럭 눌렀을 때
    zoomLevel.value = 1.6;
    nextTick(() => {
      focusMarker();
    });
  } else if (selectBoothMenu.value === 4) {
    zoomLevel.value = 1.6;
    if (selectedTicketBooth.value === false) {
      // 편의시설 눌렀을 때
      nextTick(() => {
        container.scrollLeft = 130;
        container.scrollTop = 150;
      });
    } else {
      // 티켓 부스 쪽 대왕 마커 눌렀을 때
      // nextTick(() => {
      //   container.scrollLeft = 620;
      //   container.scrollTop = 200;
      //   focusMarker();
      // });
    }
  }

  if (selectBoothMenu.value === 0) {
    // 동아리 홍보전
    zoomLevel.value = 1.3;
    // 축제
    // zoomLevel.value = 1;
    nextTick(() => {
      // 동아리 홍보전
      container.scrollLeft = 500;
      container.scrollTop = 250;
      // 축제
      // container.scrollLeft = 99.5;
      // container.scrollTop = 65;
    });
  } else if (selectBoothMenu.value === 1) {
    // 야간부스 눌렀을 때
    zoomLevel.value = 1.6;
    nextTick(() => {
      focusMarker();
    });
  } else if (selectBoothMenu.value === 2) {
    // 벙커 눌렀을 때
    zoomLevel.value = 1.6;
    nextTick(() => {
      focusMarker();
    });
  } else if (selectBoothMenu.value === 3) {
    zoomLevel.value = 1.6;
    if (selectedTicketBooth.value === false) {
      // 편의시설 눌렀을 때
      nextTick(() => {
        container.scrollLeft = 130;
        container.scrollTop = 150;
      });
    }
  }
};

const handleMarkerClick = (index) => {
  selectedMarker.value = index;

  getBoothDetailData(index);
  focusMarker();
};

const startDistance = ref(0);
const startX = ref(0);
const startY = ref(0);

const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    startDistance.value = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY,
    );
    startX.value = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    startY.value = (e.touches[0].clientY + e.touches[1].clientY) / 2;
  }
};

const handleTouchMove = (e) => {
  if (e.touches.length === 2) {
    const newDistance = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY,
    );
    const delta = newDistance - startDistance.value;
    const scaleChange = delta / 500; // 조정할 비율
    zoomLevel.value = Math.min(Math.max(zoomLevel.value + scaleChange, 1), 2.4);

    // 확대/축소 시 지도의 중심점을 조정
    const container = containerRef.value;
    if (container) {
      const newX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const newY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      container.scrollLeft += (startX.value - newX) * zoomLevel.value;
      container.scrollTop += (startY.value - newY) * zoomLevel.value;
      startDistance.value = newDistance;
      startX.value = newX;
      startY.value = newY;
    }
  }
};

const boothDataMap = computed(() => {
  const map = {};
  allBoothList.value.forEach((booth) => {
    map[booth.markerNum] = booth;
  });
  return map;
});

const getBoothDetailData = (marker) => {
  boothMarkerData.value = boothDataMap.value[marker.markerNum];
};

const focusMarker = () => {
  const container = containerRef.value;
  if (container && selectedMarker.value) {
    nextTick(() => {
      container.scrollLeft = (selectedMarker.value.scrollLeft / 1.6) * zoomLevel.value;
      container.scrollTop = (selectedMarker.value.scrollTop / 1.6) * zoomLevel.value;
    });
  }
};

const findMarker = (boothList) => {
  if (boothList.length > 0) {
    const firstBooth = boothList[0];
    for (const category in markers.value.detail) {
      const foundMarker = markers.value.detail[category].find((marker) => marker.markerNum === firstBooth.markerNum);
      if (foundMarker) {
        return foundMarker;
      }
    }
  }
  return false;
};

const findMarkerByBoothId = (booth) => {
  for (const category in markers.value.detail) {
    const foundMarker = markers.value.detail[category].find((marker) => marker.markerNum === booth.value.markerNum);
    if (foundMarker) {
      return foundMarker;
    }
  }
};

const loadDetailMap = () => {
  zoomLevel.value = 1.6;

  const foundMarker = findMarkerByBoothId(booth);

  if (foundMarker) {
    nextTick(() => {
      selectedMarker.value = foundMarker;
      boothMarkerData.value = booth.value;
      focusMarker();
    });
  }
};

const initializeMap = () => {
  loadDetailMap();
};

const initSelectedMarker = () => {
  selectedMarker.value = '';
};

const clickMarkerSpeechBubble = (type, id, marker) => {
  if (marker >= 90) {
    return window.open(`https://www.instagram.com/22th_yoonseul/`, '_blank');
  }
  getBoothData(type, id);
};

watchEffect(() => {
  if (router?.currentRoute?.value?.name) {
    isBoothDetail.value = router.currentRoute.value.name == 'booth-detail';
  } else {
    isBoothDetail.value = false;
  }
});

onMounted(() => {
  imageLoaded.value = true;
  initializeMap(); // 페이지 로드 시 호출
});

watch(
  () => route.params.id,
  () => {
    if (imageLoaded.value) {
      initializeMap(); // `route.params.id` 변경 시 호출
    }
  },
);

watchEffect(() => {
  if (imageLoaded.value && containerRef.value) {
    moveScroll();
    selectedMarker.value = '';

    // if (selectBoothMenu.value === 1) {
    //   const foundMarker = findMarker(nightBoothList.value);
    //   if (foundMarker) {
    //     selectedMarker.value = foundMarker;
    //     getBoothDetailData(foundMarker);
    //   }
    // } else if (selectBoothMenu.value === 2) {
    //   const foundMarker = findMarker(dayBoothList.value);
    //   if (foundMarker) {
    //     selectedMarker.value = foundMarker;
    //     getBoothDetailData(foundMarker);
    //   }
    // } else if (selectBoothMenu.value === 3) {
    //   const foundMarker = findMarker(foodBoothList.value);
    //   if (foundMarker) {
    //     selectedMarker.value = foundMarker;
    //     getBoothDetailData(foundMarker);
    //   }
    // }

    if (selectBoothMenu.value === 1) {
      const foundMarker = findMarker(dayBoothList.value);
      if (foundMarker) {
        selectedMarker.value = foundMarker;
        getBoothDetailData(foundMarker);
      }
    } else if (selectBoothMenu.value === 2) {
      const foundMarker = findMarker(foodBoothList.value);
      if (foundMarker) {
        selectedMarker.value = foundMarker;
        getBoothDetailData(foundMarker);
      }
    }

    if (route.params?.id) {
      loadDetailMap(); // `route.params.id` 존재 시 호출
    }
  }
});
</script>

<template>
  <div class="dynamic-booth-map-padding">
    <div class="relative cursor-pointer">
      <div
        ref="containerRef"
        @touchstart.passive="handleTouchStart($event)"
        @touchmove.passive="handleTouchMove($event)"
        id="map-container"
        class="relative aspect-square w-full min-h-[340px] h-[340px] xs:h-[390px] sm:h-[453.5px] max-h-[453.5px] bg-map-color border border-gray-300 rounded-3xl overflow-auto touch-pan-x touch-pan-y"
      >
        <div
          @click="initSelectedMarker()"
          class="relative scroll-smooth"
          id="map-area"
          :style="{
            width: `${587 * zoomLevel}px`,
            height: `${518 * zoomLevel}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
          }"
        >
          <!-- 부스 페이지 -->
          <div class="w-full h-full bg-booth-map bg-cover">
            <div
              v-for="(marker, index) in markers.more"
              :id="marker.id"
              :key="`more-${index}`"
              class="absolute marker"
              :style="{
                left: `${marker.left * zoomLevel}px`,
                bottom: `${marker.bottom * zoomLevel}px`,
                transform: `scale(${1 / zoomLevel})`,
                transformOrigin: 'center bottom',
              }"
              @click.stop="convertBoothMenuTab(marker.tab)"
            >
              <!-- 대왕 마커 -->
              <div
                v-if="zoomLevel <= 1.4 && !isBoothDetail"
                class="w-[72px] h-[72px] bg-more-marker bg-cover flex justify-center"
              >
                <div class="absolute top-1/4 text-white font-extrabold text-[15px] select-none">
                  +{{ marker?.count }}
                </div>
              </div>
            </div>
            <div v-for="(category, categoryName) in markers.detail" :key="categoryName">
              <!-- 부스 마커 -->
              <div
                v-for="(marker, index) in category"
                :id="marker.id"
                :key="`detail-${categoryName}-${index}`"
                class="absolute marker"
                :style="{
                  left: `${marker.left * zoomLevel}px`,
                  bottom: `${marker.bottom * zoomLevel}px`,
                  transform: `scale(${selectedMarker === marker ? 1.3 / zoomLevel : 1 / zoomLevel})`,
                  transformOrigin: 'center bottom',
                  zIndex: `${marker.markerNum === selectedMarker.markerNum ? '1000' : '500'}`,
                }"
                @click.stop="handleMarkerClick(marker)"
              >
                <div
                  v-if="zoomLevel > 1.4 && !isBoothDetail"
                  class="relative w-[56px] h-[56px] bg-cover flex justify-center"
                  :style="{
                    backgroundImage: `${
                      selectedMarker === marker
                        ? `url(/icons/booth/${categoryName}.svg)`
                        : `url(/icons/booth/before/${categoryName}.svg)`
                    }`,
                  }"
                >
                  <MapSpeechBubble
                    v-if="selectedMarker.markerNum === marker.markerNum"
                    class="absolute bottom-[65px]"
                    @click.stop="
                      clickMarkerSpeechBubble(boothMarkerData.adminCategory, boothMarkerData.boothId, marker.markerNum)
                    "
                  ></MapSpeechBubble>
                </div>
              </div>
              <!-- 부스 디테일 페이지 -->
              <div
                v-for="(marker, index) in category"
                :id="marker.id"
                :key="`detail-${categoryName}-${index}`"
                class="absolute marker"
                :style="{
                  left: `${marker.left * zoomLevel}px`,
                  bottom: `${marker.bottom * zoomLevel}px`,
                  transform: `scale(${booth.markerNum === marker.markerNum ? 1.3 / zoomLevel : 1 / zoomLevel})`,
                  transformOrigin: 'center bottom',
                  zIndex: `${booth.markerNum === marker.markerNum ? '1000' : '500'}`,
                }"
              >
                <div
                  v-if="isBoothDetail && booth.markerNum === marker.markerNum"
                  class="relative w-[56px] h-[56px] bg-cover flex justify-center"
                  :style="{
                    backgroundImage: `url('/icons/booth/${categoryName}.svg')`,
                  }"
                >
                  <MapSpeechBubble
                    v-if="booth.markerNum === marker.markerNum"
                    class="absolute bottom-[65px]"
                  ></MapSpeechBubble>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="z-4 absolute bottom-5 left-5 shadow-6xl rounded-full">
        <button
          @click="zoomIn"
          class="shadow-3xl bg-white rounded-t-full border-1 border-primary-900-light-40 p-4 flex justify-center items-center active:bg-primary-900 active:text-white"
        >
          <i class="pi pi-plus text-primary-900 text-lg active:text-white"></i>
        </button>
        <button
          @click="zoomOut"
          class="shadow-3xl bg-white rounded-b-full border-1 border-primary-900-light-40 p-4 flex justify-center items-center active:bg-primary-900 active:text-white"
        >
          <i class="pi pi-minus text-primary-900 text-lg active:text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.dynamic-booth-map-padding {
  padding-top: calc(10 / 430 * 100%) !important;
  padding-left: calc(20 / 430 * 100%) !important;
  padding-right: calc(20 / 430 * 100%) !important;
  padding-bottom: calc(25 / 430 * 100%) !important;
}

button:active i {
  color: white;
}

.marker {
  transition: transform 0.5s ease, width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
  transform-origin: center bottom;
}
</style>
