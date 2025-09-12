<script setup lang="ts">
import { ref } from 'vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonTable from '~/components/ui/table/tables.vue';

definePageMeta({
  layout: 'pub2nd'
});

const modalRef = ref<InstanceType<typeof CommonModal>>();

const open = defineModel('open');

const props = defineProps<{
  open: Boolean;
  params: any;
}>();

const refYyyyMm = reactive({
  yyyy: String,
  mm: String
});

const refGramt = reactive({
  gramt: ''
});
watch(
  () => props.open,
  (open) => {
    if (open) {
      init();
    }
  }
);

onMounted(() => {});

const init = () => {
  for (let i of props.params.pay_list) {
    let gramt =
      i.wrc_hlthins_pay_amt.replaceAll(',', '') * 1 +
      i.income_hlthins_pay_amt.replaceAll(',', '') * 1;

    if (gramt > 0) {
      refYyyyMm.yyyy = i.ntic_ym.substring(0, 4);
      refYyyyMm.mm = i.ntic_ym.substring(4, 6);
      refGramt.gramt = gramt;
    }
  }
};

const closePopup = () => {
  open.value = false;
};
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal
      ref="modalRef"
      title="건강보험납입조회"
      :open="open"
      @cancel="closePopup"
      :width="1100"
      :full="true"
    >
      <template #footer>
        <CommonButton variants="primary" width="lg">
          건강보험료 적용하기
        </CommonButton>
      </template>
      <div class="body-cont-wrap">
        <CommonTitle tag="h2" size="2" type="arrow">
          월별납임 내역({{ props.params.issu_de.substring(0, 4) }})
        </CommonTitle>
        <CommonTable class="pc-only mt-17px">
          <caption>
            직장 가입자 건강보험납입정보의 가입자성명, 생년월일, 발급일자,
            납부자번호, 사업자명에 대한 표
          </caption>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 32%" />
            <col style="width: 32%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">가입자성명</th>
              <th scope="col">생년월일</th>
              <th scope="col">발급일자</th>
              <th scope="col">납부자번호</th>
              <th scope="col">사업자명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ props.params.nm }}</td>
              <td>{{ props.params.brthdy }}</td>
              <td>
                {{ props.params.issu_de.substring(0, 4) }}.{{
                  props.params.issu_de.substring(4, 6)
                }}.{{ props.params.issu_de.substring(6, 8) }}
              </td>
              <td>{{ props.params.hlthins_edyc_no }}</td>
              <td>{{ props.params.bplc_nm }}</td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonTable class="type-left mo-only mt-17px">
          <caption>
            직장 가입자 건강보험납입정보의 가입자성명, 생년월일, 발급일자,
            납부자번호, 사업자명에 대한 표
          </caption>
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">가입자성명</th>
              <td>홍길동</td>
            </tr>
            <tr>
              <th scope="row">생년월일</th>
              <td>1985.05.01</td>
            </tr>
            <tr>
              <th scope="row">발급일자</th>
              <td>2012.06.01</td>
            </tr>
            <tr>
              <th scope="row">납부자번호</th>
              <td>30028858759</td>
            </tr>
            <tr>
              <th scope="row">사업자명</th>
              <td>대*****</td>
            </tr>
          </tbody>
        </CommonTable>
        <CommonTitle tag="h2" size="2" type="arrow" class="mt-40px">
          월별납임 내역({{ props.params.issu_de.substring(0, 4) }})
        </CommonTitle>
        <ImgBox useScroll>
          <CommonTable class="mt-17px">
            <caption>
              월별납임 내역의 고지년월, 소득의 고지금액(건강),
              고지금액(장기요양), 납부금액(건강), 납부금액(장기요양), 직장의
              고지금액(건강), 고지금액(장기요양), 납부금액(건강),
              납부금액(장기요양)에 대한 표
            </caption>
            <thead>
              <tr>
                <th scope="col" rowspan="2">고지년월</th>
                <th scope="colgroup" colspan="4">소득</th>
                <th scope="colgroup" colspan="4">직장</th>
              </tr>
              <tr>
                <th scope="col">고지금액<br />(건강)</th>
                <th scope="col">고지금액<br />(장기요양)</th>
                <th scope="col">납부금액<br />(건강)</th>
                <th scope="col">납부금액<br />(장기요양)</th>
                <th scope="col">고지금액<br />(건강)</th>
                <th scope="col">고지금액<br />(장기요양)</th>
                <th scope="col">납부금액<br />(건강)</th>
                <th scope="col">납부금액<br />(장기요양)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in props.params.pay_list" :key="index">
                <td style="text-align: right">{{ item.ntic_ym }}</td>
                <td style="text-align: right">
                  {{ item.income_hlthins_ntic_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.income_ltrcins_ntic_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.income_hlthins_pay_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.income_ltrcins_pay_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.wrc_hlthins_ntic_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.wrc_ltrcins_ntic_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.wrc_hlthins_pay_amt }}
                </td>
                <td style="text-align: right">
                  {{ item.wrc_ltrcins_pay_amt }}
                </td>
              </tr>
            </tbody>
          </CommonTable>
        </ImgBox>
        <p class="info-txt-arrow">
          {{ refYyyyMm.yyyy }}년 {{ refYyyyMm.mm }}월 기준
          건강보험료납입액(장기요양보험료제외) <br class="mo-only" /><strong
            class="price"
            >{{ refGramt.gramt.toLocaleString() }}</strong
          >원 입니다.
        </p>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use '../../../assets/style/pages/elrcpt/hltmInsrnc/InsrncPayPopup.scss';
</style>
