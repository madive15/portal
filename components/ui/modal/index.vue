<script lang="ts" setup>
import { ref } from 'vue';
import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';

const target = useTemplateRef('target');
/*const { hasFocus, activate, deactivate } = useFocusTrap(target, {
  immediate: true
});*/

const emits = defineEmits(['open', 'close']);

const props = defineProps<{
  modalClickButtonText: string;
  modalHeaderText?: string;
  modalWidth?: number | string;
  okText?: string;
  cancelText?: string;
  btnWidth?: number | string;
  btnHeight?: number | string;
  modalClass?: string;
}>();

const open = ref<boolean>(false);

watch(open, (newValue) => {
  if (newValue) {
    emits('open');
  } else {
  }
});

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  emits('close');
  open.value = false;
};

const handleCancel = () => {
  emits('close');
  open.value = false;
};

// 모달 클릭 버튼 width,height 지정
const btnStyle = computed(() => ({
  width: props.btnWidth
    ? typeof props.btnWidth === 'number'
      ? `${props.btnWidth}px`
      : props.btnWidth
    : undefined,
  height: props.btnHeight
    ? typeof props.btnHeight === 'number'
      ? `${props.btnHeight}px`
      : props.btnHeight
    : undefined
}));
</script>

<template>
  <div class="pf-modal-wrap" ref="target">
    <a-button @click="showModal" class="pf-modal-open-button" :style="btnStyle">
      {{ props.modalClickButtonText }}
    </a-button>

    <use-focus-trap v-if="open" :options="{ immediate: true }">
      <div class="w-full h-full z-20">
        <a-modal
          :get-container="false"
          v-model:open="open"
          :centered="true"
          :autoFocusButton="null"
          :width="modalWidth ? modalWidth : null"
          :ok-text="okText"
          :cancel-text="props.cancelText"
          @cancel="handleCancel"
          :root-class-name="'my-modal'"
          wrap-class-name="common-modal-wrap"
        >
          <template #title
            ><div class="text-left">
              {{ modalHeaderText }}
            </div></template
          >
          <template #closeIcon>
            <div><CloseOutlined /></div>
          </template>
          <slot />
          <template #footer>
            <a-button
              class="common-modal-footer-btn cancle-button !w-20"
              @click="handleCancel"
            >
              <span>취소</span>
            </a-button>
            <a-button
              type="primary"
              class="common-modal-footer-btn confirm-button !w-20"
              @click="handleOk"
            >
              <span>확인</span>
            </a-button>
          </template>
        </a-modal>
      </div>
    </use-focus-trap>
  </div>
</template>

<style scoped lang="scss">
//@use '~/components/ui/modal/modal.scss';

.pf-modal-wrap:deep() {
  .ant-modal-root {
    .ant-modal {
      > div {
        outline: none !important;
      }
    }
  }
}
</style>
