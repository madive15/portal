<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';

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
          breadcrumbTitle="사이버상담 문의"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1" type="bar"
          >대한법률구조공단 사이버상담 문의정보</CommonTitle
        >
        <CommonTitle tag="h5" size="2" type="dot">기본정보</CommonTitle>
        <div class="common-form__area">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <table>
            <caption>
              사이버상담 문의 기본정보의 성명, 전화번호, 휴대전화번호, 이메일,
              비밀번호, 비밀번호 확인, 방문가능 공단사무소, 인지경로 입력에관한
              표
            </caption>
            <tbody>
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
                    label="성명 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
                <th scope="row">전화번호</th>
                <td>
                  <div class="form-item__number">
                    <a-form-item
                      name="mobile"
                      label="일반전화 지역번호"
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
                      label="일반전화 가운데 자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                    <span class="dash">-</span>
                    <a-form-item
                      name="mobile3"
                      label="일반전화 마지막자리"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  휴대전화번호
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-group-box">
                    <div class="form-item__number">
                      <a-form-item
                        name="mobile"
                        label="휴대전화 식별번호"
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
                        label="휴대전화 가운데 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                      <span class="dash">-</span>
                      <a-form-item
                        name="mobile3"
                        label="휴대전화 마지막 자리"
                        :labelCol="{ class: 'sr-only' }"
                      >
                        <a-input class="text-bx" />
                      </a-form-item>
                    </div>
                    <a-checkbox class="check-bx" value="" name="type">
                      SMS 수신동의 (예약번호 수신 시 필요합니다.)
                    </a-checkbox>
                  </div>
                </td>
                <th scope="row">
                  이메일
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td>
                  <div class="form-item__email">
                    <a-form-item
                      name="email"
                      label="이메일 아이디 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                    <span class="dash">@</span>
                    <a-form-item
                      name="email2"
                      label="이메일 도메인 입력"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-input class="text-bx" />
                    </a-form-item>
                    <a-form-item
                      name="email3"
                      label="이메일 도메인 선택"
                      :labelCol="{ class: 'sr-only' }"
                    >
                      <a-select class="common-select" placeholder="선택">
                        <a-select-option value="1">선택 1</a-select-option>
                        <a-select-option value="2">선택 2</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">비밀번호</th>
                <td>
                  <a-form-item
                    name=""
                    label="비밀번호 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
                <th scope="row">비밀번호 확인</th>
                <td>
                  <a-form-item
                    name=""
                    label="비밀번호 확인"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
                </td>
              </tr>
              <tr>
                <th scope="row">방문가능 공단사무소</th>
                <td colspan="3">
                  <div class="selct-form-box">
                    <a-select id="" class="common-select" title="지역선택">
                      <a-select-option value="1">지역1</a-select-option>
                      <a-select-option value="2">지역2</a-select-option>
                    </a-select>
                    <a-select
                      id=""
                      class="common-select"
                      title="공단사무소선택"
                    >
                      <a-select-option value="1">공단사무소</a-select-option>
                      <a-select-option value="2">공단사무소2</a-select-option>
                    </a-select>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  인지경로
                  <span class="red-span">
                    *<span class="sr-only">필수 입력 항목</span>
                  </span>
                </th>
                <td colspan="3">
                  <div class="form-group-box">
                    <BullList type="refMark">
                      <li>귀하는 공단의 법률서비스를 어떻게 아셨나요?</li>
                    </BullList>
                    <a-radio-group>
                      <a-radio class="radio-bx" value="">광고</a-radio>
                      <a-radio class="radio-bx" value="">주변지인</a-radio>
                      <a-radio class="radio-bx" value="">인터넷검색</a-radio>
                      <a-radio class="radio-bx" value="">관공서</a-radio>
                      <a-radio class="radio-bx" value="">사회단체</a-radio>
                      <a-radio class="radio-bx" value="">기타</a-radio>
                    </a-radio-group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CommonTitle tag="h5" size="2" type="dot">상담내용입력</CommonTitle>
        <div class="common-form__area">
          <p class="form-ess_info">
            <i class="red-span">*</i>
            <span> 표시는 필수 입력 사항입니다. </span>
          </p>
          <table>
            <caption>
              사이버상담 상담내용입력의 제목, 내용, 공개여부, 제3자 정보제공 및
              공개 동의여부 입력에관한 표
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
                    label="제목 입력"
                    :labelCol="{ class: 'sr-only' }"
                  >
                    <a-input class="text-bx" />
                  </a-form-item>
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
                    <span class="sr-only">상담내용 입력</span>
                  </label>
                  <a-textarea
                    class="textarea-bx"
                    id="textMessage"
                    placeholder="최대 200자 입력 가능"
                    :maxlength="200"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">공개여부</th>
                <td>
                  <a-radio-group>
                    <a-radio class="radio-bx" value="">공개</a-radio>
                    <a-radio class="radio-bx" value="">비공개</a-radio>
                  </a-radio-group>
                </td>
              </tr>
              <tr>
                <th scope="row">제3자 정보제공 및 공개 동의여부</th>
                <td>
                  <a-radio-group>
                    <a-radio class="radio-bx" value="">예</a-radio>
                    <a-radio class="radio-bx" value="">아니요</a-radio>
                  </a-radio-group>
                  <CommonTable class="mt-17px">
                    <caption>
                      사이버상담 제3자 정보제공 및 공개 동의여부 구분, 내용
                      에관한 표
                    </caption>
                    <colgroup>
                      <col width="20%" />
                      <col width="80%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">구분</th>
                        <th scope="col">내용</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>개인정보</td>
                        <td>
                          이름·주민등록번호·주소·전화번호·아이디(ID)·전자우편(E-mail)·신체·교육·소득·신용정보
                          그 밖에 특정 개인의 과거 및 현재의 상황이나 상태를
                          나타낼 수 있는 정보 등
                        </td>
                      </tr>
                      <tr>
                        <td>민감정보</td>
                        <td>
                          사상·신념, 노동조합·정당의 가입·탈퇴, 정치적 견해,
                          건강, 성생활 등에 관한 정보, 그 밖에 정보주체의
                          사생활을 현저히 침해할 우려가 있는 개인정보로서
                          대통령령으로 정하는 정보(개인정보보호법 제23조)
                        </td>
                      </tr>
                      <tr>
                        <td>공개가 부적절한 경우</td>
                        <td>
                          내용부실, 비 소관사항, 악의적인 비방내용, 공개취지에
                          어긋나는 내용 등
                        </td>
                      </tr>
                    </tbody>
                  </CommonTable>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="form-bottom-box">
          <a-checkbox-group>
            <a-checkbox class="check-bx" value="1" name="type">
              SMS 수신동의 (예약번호 수신 시 필요합니다.)
            </a-checkbox>
            <a-checkbox class="check-bx" value="2" name="type">
              전자사보 수신동의
            </a-checkbox>
          </a-checkbox-group>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">수정</CommonButton>
          <CommonButton variants="line-primary" width="xs">목록</CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
