<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import ImgBox from '~/components/display/img-box/index.vue';
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
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="상사중재 관련 상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-top-header">
          <div class="inner">
            <div class="top-logo">
              <img src="/image/sub/counsel/counsel_top_txt_08.png" alt="KCAB" />
            </div>
            <div class="top-infos">
              <div class="top-desc">
                <p>
                  <strong>대한상사중재원</strong>은 1966. 3. 22. 설립된 상설
                  법정 중재기관으로 국내외 상거래에서 발생하는 분쟁을 사전에
                  예방하고 발생된 분쟁을<br class="pc-only" />
                  중재·조정·알선을 통하여 신속하고 공정하게 해결함으로써 건전한
                  상거래 풍토를 조성하고 나아가 국가산업경제 발전에 기여하고
                  있습니다.
                </p>
              </div>
              <div class="top-links">
                <strong>기관 관련 페이지 : </strong>
                <div class="btns">
                  <CommonButton
                    height="sm"
                    fontsize="sm"
                    variants="line-primary"
                  >
                    온라인 문의
                    <template #right-icon>
                      <Icon name="shortcutBlue" />
                    </template>
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 주요업무 </CommonTitle>
        <div class="bull-list-boxs">
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon01.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>중재</strong>
                <BullList type="dot" class="mt-0">
                  <li>
                    대한상사중재원은 중재법에 의한 중재를 수행하고 있으며 이러한
                    중재판정은 법원의 확정판결과 동일한 효력이 인정되며 국제적
                    효력이 부여됩니다.
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon02.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>조정</strong>
                <BullList type="dot" class="mt-0">
                  <li>
                    조정은 분쟁해결전문가인 조정인이 당사자가 원만하게 합의에
                    이르도록 도와주는 절차로, 대한상사중재원은 일반조정,
                    법원연계형 조기조정을 수행하고 있습니다.
                  </li>
                </BullList>
              </div>
            </div>
          </div>
          <div class="bull-list-box">
            <div class="bull-list-box-item">
              <div class="icon">
                <img
                  src="/image/sub/counsel/counsel_top_txt_08_icon03.png"
                  alt=""
                />
              </div>
              <div class="txt">
                <strong>알선</strong>
                <BullList type="dot" class="mt-0">
                  <li>
                    대한상사중재원의 분쟁종합지원센터의 분쟁해결경험과 지식이
                    풍부한 직원이 개입하여 당사자간의 원만한 해결을 주선합니다.
                  </li>
                </BullList>
              </div>
            </div>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 상담안내 </CommonTitle>
        <div class="bull-list-box">
          <BullList type="refMark" class="mt-0">
            <li class="!text-[16px] !text-[#222]">
              <div>
                <strong>
                  대한상사중재원은 국내외 각종 상거래 분쟁에 대하여 분쟁해결방법
                  등에 관한 상담을 수행하고 있습니다.
                </strong>
                <ul class="sub-list">
                  <li>
                    <span class="num">-</span>기업 간 또는 개인과 기업 간
                    상거래에서 분쟁이 발생했거나 발생할 가능성이 있는 당사자
                  </li>
                  <li>
                    <span class="num">-</span>계약서에 중재 조항을 넣고자 하는
                    기업 또는 개인
                  </li>
                  <li>
                    <span class="num">-</span>중재 절차, 비용, 기간 등에 대해
                    궁금한 모든 분
                  </li>
                </ul>
              </div>
            </li>
            <li class="!text-[16px] !text-[#222]">
              <div>
                <strong>
                  대한상사중재원의 상담을 문의하시려면 아래 문의 내용을 아래
                  양식을 작성해서 등록하시기 바랍니다.
                </strong>
                <ul class="sub-list">
                  <li>
                    <span class="num">-</span>문의 내용은 담당자 확인 후 연락
                    드리겠습니다.
                  </li>
                </ul>
              </div>
            </li>
          </BullList>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 문의하기 </CommonTitle>
        <div class="common-form__area mt-17px">
          <table>
            <caption>
              사이버상담 상담내용입력의 공개여부, 제목, 내용 입력에관한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">
                  제목
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <a-form-item
                    name=""
                    label="제목"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  성명
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <a-form-item
                    name=""
                    label="성명"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  연락처
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-group-box">
                    <div class="form-item__number">
                      <a-form-item
                        name="mobile"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select class="common-select" placeholder="선택">
                          <a-select-option value="1">선택 1</a-select-option>
                          <a-select-option value="2">선택 2</a-select-option>
                        </a-select>
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile2"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile3"
                        label="전화번호"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  이메일
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-group-box">
                    <div class="form-item__email">
                      <a-form-item
                        name="email"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span class="dash">@</span>
                      <a-form-item
                        name="email2"
                        label="이메일"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <a-form-item
                        name="email3"
                        label="이메일 선택"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-select class="common-select" placeholder="선택">
                          <a-select-option value="1">선택 1</a-select-option>
                          <a-select-option value="2">선택 2</a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  내용
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <label for="textMessage">
                    <span class="sr-only">textarea</span>
                  </label>
                  <a-textarea
                    class="textarea-bx"
                    id="textMessage"
                    placeholder="최대 200자 입력 가능"
                    :maxlength="200"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">등록하기</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
