<script setup lang="ts">
import { ref } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';

definePageMeta({
  layout: 'pub2nd'
});


const modalRef = ref<InstanceType<typeof CommonModal>>();
const showModal = () => {
  modalRef.value?.open();
};
onMounted(() => {
  showModal();
});
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal
      class="main-pop-modal-wrap"
      ref="modalRef"
      title=""
      :width="460"
    >
      <div class="body-cont-wrap">
        <div class="img-wrap">
          <div class="img-sum-wrap"><img src="../../../assets/image/main/main-pop.png"/></div>
          <a href="https://www.helplaw24.go.kr/center/ntc/detail?baId=464" class="link-btn" title="공지사항 바로가기" style="left:6%"></a>
          <a href="https://www.helplaw24.go.kr/center/ntc/detail?baId=465" class="link-btn" title="보도자료 바로가기" style="left:36%"></a>
          <a href="https://m.youtube.com/watch?v=0iKmiV9XE98" class="link-btn" title="홍보동영상 바로보기" style="left:66%"></a>
        </div>
        <div class="input-wrap">
          <a-checkbox  value="" name="type">
            다시 보지 않기
          </a-checkbox>
          <a-checkbox value="" name="type">
            닫기
          </a-checkbox>
        </div>
      </div>
    </CommonModal>
  </div>
  <!-- 여기부터 모달 컨텐츠 -->
</template>

<style lang="scss">
  .main-pop-modal-wrap {
    .ant-modal-content {overflow: hidden;}
    .ant-modal-body {
      padding: 0;
    }
    .img-wrap {
      position: relative;
      .img-sum-wrap {
        img {
          width: 100%;
        }
      }
    }
    .link-btn {
      position: absolute;
      display: block;
      width: 28%;
      height: 10%;
      bottom: 4%;
      
    }
    .input-wrap {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

/*mo*/
@media (max-width: 1199px) {
}

</style>
