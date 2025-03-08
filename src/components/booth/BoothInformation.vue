<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useGetBoothDataStore } from '@/stores/booths/boothDataStore';
import { storeToRefs } from 'pinia';

const { booth, imageList } = storeToRefs(useGetBoothDataStore());
const currentIndex = ref(0);
const containerRef = ref(null);

const startX = ref(0);
const isDragging = ref(false);
const isWheeling = ref(false);

const handleTouchStart = (event) => {
  startX.value = event.touches[0].clientX;
  isDragging.value = true;
};

const handleTouchMove = (event) => {
  if (!isDragging.value) return;
  const touchX = event.touches[0].clientX;
  const moveX = startX.value - touchX;

  if (moveX > 50) {
    nextSlide();
    isDragging.value = false;
  } else if (moveX < -50) {
    prevSlide();
    isDragging.value = false;
  }
};

const handleTouchEnd = () => {
  isDragging.value = false;

  scrollToSlide(currentIndex.value);
};

const handleWheel = (event) => {
  startX.value = event.clientX;
  isWheeling.value = true;
};

const nextSlide = () => {
  if (currentIndex.value < imageList.value.length - 1) {
    currentIndex.value++;
  }
  scrollToSlide(currentIndex.value);
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
  scrollToSlide(currentIndex.value);
};

const scrollToSlide = (index) => {
  const container = containerRef.value;
  const slideWidth = container.clientWidth;
  container.scrollTo({
    left: index * slideWidth,
    behavior: 'smooth',
  });
};

watch(currentIndex, (newIndex) => {
  scrollToSlide(newIndex);
});

onMounted(async () => {
  const container = containerRef.value;
  if (container) {
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: true });
  }
});

onUnmounted(() => {
  const container = containerRef.value;
  if (container) {
    container.removeEventListener('touchstart', handleTouchStart);
    container.removeEventListener('touchmove', handleTouchMove);
    container.removeEventListener('touchend', handleTouchEnd);
    container.removeEventListener('wheel', handleWheel);
  }
});

const getBoothIntroduceImageProps = (boothImage) => {
  return {
    class: { 'bg-booth-default-image': !boothImage },
    style: boothImage ? `background-image: url(${boothImage})` : '',
  };
};

const handleClickInstagram = () => {
  window.open(`https://www.instagram.com/${booth.value.instagram}/`, '_blank');
};
</script>

<template>
  <div class="w-full h-3 bg-secondary-700-light-3"></div>
  <div class="relative pt-[2.33%] pl-[4.65%] pr-[4.65%] pb-9">
    <div class="mt-4">
      <div
        v-if="imageList.length > 1"
        class="absolute right-10 top-11 flex justify-center items-center w-[72px] h-8 bg-white opacity-80 rounded-full text-base text-secondary-500 z-10"
      >
        {{ currentIndex + 1 }} / {{ imageList.length }}
      </div>
      <div
        ref="containerRef"
        class="snap-x snap-mandatory overflow-x-hidden w-full min-h-[340px] flex rounded-3xl outline outline-gray-200 outline-1"
      >
        <div v-for="(image, index) in imageList" :key="index" class="snap-start snap-always min-w-full flex-shrink-0">
          <div
            class="scroll-smooth w-full bg-contain bg-no-repeat bg-center aspect-w-1 aspect-h-1"
            v-bind="getBoothIntroduceImageProps(image)"
          ></div>
        </div>
      </div>
    </div>
    <div
      v-if="booth.instagram"
      @click="handleClickInstagram()"
      class="text-xs text-secondary-500 rounded-full w-fit h-[26px] flex items-center justify-center bg-instagram-bg gap-1 mt-6 px-3"
    >
      <div class="min-w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]"></div>
      <div>@{{ booth?.instagram }}</div>
    </div>
    <div class="pt-5 text-secondary-500 font-light break-words px-1 whitespace-pre-wrap">
      {{ booth?.boothIntro }}
    </div>
  </div>
</template>

<style scoped></style>
