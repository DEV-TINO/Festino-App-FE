<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';

import ModalView from './views/ModalView.vue';
import Swal from 'sweetalert2';

onMounted(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  Swal.fire({
    icon: 'warning',
    title: '주의사항',
    html: `
      <div class="text-wrap break-words whitespace-pre-wrap">
        <b>Festino</b>는 한국공학대학교 개발 소모임이 자체적으로 만든, 학생들을 위한 축제 정보/편의 제공 서비스입니다. \n\n 따라서, <b>동아리 연합회와 무관</b>하며 정보가 정확하지 않을 수 있습니다.
      </div>`,
    confirmButtonText: '확인했습니다.',
    footer: '<a href="https://www.instagram.com/22th_yoonseul/" class="text-blue-400">동아리 연합회 인스타 바로가기</a>',
  });
});
</script>

<template>
  <RouterView />
  <ModalView />
</template>

<style scoped></style>
