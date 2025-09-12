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
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';
import AllyFileButton from '~/components/ui/a11y-file-button/index.vue';

definePageMeta({
  layout: 'pub2nd'
});

const activeKey = ref([1, 2, 3, 4]);
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '이첩상세', to: '/test1' }]"
          breadcrumbTitle="이첩상세"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <Accordion v-model:activeKey="activeKey" variant="gray">
          <template #expandIcon="{ isActive }">
            <AccordionIcon :isActive="isActive" />
          </template>
          <AccordionItem key="1">
            <template #header>
              <AccordionHead title="사건 정보"> </AccordionHead>
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  사건 및 담당자 정보의 이첩기관, 업무고유번호, 담당자명, 담당자
                  연락처, 담당자 이메일 주소, 부서명, 사건명, 사건내용
                  입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      이첩기관
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>[수신] 양육비이행관리원</td>
                    <th scope="row">업무고유번호</th>
                    <td>이행관리원의 접수번호</td>
                  </tr>
                  <tr>
                    <th scope="row">담당자명</th>
                    <td>홍길동</td>
                    <th scope="row">담당자 연락처</th>
                    <td>010-1234-5678</td>
                  </tr>
                  <tr>
                    <th scope="row">담당자이메일주소</th>
                    <td>kingkorea@korea.kr</td>
                    <th>담당자 부서명</th>
                    <td>사건을 이첩한 담당자의 부서명</td>
                  </tr>
                  <tr>
                    <th scope="row">사건명</th>
                    <td colspan="3">양육비 이행에 따른 소송</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      사건내용
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">
                      이혼 후 배우자가 양육비를 이행하지 않고 있고, 연락이
                      두절된상태. 사건내용 어쩌구 저쩌구 …
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="2">
            <template #header>
              <AccordionHead title="신청인 정보"> </AccordionHead>
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  신청인 정보의 신청인 성명, 생년월일(주민번호), 담당자명,
                  담당자 연락처, 담당자 이메일 주소, 부서명, 사건명, 사건내용
                  입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">신청인 성명</th>
                    <td>홍길동</td>
                    <th scope="row">생년월일</th>
                    <td>801204</td>
                  </tr>
                  <tr>
                    <th scope="row">주소</th>
                    <td colspan="3">04534 서울 중구 을지로 50 한국빌딩 8층</td>
                  </tr>
                  <tr>
                    <th scope="row">연락처</th>
                    <td>010-1234-5678</td>
                    <th scope="row">이메일</th>
                    <td>test@naver.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="3">
            <template #header>
              <AccordionHead title="상대방 정보"> </AccordionHead>
            </template>
            <div class="common-form__area">
              <table>
                <caption>
                  상대방 정보의 신청인 성명, 생년월일(주민번호), 주소,
                  휴대전화번호, 전화번호, 이메일 주소 입력에관한 표
                </caption>
                <tbody>
                  <tr>
                    <th scope="row">
                      신청인 성명(법인명)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>김갑수</td>
                    <th scope="row">
                      생년월일<br />(주민번호/법인번호)
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>781122</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">주소</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      휴대전화번호
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td>010-0000-0000</td>
                    <th scope="row">전화번호</th>
                    <td>02-0000-0000</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      이메일주소
                      <span class="red-span">
                        *<span class="sr-only">필수 입력 항목</span>
                      </span>
                    </th>
                    <td colspan="3">kingkorea@korea.kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionItem>
          <AccordionItem key="4">
            <template #header>
              <AccordionHead title="첨부파일 정보"> </AccordionHead>
            </template>
            <CommonTable>
              <caption>
                첨부파일 정보 추가 삭제에 관한 표
              </caption>
              <colgroup>
                <col style="width: 35%" />
                <col style="width: 65%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">파일설명</th>
                  <th scope="col">첨부파일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>주민등록등본</td>
                  <td>파일명 표시</td>
                </tr>
                <tr>
                  <td>사건내용설명</td>
                  <td>파일명 표시</td>
                </tr>
              </tbody>
            </CommonTable>
          </AccordionItem>
        </Accordion>

        <ButtonGroup align="right" class="!mt-50px">
          <CommonButton variants="line-primary" width="xs"> 목록 </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
