<script setup lang="ts">
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import { defineExpose, ref, useSlots } from 'vue';

const emit = defineEmits<{
  (e: 'update:agree', val: boolean): void;
}>();

const slots = useSlots();
const visible = ref(false);
const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};

defineExpose({ open, close });

const checkSelected = ref<string[]>([]); // 체크되면 ['Y'] 같은 식으로 채움(단일 체크박스면 길이만 보면 됨)
const isChecked = computed(() => checkSelected.value.length > 0);

const confirmAndClose = () => {
  emit('update:agree', isChecked.value);
  close();
};

const modalClass = computed(() => {
  const fullSize = 'mo-full__auto';
  const typeClass = 'modal-basic';
  return [fullSize, typeClass];
});

const footerSlot = computed(() => {
  return typeof slots.footer === 'function' ? slots.footer() : null;
});
</script>

<template>
  <a-modal
    v-model:visible="visible"
    v-bind="{ width: 1100 }"
    :title="'행정정보 공동이용 동의'"
    :class="['common-modal-wrap', modalClass]"
  >
    <template #title>
      <slot name="title">
        <!-- 기본 제목 (슬롯 안 쓰면 fallback) -->
        행정정보 공동이용 동의
      </slot>
    </template>
    <!-- 본문 영역 -->
    <div class="body-cont-wrap">
      <div class="consent-box">
        <div class="box">
          <strong class="info-tit">행정정보 공동이용 동의</strong>
          <p class="info-txt">
            대한법률구조공단(이하 공단)은 「개인정보 보호법」시행령 제19조에
            따라 주민등록번호, 여권번호, 운전면허의 면허번호 또는
            외국인등록번호가 포함된 행정정보를 처리할 수 있습니다.
          </p>
        </div>
        <div class="box">
          <a-checkbox-group v-model:value="checkSelected">
            <a-checkbox class="check-bx">행정정보 공동이용 동의</a-checkbox>
          </a-checkbox-group>
          <BullList type="number" numberStyle="encode" class="!gap-y-4px">
            <li class="!text-[#222]">이용기관 명칭: 대한법률구조공단</li>
            <li class="!text-[#222]">
              이용사무(이용목적): 법률구조대상자 소명에 필요한 자료 제출
            </li>
            <li class="!text-[#222]">
              수집 항목: 주민등록등본 등 법률구조대상자 소명에 필요한 행정서류
            </li>
            <li class="!text-[#222]">보유기간: 5년</li>
            <li class="!text-[#222]">
              동의를 거부할 권리 및 동의를 거부할 경우의 불이익 이용자는 위의
              행정정보 공동이용에 대한 동의를 거부할 권리가 있습니다. 그러나
              동의를 거부할 경우 본인이 해당 구비서류를 제출하여야 합니다.
            </li>
          </BullList>
        </div>
      </div>
    </div>
    <slot />
    <!-- footer 영역 -->
    <template #footer>
      <slot name="footer">
        <CommonButton variants="primary" width="md" @click="confirmAndClose">
          확인
        </CommonButton>
      </slot>
    </template>
  </a-modal>
</template>

<style scoped lang="scss">
@use 'scss/AdmInfoPblcUtztnPopup';
</style>
