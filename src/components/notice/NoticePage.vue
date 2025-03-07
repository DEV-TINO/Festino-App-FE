<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const currentIndex = ref(0);
const containerRef = ref(null);
const startX = ref(0);
const isDragging = ref(false);
const isWheeling = ref(false);

const props = defineProps({
  noticeData: {
    type: Object,
    required: true,
  },
});

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
  if (currentIndex.value < props.noticeData.imageUrl.length - 1) {
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

const getBoothIntroduceImageProps = (boothImage) => {
  return {
    class: { 'bg-booth-default-image': !boothImage },
    style: boothImage ? `background-image: url(${boothImage})` : '',
  };
};

onMounted(() => {
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
</script>

<template>
  <div
    v-if="!noticeData.content.includes('총학생회')"
    class="w-full h-auto flex flex-col bg-white rounded-3xl border-primary-900-light-68 border-1 justify-center items-center p-5 gap-[20px] select-none"
  >
    <!-- <div v-if="noticeData.title"></div> -->
    <div v-if="noticeData.imageUrl.length > 1" class="relative w-full">
      <div
        class="absolute z-50 right-4 top-4 flex justify-center items-center w-[72px] h-8 bg-white opacity-80 rounded-full text-secondary-500"
      >
        {{ currentIndex + 1 }} / {{ noticeData.imageUrl.length }}
      </div>
      <div
        ref="containerRef"
        class="snap-x snap-mandatory overflow-x-hidden w-full flex rounded-3xl border border-primary-900-light-68"
      >
        <div
          v-for="(image, index) in noticeData.imageUrl"
          :key="index"
          class="snap-start snap-always w-full flex-shrink-0"
        >
          <div
            class="aspect-w-1 aspect-h-1 scroll-smooth w-full bg-cover bg-no-repeat bg-center"
            v-bind="getBoothIntroduceImageProps(image)"
          ></div>
        </div>
      </div>
    </div>
    <div class="w-full text-xs break-words px-1 whitespace-pre-wrap">{{ noticeData.content }}</div>
  </div>

  <div class="w-full">
    <div
      v-if="noticeData.content.includes('총학생회')"
      class="elfsight-app-2d5ef3bb-4da1-4fa5-b040-c46cef50c10c overflow-auto relative w-full"
      data-elfsight-app-lazy
    ></div>
  </div>
</template>

<style scoped></style>
