<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import CommonPagenation from '~/components/ui/pagenation/pagination.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'pub2nd'
});

const radioSelected = ref('');
const dropdownOption = ref('');
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '이첩목록', to: '/test1' }]"
          breadcrumbTitle="이첩 목록"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4 class="sr-only">전자송달관리 정보</h4>
        <div class="common-form__area">
          <table>
            <caption>
              전자송달관리 조회의 검색어, 기간조회 관련 표
            </caption>
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">검색어</th>
                <td>
                  <div class="flex-box">
                    <a-select
                      id="select1"
                      class="common-select"
                      title="검색어 선택"
                    >
                      <a-select-option value="받는사람"
                        >받는사람</a-select-option
                      >
                      <a-select-option value="보낸사람"
                        >보낸사람</a-select-option
                      >
                      <a-select-option value="받는사람휴대폰번호"
                        >받는사람휴대폰번호</a-select-option
                      >
                    </a-select>
                    <a-form-item
                      name="search"
                      label="검색어 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" placeholder="검색어 입력" />
                    </a-form-item>
                    <div class="btn-area">
                      <CommonButton variants="line-primary" width="sm-1"
                        >옵션</CommonButton
                      >
                      <CommonButton variants="primary" width="sm-1"
                        >검색</CommonButton
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="search-info__wrap mt-3">
          <strong> 총 <span>1,300</span>건이 있습니다. </strong>
          <CommonButton type="button" variants="primary" width="md" height="md"
            >이첩등록</CommonButton
          >
        </div>
        <CommonTable class="pc-only">
          <caption>
            문자발송목록 내역의 순번, 보낸사람, 등록일시, 발송일시,
            받는사람휴대폰, 선택 탬플릿명 관련 표
          </caption>
          <colgroup>
            <col style="width: 6%" />
            <col style="width: 5%" />
            <col style="width: auto" />
            <col style="width: 6%" />
            <col style="width: auto" />
            <col style="width: 6%" />
            <col style="width: auto" />
            <col style="width: 6%" />
            <col style="width: auto" />
            <col style="width: 7%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">이첩번호</th>
              <th scope="col">송/수신</th>
              <th scope="col">대상기관</th>
              <th scope="col">이첩일자</th>
              <th scope="col">사건명</th>
              <th scope="col">신청인</th>
              <th scope="col">신청인 연락처</th>
              <th scope="col">담당자</th>
              <th scope="col">담당자 연락처</th>
              <th scope="col">진행상태</th>
              <th scope="col">업무고유번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FI002I001001</td>
              <td>송신</td>
              <td>대한법률구조공단</td>
              <td>25.07.25</td>
              <td>양육비 이행에 따른 소송</td>
              <td>홍이순</td>
              <td>010-1234-5678</td>
              <td>홍이순</td>
              <td>02-000-0000</td>
              <td>-</td>
              <td>SI0040001</td>
            </tr>
            <tr>
              <td>FI004I002001</td>
              <td>수신</td>
              <td>대한변협법률구조재단</td>
              <td>25.07.25</td>
              <td>친자확인에 따른 소송문의</td>
              <td>홍길동</td>
              <td>010-1111-2222</td>
              <td>홍길동</td>
              <td>02-000-0000</td>
              <td>상담종결</td>
              <td>SI0040001</td>
            </tr>
            <tr>
              <td>FI002I001001</td>
              <td>송신</td>
              <td>대한법률구조공단</td>
              <td>25.07.25</td>
              <td>합의 이혼후 양육비 소송</td>
              <td>홍이동</td>
              <td>010-1111-2222</td>
              <td>홍이동</td>
              <td>02-000-0000</td>
              <td>구조결정</td>
              <td>SI0040001</td>
            </tr>
            <tr>
              <td>FI004I002001</td>
              <td>수신</td>
              <td>대한변협법률구조재단</td>
              <td>25.07.25</td>
              <td>양육비 이행에 따른 소송</td>
              <td>김시리</td>
              <td>010-1111-2222</td>
              <td>김시리</td>
              <td>02-000-0000</td>
              <td>소제기</td>
              <td>TS000029283</td>
            </tr>
            <tr>
              <td>FI002I001001</td>
              <td>수신</td>
              <td>대한법률구조공단</td>
              <td>25.07.25</td>
              <td>친자확인에 따른 소송문의 송</td>
              <td>이상일</td>
              <td>010-1111-2222</td>
              <td>이상일</td>
              <td>02-000-0000</td>
              <td>진행종결</td>
              <td>TS000029283</td>
            </tr>
            <tr>
              <td>FI004I002001</td>
              <td>수신</td>
              <td>양육비이행관리원</td>
              <td>25.07.25</td>
              <td>합의 이혼후 양육비 소송</td>
              <td>이상하</td>
              <td>010-1111-2222</td>
              <td>이상하</td>
              <td>02-000-0000</td>
              <td>취하</td>
              <td>TS000029283</td>
            </tr>
          </tbody>
        </CommonTable>
        <div class="common-table__list mo-only">
          <ul>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI002I001001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>송신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>양육비 이행에 따른 소송</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>홍이순</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1234-5678</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>홍이순</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>진행상태</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>SI0040001</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI004I002001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>수신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>대한변협법률구조재단</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>친자확인에 따른 소송문의</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>홍길동</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1111-2222</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>홍길동</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>상담종결</dt>
                  <dd>-</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>SI0040001</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI002I001001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>송신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>합의 이혼후 양육비 소송</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>홍이동</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1111-2222</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>홍이동</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>진행상태</dt>
                  <dd>구조결정</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>SI0040001</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI002I001001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>수신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>대한변협법률구조재단</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>양육비 이행에 따른 소송</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>김시리</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1111-2222</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>김시리</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>진행상태</dt>
                  <dd>소제기</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>TS000029283</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI002I001001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>수신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>대한법률구조공단</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>친자확인에 따른 소송문의</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>이상일</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1111-2222</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>이상일</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>진행상태</dt>
                  <dd>진행종결</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>TS000029283</dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="table-mo-cont">
                <dl>
                  <dt>이첩번호</dt>
                  <dd>FI002I001001</dd>
                </dl>
                <dl>
                  <dt>송/수신</dt>
                  <dd>수신</dd>
                </dl>
                <dl>
                  <dt>대상기관</dt>
                  <dd>양육비이행관리원</dd>
                </dl>
                <dl>
                  <dt>이첩일자</dt>
                  <dd>25.07.25</dd>
                </dl>
                <dl>
                  <dt>사건명</dt>
                  <dd>합의 이혼후 양육비 소송</dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>이상하</dd>
                </dl>
                <dl>
                  <dt>신청인 연락처</dt>
                  <dd>010-1111-2222</dd>
                </dl>
                <dl>
                  <dt>담당자</dt>
                  <dd>이상하</dd>
                </dl>
                <dl>
                  <dt>담당자 연락처</dt>
                  <dd>02-000-0000</dd>
                </dl>
                <dl>
                  <dt>진행상태</dt>
                  <dd>취하</dd>
                </dl>
                <dl>
                  <dt>업무고유번호</dt>
                  <dd>TS000029283</dd>
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
        <CommonPagenation
          :page="1"
          :size="10"
          :total-elements="100"
          :show-pagination-count="10"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
