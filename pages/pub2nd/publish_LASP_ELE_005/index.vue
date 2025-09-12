<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CommonModal from '~/components/ui/modal/modal.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'pub2nd'
});

// 샘플 데이터
const sampleData = ref([
  { name: '홍길동', price1: '1,000,000,000', price2: '4,166,667' },
  { name: '홍이동', price1: '1,000,000,000', price2: '4,166,667' }
]);
const sampleData2 = ref([
  {
    subscriberClass: '지역가입자',
    name: '홍길동',
    incomeScore: '100',
    price3: '1,000,000,000',
    price4: '4,166,667'
  },
  {
    subscriberClass: '건강보험미가입자(피부양자)',
    name: '홍이동',
    incomeScore: '10',
    price3: '1,000,000,000',
    price4: '4,166,667'
  }
]);

const inputTextData = ref('');

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
      ref="modalRef"
      title="구조대상자 해당여부 계산하기"
      :width="1100"
      :full="true"
    >
      <div class="body-cont-wrap">
        <div class="incidents-info-box">
          <div class="txt-box">
            <span class="ico-incidents-info"></span>
            <div class="info-txt-box">
              <div class="box">
                <strong class="info-tit">알아두세요</strong>
                <BullList type="dot" class="!gap-y-10px">
                  <li>가구원 중 소득이 있는자는 모두 입력하시기 바랍니다.</li>
                  <li>
                    직장가입자의 건강보험료 입력 지역가입자는
                    소득점수(건강보험료 고지서) 또는 연소득 중 하나만 입력하시기
                    바랍니다.
                  </li>
                  <li>
                    가구원수 입력을 해야 법률주고대상자 해당여부를 확인할 수
                    있습니다.
                  </li>
                </BullList>
              </div>
            </div>
          </div>
        </div>
        <h2 class="modal-tit2 circle">가구당 월평균 소득 판단</h2>
        <ul class="income-list">
          <li>
            <div class="income-area">
              <div class="wrap">
                <div class="head-box">
                  <h3>직장가입자의 월평균 소득 정보를 입력해주세요.</h3>
                  <p>(여러명의 경우 추가 버튼을 눌러 추가하여 입력가능)</p>
                </div>
                <div class="cont-box">
                  <div class="top-info-box">
                    <p>
                      행정정보공동이용제공동의 시 온라인으로 건강보험 납입내역
                      조회 가능합니다.
                    </p>

                    <CommonButton variants="line-blue" width="lg" height="md">
                      건강보험 납입조회
                    </CommonButton>
                  </div>
                  <div class="tit-box">
                    <h4 class="modal-tit3 arrow">직장가입자</h4>
                    <CommonButton
                      variants="primary"
                      height="sm"
                      class="!w-65px"
                    >
                      추가
                    </CommonButton>
                  </div>
                  <CommonTable class="pc-only">
                    <caption>
                      직장가입자의 성명, 건강보험료, 월소득, 수정/삭제 편집 대한
                      표
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">성명</th>
                        <th scope="col">건강보험료</th>
                        <th scope="col">월소득</th>
                        <th scope="col">
                          <span class="sr-only">수정/삭제 편집</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in sampleData" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price1 }}</td>
                        <td>{{ item.price2 }}</td>
                        <td>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </CommonTable>
                  <!-- 모바일 레이아웃 -->
                  <div class="common-table__list mo-only">
                    <ul>
                      <li>
                        <div class="income-mo-table-cont">
                          <div class="info-dl-box">
                            <dl>
                              <dt>성명</dt>
                              <dd>홍길동</dd>
                            </dl>
                            <dl>
                              <dt>건강보험료</dt>
                              <dd>1,000,000,000</dd>
                            </dl>
                            <dl>
                              <dt>월소득</dt>
                              <dd>4,166,667</dd>
                            </dl>
                          </div>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="income-mo-table-cont">
                          <div class="info-dl-box">
                            <dl>
                              <dt>성명</dt>
                              <dd>홍길동</dd>
                            </dl>
                            <dl>
                              <dt>건강보험료</dt>
                              <dd>1,000,000,000</dd>
                            </dl>
                            <dl>
                              <dt>월소득</dt>
                              <dd>4,166,667</dd>
                            </dl>
                          </div>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="total-info-wrap type-center">
                <p>소계는 <strong class="price">4,666,667</strong> 입니다.</p>
              </div>
            </div>
          </li>
          <li>
            <div class="income-area">
              <div class="wrap">
                <div class="head-box">
                  <h3>
                    지역가입자 또는 건강보험료 미가입자의 월평균 소득 정보를
                    입력해주세요.
                  </h3>
                  <p>(여러명의 경우 추가 버튼을 눌러 추가하여 입력가능)</p>
                </div>
                <div class="cont-box">
                  <div class="tit-box">
                    <h4 class="modal-tit3 arrow">
                      지역가입자 또는 건강보험 미가입자
                    </h4>
                    <CommonButton
                      variants="primary"
                      height="sm"
                      class="!w-65px"
                    >
                      추가
                    </CommonButton>
                  </div>
                  <CommonTable class="pc-only">
                    <caption>
                      지역가입자 또는 건강보험 미가입자의 구분, 성명, 소득점수,
                      연소득, 월소득, 수정/삭제 편집 대한 표
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">구분</th>
                        <th scope="col">성명</th>
                        <th scope="col">연소득</th>
                        <th scope="col">건강보험료</th>
                        <th scope="col">월소득</th>
                        <th scope="col">
                          <span class="sr-only">수정/삭제 편집</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in sampleData2" :key="index">
                        <td>{{ item.subscriberClass }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.incomeScore }}</td>
                        <td>{{ item.price3 }}</td>
                        <td>{{ item.price4 }}</td>
                        <td>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </CommonTable>

                  <!-- 모바일 레이아웃 -->
                  <div class="common-table__list mo-only">
                    <ul>
                      <li>
                        <div class="income-mo-table-cont">
                          <div class="info-dl-box">
                            <dl>
                              <dt>구분</dt>
                              <dd>지역가입자</dd>
                            </dl>
                            <dl>
                              <dt>성명</dt>
                              <dd>건강보험미가입자(피부양자)</dd>
                            </dl>
                            <dl>
                              <dt>소득점수</dt>
                              <dd>100</dd>
                            </dl>
                            <dl>
                              <dt>연소득</dt>
                              <dd>1,000,000,000</dd>
                            </dl>
                            <dl>
                              <dt>월소득</dt>
                              <dd>4,166,667</dd>
                            </dl>
                          </div>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="income-mo-table-cont">
                          <div class="info-dl-box">
                            <dl>
                              <dt>구분</dt>
                              <dd>지역가입자</dd>
                            </dl>
                            <dl>
                              <dt>성명</dt>
                              <dd>건강보험미가입자(피부양자)</dd>
                            </dl>
                            <dl>
                              <dt>소득점수</dt>
                              <dd>10</dd>
                            </dl>
                            <dl>
                              <dt>연소득</dt>
                              <dd>1,000,000,000</dd>
                            </dl>
                            <dl>
                              <dt>월소득</dt>
                              <dd>4,166,667</dd>
                            </dl>
                          </div>
                          <div class="btn-box">
                            <CommonButton
                              variants="line-blue"
                              height="sm"
                              class="!w-[65px]"
                            >
                              수정
                            </CommonButton>
                            <CommonButton height="sm" class="!w-[65px]">
                              삭제
                            </CommonButton>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="total-info-wrap type-center">
                <p>소계는 <strong class="price">4,666,667</strong> 입니다.</p>
              </div>
            </div>
          </li>
          <li>
            <div class="income-area">
              <div class="wrap">
                <div class="head-box">
                  <h3>가구원수를 입력해주세요.</h3>
                  <p>(소득여부와 관계 없이 총 가구원수를 입력)</p>
                </div>
                <div class="cont-box">
                  <div class="form-box">
                    <div class="input-box">
                      <label for="ipText">가구원수</label>
                      <a-input
                        id="ipText"
                        class="text-bx"
                        v-model:value="inputTextData"
                      />
                      <span>명</span>
                    </div>

                    <CommonButton variants="line-blue" width="lg" height="md">
                      기준중위소득 확인하기
                    </CommonButton>
                  </div>
                </div>
              </div>
              <div class="total-info-wrap">
                <p>소계는 <strong class="price">4,666,667</strong> 입니다.</p>
                <p>
                  월평균 소득이 국내거주외국인의 기준중위소득 150%(5,898,987원)
                  이하이므로 법률구조대상자에
                  <span class="color-red">해당</span> 합니다.
                </p>
              </div>
              <div class="total-info-wrap">
                <p>소계는 <strong class="price">4,666,667</strong> 입니다.</p>
                <p>
                  월평균 소득이 국내거주외국인의 기준중위소득 150%(5,898,987원)
                  이하이므로 법률구조대상자에
                  <span class="color-red">비해당</span> 합니다.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <template #footer>
        <CommonButton variants="primary" width="xs">적용</CommonButton>
        <CommonButton width="xs"> 닫기 </CommonButton>
      </template>
    </CommonModal>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
