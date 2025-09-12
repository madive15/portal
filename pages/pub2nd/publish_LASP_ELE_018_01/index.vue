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
          breadcrumbTitle="전자접수 신청"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar">
          이용약관 (필수사항)
        </CommonTitle>
        <div class="list-box">
          <div class="list-scrolled">
            <div class="box-item">
              <h5 class="title-heading-2">제1장 총칙</h5>
              <div class="txt">
                이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용
              </div>
            </div>
            <div class="box-item">
              <h5 class="title-heading-2">나. 수집하는 개인정보의 항목</h5>
              <ul class="counsel-bull-list">
                <li>
                  필수항목 : 성명, 이메일주소, 휴대전화번호, 전화번호 등
                  예약상담 필수입력 항목
                </li>
                <li>
                  선택항목 : 예약상담 접수를 위한 예약신청서상의 선택입력 항목
                </li>
              </ul>
            </div>
            <div class="box-item">
              <h5 class="title-heading-2">
                다. 개인정보의 보유 및 이용기간 (법적근거 또는 내부결재문서
                근거)
              </h5>
              <div class="txt">
                이용자 개인정보는 원칙적으로 개인정보의 처리목적이 달성되면
                지체없이 파기합니다.<br />
                단, 다음의 정보는 아래의 사유로 명시한 기간 동안 보존합니다.
              </div>
              <ul class="counsel-bull-list">
                <li>법률상담 예약정보</li>
              </ul>
              <div class="txt">
                - 보존항목 : 이름, 휴대폰번호, 전화번호, 이메일주소<br />
                - 보존기간 : 10년<br />
                - 보존근거 : 문서사무등 관리규칙 시행규정
              </div>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="check-input" />
            <label class="form-check-label" for="check-input">
              본인은 이용약관을 확인하였고 이에 동의합니다(필수)
            </label>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          개인정보 수집 및 이용동의 (필수사항)
        </CommonTitle>
        <div class="list-box">
          <div class="list-scrolled">
            <div class="box-item">
              <h5 class="title-heading-2">제1장 총칙</h5>
              <div class="txt">
                이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용
              </div>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="check-input" />
            <label class="form-check-label" for="check-input">
              본인은 개인정보 수집 및 이용동의를 확인하였고 이에
              동의합니다(필수)
            </label>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar">
          개인정보의 제3자 제공 동의 (필수사항)
        </CommonTitle>
        <div class="list-box">
          <div class="list-scrolled">
            <div class="box-item">
              <h5 class="title-heading-2">제1장 총칙</h5>
              <div class="txt">
                이용약관 내용 (법률구조공단 전자접수 회원가입 약관) 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용 내용내용 내용내용
                내용내용 내용내용 내용내용 내용내용 내용내용
              </div>
            </div>
          </div>
        </div>
        <div class="input-box">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="check-input" />
            <label class="form-check-label" for="check-input">
              본인은 개인정보 수집 및 이용동의를 확인하였고 이에
              동의합니다(필수)
            </label>
          </div>
        </div>

        <CommonTitle tag="h4" size="1" type="bar"> 추가정보 </CommonTitle>
        <div class="common-form__area colgroup">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <table>
            <caption>
              전자접수 추가정보의 송달주소, 전화번호, 행정정보공동 이용동의, SMS
              알림수신동의, 이메일알림수신동의 입력에관한 표
            </caption>
            <colgroup>
              <col width="12%" />
              <col width="38%" />
              <col width="12%" />
              <col width="38%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  송달주소
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td colspan="3">
                  <div class="form-group-box">
                    <a-checkbox class="check-bx" value="" name="type">
                      회원가입 주소랑 동일하게 입력
                    </a-checkbox>
                    <div class="form-item__addr">
                      <div class="item-column">
                        <a-form-item
                          name="addr"
                          label="주소"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input class="text-bx" />
                        </a-form-item>
                        <button type="button" class="btn-basic primary">
                          <span class="text">우편번호 찾기</span>
                        </button>
                      </div>
                      <a-form-item
                        name="addr2"
                        label="주소상세2"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx full" />
                      </a-form-item>

                      <a-form-item
                        name="addr3"
                        label="주소상세3"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx full" />
                      </a-form-item>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  전화번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
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
                </td>
                <th scope="row">
                  행정정보공동 이용동의
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-group-box flow-row">
                    <a-radio-group>
                      <a-radio class="radio-bx" value="">동의</a-radio>
                      <a-radio class="radio-bx" value="">비동의</a-radio>
                    </a-radio-group>
                    <CommonButton>
                      자세히 보기
                      <template #right-icon>
                        <Icon name="arrowRight" />
                      </template>
                    </CommonButton>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  SMS 알림수신동의
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <a-radio-group>
                    <a-radio class="radio-bx" value="">동의</a-radio>
                    <a-radio class="radio-bx" value="">비동의</a-radio>
                  </a-radio-group>
                </td>
                <th scope="row">
                  이메일알림수신동의
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <a-radio-group>
                    <a-radio class="radio-bx" value="">동의</a-radio>
                    <a-radio class="radio-bx" value="">비동의</a-radio>
                  </a-radio-group>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="line-primary" width="lg">
            취소하기
          </CommonButton>
          <CommonButton variants="primary" width="lg">
            전자접수 계속하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
