<script setup lang="ts">
/* 마운트 될 때 실행 */
import { ref, onMounted, onBeforeUnmount } from 'vue';

definePageMeta({ layout: 'empty' });
// 팝업 페이지

const id_token = ref<string | null>(null);
const p_sid = ref<string | null>(null);
const tenant_name = ref<string | null>(null);
const login_id = ref<string | null>(null);
const group_id = ref<string | null>(null);
const reservation_number = ref<string | null>(null);
const mbr_eml_addr = ref<string | null>(null);

onMounted(() => {
  // opener에게 준비 완료 신호
  window.opener?.postMessage('POPUP_READY', '*');

  // 부모가 보내는 데이터 수신
  const onMsg = (e: MessageEvent) => {
    if (e.data?.type === 'LASP_PARAMS') {
      // 여기서 e.data.tx, e.data.exp 사용
      id_token.value = e.data.id_token;
      p_sid.value = e.data.p_sid;
      tenant_name.value = e.data.tenant_name;
      login_id.value = e.data.login_id;
      group_id.value = e.data.group_id;
      reservation_number.value = e.data.reservation_number;
      mbr_eml_addr.value = e.data.mbr_eml_addr;

      window.location.href =
        'https://remeeting.helplaw24.go.kr/view/ssoReserve?tenant_name=fermi&login_id=Fj2WO37s3OFWMkw15Yt47iJx1GqDpGX6z2JCTaORoDL%2Bwssu608EvdN8JZTbWInuzkyLh75b%2BxKgQkDoNbD50w%3D%3D&group_id=243&phone_number=01012345678&destination=ag';
    } else {
      alert('정상적인 접근이 아닙니다.');
      window.close();
    }
  };

  window.addEventListener('message', onMsg);

  onBeforeUnmount(() => window.removeEventListener('message', onMsg));
});
</script>

<template>
  <div class="row">
    <p>화상 상담을 위한 페이지</p>
  </div>

  <div class="row">
    <ul>
      <li class="col">화상 상담 내용</li>
      <li class="col">Ticket ID : {{ id_token }}</li>
      <li class="col">pSid : {{ p_sid }}</li>
      <li class="col">tenant_name : {{ tenant_name }}</li>
      <li class="col">login_id : {{ login_id }}</li>
      <li class="col">group_id : {{ group_id }}</li>
      <li class="col">reservation_number : {{ reservation_number }}</li>
      <li class="col">mbr_eml_addr : {{ mbr_eml_addr }}</li>
    </ul>
  </div>
</template>
<style scoped lang="scss"></style>
