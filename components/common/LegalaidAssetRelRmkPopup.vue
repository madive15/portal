<script setup lang="ts">
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import { defineExpose, ref, useSlots } from 'vue';

const props = defineProps<{
  width?: number | string;
  type?: 'primary' | 'record' | 'bgNone';
  full?: boolean;
  hFull?: boolean;
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

const modalClass = computed(() => {
  const fullSize = props.full ? 'mo-full__auto' : '';
  const hFullSize = props.hFull ? 'h-full__auto' : '';
  const typeClass =
    {
      primary: 'modal-primary',
      record: 'modal-record',
      bgNone: 'modal-none'
    }[props.type || ''] ?? 'modal-basic';
  return [fullSize, hFullSize, typeClass];
});

const footerSlot = computed(() => {
  return typeof slots.footer === 'function' ? slots.footer() : null;
});

// 여기까지
// const modalRef = ref<InstanceType<typeof CommonModal>>();
// const showModal = () => {
//   modalRef.value?.open();
// };
// onMounted(() => {
//   showModal();
// });
</script>

<template>
  <a-modal
    v-model:visible="visible"
    v-bind="props.width ? { width: props.width } : {}"
    :title="props.title"
    :class="['common-modal-wrap', modalClass]"
    :footer="footerSlot"
  >
    <template #title>
      <slot name="title">
        <!-- 기본 제목 (슬롯 안 쓰면 fallback) -->
        재산관계진술서 작성시 유의사항
      </slot>
    </template>
    <!-- 본문 영역 -->
    <div class="body-cont-wrap">
      <h2 class="ex-mark-tit">작성시 유의사항</h2>
      <div class="bull-list-box">
        <BullList type="number" numberStyle="circle">
          <li><strong>가족관계 :</strong> 배우자, 부모, 동거 중인 형제자매</li>
          <li>
            <strong>재산내역</strong>
            <ul class="info-ex-list">
              <li>
                <strong>가. 부동산 :</strong>
                등기 여부에 관계없이 권리의 종류, 부동산의 소재지, 지목,
                면적(㎡), 실거래가액을 기재<br />
                예시) 임차권, 서울 서초구 서초동 ○○번지 ○○아파트 ○동 ○호 50㎡,
                임대차보증금 ○○○만원
              </li>
              <li>
                <strong>나. 예금 :</strong>
                50만원이상 인 예금의 예금주, 예탁기관, 계좌번호, 예금의 종류를
                기재<br />
                예시) 예금주 ○○○, △△은행 서초지점 계좌번호00-00-00, 보통예금,
                ○○○만원
              </li>
              <li>
                <strong>다. 자동차 :</strong>
                차종, 제작연도, 배기량, 차량등록번호, 거래가액을 기재<br />
                예시) 캐피탈 1993년식, 1500㏄, 서울○○두1234, ○○○만원
              </li>
              <li>
                <strong>라. 연금 :</strong>
                액수 관계없이 연금의 종류, 정기적으로 받는 연금 액수, 기간을
                기재<br />
                예시) 유족연금 매월 30만원, 20○○. . .부터 20○○. . .까지
              </li>
              <li>
                <strong>마. 기타 :</strong>
                소유하고 있는 건설기계, 선박 또는 50만 원 이상의 유가증권,
                회원권, 귀금속 등을 기재
              </li>
            </ul>
          </li>
        </BullList>
      </div>
      <h2 class="ex-mark-tit">첨부서면</h2>
      <div class="bull-list-box">
        <BullList type="number" numberStyle="circle">
          <li>
            가족관계를 알 수 있는 주민등록등본 또는 호적등본, 재산내역을 알 수
            있는 등기부등본, 자동차 등록원부등본, 예금통장사본, 위탁잔고현황,
            각종 회원증 사본재산내역
          </li>
          <li class="!block">
            다음에 해당하는 서류가 있는 경우에는 이를 제출하시기 바랍니다.
            <ImgBox useScroll>
              <CommonTable>
                <caption>
                  직장가입자의 성명, 건강보험료, 월소득, 수정/삭제 편집 대한 표
                </caption>
                <colgroup>
                  <col style="width: 6%" />
                  <col style="width: 20%" />
                  <col style="width: 74%" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">순번</th>
                    <th scope="col">구분</th>
                    <th scope="col">비고</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>근로자 및 상업종사자</td>
                    <td class="title-td">
                      근로소득원천징수영수증 또는 보수지급명세서,
                      국민건강보험료부과내역서, 국민연금이력요약/가입증명서,
                      소득금액증명서
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>공무원</td>
                    <td class="title-td">재직증명서 또는 공무원증 사본</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>국가보훈대상자</td>
                    <td class="title-td">국가유공자임을 증명하는 서면</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>장애인</td>
                    <td class="title-td">
                      시ㆍ군ㆍ구, 읍ㆍ면ㆍ동사무소 발행의 장애인 증명 또는
                      의사가 발행하는 장애진단서
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>영세민</td>
                    <td class="title-td">
                      국민건강보험료부과내역서, 국민연금이력요약/가입증명서,
                      소득금액증명서, 지방세세목별과세증명서, 주택임대차계약서
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>외국인</td>
                    <td class="title-td">여권사본 또는 외국인등록증사본</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>북한이탈주민</td>
                    <td class="title-td">
                      하나원 수료증 또는 북한이탈주민 확인서
                    </td>
                  </tr>
                </tbody>
              </CommonTable>
            </ImgBox>
          </li>
          <li class="!block">
            신청서 제출시 주의사항
            <p class="bul-dot">
              신청서에는 다음 사유에 해당하는 서류를 첨부하여야 합니다.
            </p>
            <div class="border-top-box">
              <span class="tag">첨부서류</span>

              <BullList type="number" numberStyle="encode" class="!gap-y-4px">
                <li class="!text-[#222]">
                  생활보호법이 정한 보호대상자인 경우 : 시・읍・면・동장의
                  생활보호대상자증명서
                </li>
                <li class="!text-[#222]">
                  생계가 곤란한 자인 경우 : 재산상태를 확인할 수 있는 서류
                </li>
                <li class="!text-[#222]">
                  인권위원회에서 구조를 요한다고 인정하는 경우 :
                  인권위원회회의록이나 의견서
                </li>
                <li class="!text-[#222]">
                  기타 법률구조가 필요한 경우 : 법률구조필요성을 소명하는 서류
                </li>
              </BullList>
            </div>
          </li>
        </BullList>
      </div>
    </div>
    <slot />
    <!-- footer 영역 -->
    <template #footer>
      <slot name="footer" />
    </template>
  </a-modal>
</template>

<style scoped lang="scss">
@use './scss/LegalaidAssetsRelRmkPopup';
</style>
