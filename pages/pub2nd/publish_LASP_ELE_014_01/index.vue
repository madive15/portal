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
          한국가정법률상담소 전자접수 신청
        </CommonTitle>
        <CommonTitle tag="h5" size="2" type="dot">
          개인정보 수집·이용에 관한 동의서
        </CommonTitle>
        <div class="receipt-form-info">
          <div class="info-box">
            <div class="info-top">
              법률구조법 제3조에 근거한 한국가정법률상담소는
              한국가정법률상담소가 제공하는 법률구조를 위하여 아래와 같은
              개인정보를 수집하고자 합니다. 이용자가 제공한 모든 정보는 목적에
              필요한 용도 이외로는 사용되지 않습니다.
            </div>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">
            <span class="num">1.</span>개인정보 수집 이용에 관한 사항
          </div>
          <CommonTable class="type-left mt-17px">
            <caption>
              개인정보 수집 이용에 관한 사항의 개인정보항목 및 고유식별번호,
              수집·이용목적, 보유 및 이용기간, 동의 거부 관리 및 불이익 내용
              에관한 표
            </caption>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 75%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" class="color-th">
                  개인정보항목 및<br class="pc-only" />
                  고유식별정보
                </th>
                <td class="reset-td">
                  <table>
                    <caption>
                      개인정보 수집 이용에 관한 사항의 필수사항, 선택사항 에관한
                      표
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">필수사항</th>
                        <th scope="col">선택사항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          성명, 주민등록번호, 연락처(전화번호, 휴대전화번호,
                          전자우편주소) 및 주민등록등(초)본, 가족관계증명서,
                          혼인관계증명서, 기본증명서 등 이에 준하는 증명력을
                          가진 문서
                        </td>
                        <td>가족과의 동거여부, 특이사항, 학력·재학여부</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th scope="row">수집·이용목적</th>
                <td>법률구조</td>
              </tr>
              <tr>
                <th scope="row">보유 및 이용기간</th>
                <td>
                  법률구조신청 취하시까지 혹은 관련 사건의 종결 후 5년까지
                  보관가능
                </td>
              </tr>
              <tr>
                <th scope="row">동의 거부 관리 및 불이익 내용</th>
                <td>법률구조 진행 제한</td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>본인은 상기 내용을 확인하였으며 위와
              같이 개인정보 수집·이용에 동의합니다.
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit"><span class="num">2.</span>제3자 정보제공 동의</div>
          <CommonTable class="type-left mt-17px">
            <caption>
              제3자 정보제공 동의의 제공받는자, 제공하는 항목, 이용목적, 보유 및
              이용기간, 동의 거부 관리 및 불이익 내용 에관한 표
            </caption>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 75%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row" rowspan="3">제공받는자</th>
                <td class="title-td">
                  한국가정법률상담소에서 법률구조 사건을 담당하도록 선정하여
                  위촉한 변호사
                </td>
              </tr>
              <tr>
                <td class="title-td">위탁기관</td>
              </tr>
              <tr>
                <td class="title-td">소송구조지원기관</td>
              </tr>
              <tr>
                <th scope="row">제공하는 항목</th>
                <td class="title-td">1항에 해당하는 개인정보</td>
              </tr>
              <tr>
                <th scope="row">이용목적</th>
                <td class="title-td">법률구조의 진행</td>
              </tr>
              <tr>
                <th scope="row">보유 및 이용기간</th>
                <td class="title-td">법률구조 사건의 종결시까지</td>
              </tr>
              <tr>
                <th scope="row">동의 거부 관리 및 불이익 내용</th>
                <td class="title-td">법률구조 진행 제한</td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>본인은 상기 내용을 확인하였으며 위와
              같이 개인정보 수집·이용에 동의합니다.
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit"><span class="num">3.</span>사례제공 동의</div>

          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>본인은 상기 내용을 확인하였으며 위와
              같이 개인정보 수집·이용에 동의합니다.
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit-box">
            <div class="tit">
              <span class="num">4.</span>본인은 본 동의서 내용과 개인정보
              수집·처리 및 제3자 제공에 관한 본인의 권리에 대하여 이해하고
              동의합니다.
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton width="xs">취소</CommonButton>
          <CommonButton variants="primary" width="xs">다음</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
