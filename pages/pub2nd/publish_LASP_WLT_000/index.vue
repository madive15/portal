<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonButton from '~/components/ui/button/button.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import TabItemAuto from '~/components/ui/tab/tabItemAuto.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import CommonTable from '~/components/ui/table/tables.vue';

// (선택) Ant Design Vue 체크박스 사용 시 주석 해제
// import { Checkbox as ACheckbox } from 'ant-design-vue';

definePageMeta({
  layout: 'pub2nd'
});

// 선택값 상태 (필요 시 사용)
const form = reactive({});

// 모달 제어
const modalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const showModal = () => modalRef.value?.open();
const closeModal = () => modalRef.value?.close();

// 탭
const tabTitle = ['내증명서', '보낸내역', '받은내역'];
const activeIndex = ref<number>(0);

// 날짜(탭1)
const startDt = ref<Date | null>(null);
const endDt = ref<Date | null>(null);

// 날짜(탭2)
const startDt1 = ref<Date | null>(null);
const endDt1 = ref<Date | null>(null);

onMounted(() => {
  showModal();
});

// 적용 버튼(예시)
const onApply = () => {
  closeModal();
};

// 탭 클릭 로깅
function handleClick(index: number) {
  console.log('클릭된 숫자 index:', index);
}

// 검색(예시)
function onSearchTab0() {
  console.log('탭0 검색', { startDt: startDt.value, endDt: endDt.value });
}
function onSearchTab1() {
  console.log('탭1 검색', { startDt: startDt1.value, endDt: endDt1.value });
}
</script>

<template>
  <div class="sub-content-box" style="height: 500px">
    <button type="button" class="btn-basic primary" @click="showModal">
      <span class="text">Open Modal</span>
    </button>

    <CommonModal ref="modalRef" title="전자증명서" :width="1100" :full="true">
      <div class="body-cont-wrap">
        <!-- 탭 -->
        <div class="common-category__button">
          <div class="btn-tab__wrap-gap">
            <TabItemAuto
              v-for="(tabItem, index) in tabTitle"
              :key="index"
              :modelValue="activeIndex === index"
              @update:modelValue="
                (val: boolean) => {
                  if (val) activeIndex = index;
                }
              "
              @click="handleClick(index)"
            >
              {{ tabItem }}
            </TabItemAuto>
          </div>
        </div>

        <!-- 탭 내용 -->
        <div v-if="activeIndex === 0">
          <BullList type="refMark">
            <li>
              전자증명서(개인사용자) 열람은 모바일서비스로 정부24앱을 통해
              확인하시기 바랍니다.
            </li>
            <li>
              법인사용자 개인에 발급/제출된 전자증명서의 열람은
              전자문서지갑포털(www.dpaper.kr)을 통해 확인하시기
              바랍니다.(공동인증서 필요)
            </li>
            <li>
              전자증명서 발급 유통 시스템은 최신 정보보호 보안기술이
              적용되었습니다.
            </li>
          </BullList>

          <div class="search-center__wrap">
            <div class="date-picker__group">
              <VueDatePicker
                name="writePeriodStart"
                id="write-period-start"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="startDt"
                locale="ko"
                :enable-time-picker="false"
                :format="'yyyy-MM-dd'"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="시작일 선택"
                hide-input-icon
              />
              <span class="more-span">~</span>
              <VueDatePicker
                name="writePeriodEnd"
                id="write-period-end"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="endDt"
                locale="ko"
                :enable-time-picker="false"
                :format="'yyyy-MM-dd'"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="마지막날 선택"
                hide-input-icon
              />
            </div>
            <div class="search-info__btns">
              <button type="button" class="btn btn-sch" @click="onSearchTab0">
                <span class="text">검색</span>
              </button>
            </div>
          </div>

          <CommonTable>
            <caption>
              내증명서 목록의 선택, 발급서류, 발급일자, 보낸기간 관련 표
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 47%" />
              <col style="width: 20%" />
              <col style="width: 25%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">선택</th>
                <th scope="col">발급서류</th>
                <th scope="col">발급일자</th>
                <th scope="col">보낸기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <!-- 전역/지역 등록된 체크박스 사용 -->
                  <a-checkbox class="check-bx" />
                </td>
                <td>가족관계증명서(상세)</td>
                <td>2025-05-25</td>
                <td class="blue">2025-05-25일까지(90일)</td>
              </tr>
            </tbody>
          </CommonTable>

          <!-- 데이터 없는 경우 노출 -->
          <div class="board-empty-box d-none">
            <div class="img-box">
              <img src="/image/sub/customer/none.svg" alt="" />
            </div>
            <div class="text-box">
              <p>검색된 결과가 존재하지 않습니다.</p>
            </div>
          </div>
          <!-- // 데이터 없는 경우 노출 -->

          <div class="common-btn__area right">
            <button type="button" class="primary btn-basic w-sm">
              <span class="text">보내기</span>
            </button>
          </div>
        </div>

        <div v-else-if="activeIndex === 1">
          <BullList type="refMark">
            <li>
              전자증명서(개인사용자) 열람은 모바일서비스로 정부24앱을 통해
              확인하시기 바랍니다.
            </li>
            <li>
              법인사용자 개인에 발급/제출된 전자증명서의 열람은
              전자문서지갑포털(www.dpaper.kr)을 통해 확인하시기
              바랍니다.(공동인증서 필요)
            </li>
            <li>
              전자증명서 발급 유통 시스템은 최신 정보보호 보안기술이
              적용되었습니다.
            </li>
          </BullList>

          <div class="search-center__wrap">
            <div class="date-picker__group">
              <VueDatePicker
                name="writePeriodStart1"
                id="write-period-start1"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="startDt1"
                locale="ko"
                :enable-time-picker="false"
                :format="'yyyy-MM-dd'"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="시작일 선택"
                hide-input-icon
              />
              <span class="more-span">~</span>
              <VueDatePicker
                name="writePeriodEnd1"
                id="write-period-end1"
                :year-range="[
                  new Date().getFullYear() - 5,
                  new Date().getFullYear() + 5
                ]"
                v-model="endDt1"
                locale="ko"
                :enable-time-picker="false"
                :format="'yyyy-MM-dd'"
                :auto-apply="true"
                :clearable="false"
                :transitions="false"
                :highlight-week-days="[0]"
                :week-start="0"
                placeholder="마지막날 선택"
                hide-input-icon
              />
            </div>
            <div class="search-info__btns">
              <button type="button" class="btn btn-sch" @click="onSearchTab1">
                <span class="text">검색</span>
              </button>
            </div>
          </div>

          <CommonTable class="pc-only">
            <caption>
              보낸내역 목록의 선택, 발급서류, 발급일자, 제출일자, 보낸기간,
              제출기관(열람번호), 현재상태 관련 표
            </caption>
            <colgroup>
              <col style="width: 6%" />
              <col style="width: 28%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 12%" />
              <col style="width: 20%" />
              <col style="width: 10%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">선택</th>
                <th scope="col">발급서류</th>
                <th scope="col">발급일자</th>
                <th scope="col">제출일자</th>
                <th scope="col">보낸기간</th>
                <th scope="col">제출기관<br />(열람번호)</th>
                <th scope="col">현재상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a-checkbox class="check-bx" /></td>
                <td>가족관계증명서(상세)</td>
                <td>2025-05-25</td>
                <td>2025-05-26</td>
                <td class="blue">2025-08-24까지(90일)</td>
                <td>OO기관(1234-5678)</td>
                <td>열람완료</td>
              </tr>
            </tbody>
          </CommonTable>

          <div class="common-table__list mo-only">
            <ul>
              <li>
                <div class="table-mo-cont">
                  <dl>
                    <dt>선택</dt>
                    <dd><a-checkbox class="check-bx" /></dd>
                  </dl>
                  <dl>
                    <dt>발급서류</dt>
                    <dd>가족관계증명서(상세)</dd>
                  </dl>
                  <dl>
                    <dt>발급일자</dt>
                    <dd>2025-05-25</dd>
                  </dl>
                  <dl>
                    <dt>제출일자</dt>
                    <dd>2025-05-26</dd>
                  </dl>
                  <dl>
                    <dt>보낸기간</dt>
                    <dd>2025-08-24까지(90일)</dd>
                  </dl>
                  <dl>
                    <dt>제출기관<br />(열람번호)</dt>
                    <dd>OO기관(1234-5678)</dd>
                  </dl>
                  <dl>
                    <dt>현재상태</dt>
                    <dd>열람완료</dd>
                  </dl>
                </div>
              </li>
            </ul>
          </div>

          <!-- 데이터 없는 경우 노출 -->
          <div class="board-empty-box d-none">
            <div class="img-box">
              <img src="/image/sub/customer/none.svg" alt="" />
            </div>
            <div class="text-box">
              <p>검색된 결과가 존재하지 않습니다.</p>
            </div>
          </div>
          <!-- // 데이터 없는 경우 노출 -->

          <div class="common-btn__area right">
            <button type="button" class="primary btn-basic w-sm">
              <span class="text">보내기 취소</span>
            </button>
          </div>
        </div>

        <div v-else>2222</div>
      </div>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
@media (max-width: 1199px) {
  :deep(.date-picker__group:has(.more-span) .dp__main .dp__input_wrap input) {
    height: 50px;
  }
}
</style>
