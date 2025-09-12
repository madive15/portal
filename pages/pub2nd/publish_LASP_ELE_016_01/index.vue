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
          대한변협법률구조재단 전자접수 신청
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
                <th scope="row">
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
          <div class="tit"><span class="num">3.</span>개인정보처리 동의</div>

          <div class="receipt-form-info">
            <div class="info-box">
              <div class="info-top">
                <p>
                  신청자는 위 기재 법률구조신청과 관련하여
                  대한변협법률구조재단이 개인정보보호법에서 정한
                  민감정보(건강정보, 유전정보 등), 고유식별정보(주민등록번호,
                  외국인등록번호 등)가 포함된 자료를 제출받은 경우에
                  법률구조사무를 수행하기 위하여 해당 개인정보를 처리하는데
                  동의하며, 또한 개인정보 보유 및 이용기간은 재단의 문서사무 등
                  관리 제 규범에 의하여 처리하겠다는 것과 개인정보처리에 대한
                  동의를 거부할 권리가 있다는 사실 및 동의 거부 시에 법률구조를
                  받을 수 없는 불이익이 따를 수 있다는 사실을 충분히 설명 듣고
                  이해하였습니다.
                </p>
              </div>
            </div>
          </div>

          <div class="guide-box">
            <div class="txt"></div>
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
