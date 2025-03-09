<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';

import ModalView from './views/ModalView.vue';
import Swal from 'sweetalert2';

const CURRENT_VERSION = import.meta.env.VITE_APP_VERSION;

const checkVersion = async () => {
  try {
    const res = await fetch('/version.json', {
      cache: 'no-cache',
    });
    if (!res.ok) return;

    const data = await res.json();
    if (data.version && data.version !== CURRENT_VERSION) {
      const swal = await Swal.fire({
        icon: 'info',
        title: '새로운 버전이 배포되었습니다.',
        text: '페이지를 새로고침합니다.',
        confirmButtonText: '확인',
      });

      if (swal.isConfirmed) {
        // Reload the page
        window.location.reload(true);
      }
    }
  } catch (err) {
    // if Error is 404
    if (err.response.status === 404) {
      console.error('버전 체크 실패', err);
      window.location.reload(true);
    } else {
      console.error('버전 체크 실패', err);
    }
  }
};

onMounted(() => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  checkVersion();

  if (CURRENT_VERSION === '1.0.0') {
    Swal.fire({
      icon: 'warning',
      title: '주의사항',
      html: `
        <div class="text-wrap break-words whitespace-pre-wrap">
          <b>Festino</b>는 한국공학대학교 개발 소모임이 자체적으로 만든, 학생들을 위한 축제 정보/편의 제공 서비스입니다. \n\n 따라서, <b>동아리 연합회와 무관</b>하며 정보가 정확하지 않을 수 있습니다.
        </div>`,
      confirmButtonText: '확인했습니다.',
      footer:
        '<a href="https://www.instagram.com/22th_yoonseul/" class="text-blue-400">동아리 연합회 인스타 바로가기</a>',
    });
  }
});
</script>

<template>
  <RouterView />
  <ModalView />
</template>

<style scoped></style>
