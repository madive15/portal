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
          대한법률구조공단 법률구조 신청
        </CommonTitle>
        <CommonTitle tag="h5" size="2" type="dot">
          법률구조신청을 위한 개인정보 수집‧이용 및 제3자 제공 동의서
        </CommonTitle>
        <div class="receipt-form-info">
          <div class="info-box">
            <div class="info-top">
              <p>
                대한법률구조공단은 법률구조 서비스 제공을 위하여 아래와 같이
                개인정보를 수집‧이용 및 제공하고자 합니다. 내용을 자세히 읽으신
                후 동의 여부를 결정하여 주십시오.
              </p>
            </div>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">
            <span class="num">1.</span>개인정보 수집‧이용 내역(필수사항)
          </div>
          <CommonTable class="mt-17px">
            <caption>
              개인정보 수집 이용에 관한 사항의 항목, 수집목적, 보유기간 에관한
              표
            </caption>
            <colgroup>
              <col style="width: 60%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">항목</th>
                <th scope="col">수집목적</th>
                <th scope="col">보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>
                    성명, 주소, 연락처, 생년월일, 직업(대상자 정보)
                  </strong>
                </td>
                <td><strong>법률구조신청</strong></td>
                <td><strong>영구</strong></td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="receipt-form-info">
            <div class="info-box">
              <div class="info-top">
                <p>
                  위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가. 그러나
                  동의를 거부할 경우 서비스 제공에 제한을 받을 수 있습니다.<br
                    class="pc-only"
                  />
                  (개인정보를 이용하여 귀하에게 상소심구조신청 등을
                  위하여있습니다 연락할 수 있습니다).
                </p>
              </div>
            </div>
          </div>
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>위와 같이 개인정보를 수집·이용하는 데
              동의하십니까?
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">
            <span class="num">2.</span>
            <div>
              선택적 개인정보 수집‧이용 내역(동의 거부 가능, 해당항목에
              <img
                src="/image/sub/receipt/receipt_form_check_icon.png"
                alt="체크"
              />
              )
            </div>
          </div>
          <CommonTable class="mt-17px">
            <caption>
              개인정보 수집 이용에 관한 사항의 항목, 수집목적, 보유기간 에관한
              표
            </caption>
            <colgroup>
              <col style="width: 60%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">항목</th>
                <th scope="col">수집목적</th>
                <th scope="col">보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a-checkbox-group>
                    <a-checkbox class="check-bx" value="1" name="type">
                      무료대상자 소명 정보
                    </a-checkbox>
                    <a-checkbox class="check-bx" value="2" name="type">
                      송달장소
                    </a-checkbox>
                    <a-checkbox class="check-bx" value="3" name="type">
                      연락처(이메일)
                    </a-checkbox>
                    <a-checkbox class="check-bx" value="4" name="type">
                      계좌번호
                    </a-checkbox>
                  </a-checkbox-group>
                </td>
                <td>
                  <strong>법률구조신청사건처리</strong>
                </td>
                <td><strong>10년</strong></td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="receipt-form-info">
            <div class="info-box">
              <div class="info-top">
                <p>
                  위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다.
                  그러나 동의를 거부할 경우 서비스 제공에 제한을 받을 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>위와 같이 개인정보를 수집·이용하는 데
              동의하십니까?
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">[기타 고지 사항]</div>
          <div class="receipt-form-info">
            <div class="info-box">
              <div class="info-top">
                <p>
                  개인정보 보호법 제15조제1항제2호, 제3호에 따라 정보주체의 동의
                  없이 아래와 같이 개인정보를 수집‧이용합니다.
                </p>
              </div>
            </div>
          </div>
          <CommonTable class="mt-17px">
            <caption>
              개인정보 수집 이용에 관한 사항의 개인정보 처리사유 , 개인정보 항목
              , 수집 근거 에관한 표
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 60%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">개인정보 처리사유</th>
                <th scope="col">개인정보 항목</th>
                <th scope="col">수집 근거</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>법률구조신청 사건의 처리 </strong>
                </td>
                <td>
                  <strong
                    >주민등록번호(외국인등록번호), 신청사실에 민감정보가 포함된
                    경우 그 정보
                  </strong>
                </td>
                <td>
                  <strong>｢법률구조법｣ 제8조, 같은 법 시행령 제4조의2 </strong>
                </td>
              </tr>
            </tbody>
          </CommonTable>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">
            <span class="num">3.</span>개인정보 제3자 제공 내역
          </div>
          <CommonTable class="mt-17px">
            <caption>
              개인정보 수집 이용에 관한 사항의 제공받는 기관, 제공목적, 제공하는
              항목, 보유기간 에관한 표
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">제공받는 기관</th>
                <th scope="col">제공목적</th>
                <th scope="col">제공하는 항목</th>
                <th scope="col">보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>출연기관＊ </strong>
                </td>
                <td>
                  <strong>소송비용상환 </strong>
                </td>
                <td>
                  <strong>성명, 사건번호, 대상자, 소송비용 </strong>
                </td>
                <td><strong>5년</strong></td>
              </tr>
            </tbody>
          </CommonTable>
          <div class="guide-box">
            <div class="txt">
              <span class="num">*</span>각 대상자에 따른
              공단「무료법률구조사업시행지침」제2조에 의한 출연기관
            </div>
          </div>
          <div class="receipt-form-info">
            <div class="info-box">
              <div class="info-top">
                <p>
                  위의 개인정보 수집‧이용에 대한 동의를 거부할 권리가 있습니다.
                  그러나 동의를 거부할 경우 서비스 제공에 제한을 받을 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
          <div class="guide-box">
            <div class="txt">
              <span class="num">※</span>위와 같이 개인정보를 수집·이용하는 데
              동의하십니까?
            </div>
            <a-radio-group>
              <a-radio class="radio-bx" value="">동의합니다.</a-radio>
              <a-radio class="radio-bx" value="">동의하지 않습니다.</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="receipt-agree-box">
          <div class="tit">
            <span class="num">4.</span>법률서면 등 활용 동의
          </div>

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
            <div class="txt">
              <span class="num">※</span>위와 같이 법률서면 등을 활용하는데
              동의하십니까?
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
