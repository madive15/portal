<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-wrap" id="board-view">
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
          <!-- Description : 전체 레이아웃 및 class는 기존 상세와 동일 -->
          <div class="board-view-box">
            <div class="content-header">
              <CommonBadge tag-badge-text="대한법률구조공단" />

              <div class="info-box">
                <div class="title-box">
                  <h4>전세사기 위험</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span">작성일: 2024-10-28</span>
                </div>
              </div>
            </div>
            <div class="content-body">
              <p>
                전세보증보험 가입 안되고,안되어있고<br />
                12세대 다가구 중 9순위이구요.<br />
                집 감정평가 36억 은행대출 26억<br />
                전세자금 2억2천<br />
                5월22일 만기 (다른집들 대부분 4.2일 만기)<br />
                집주인 이번달 은행이자 납부 불가능<br />
                파산신청 예정<br /><br />
                전세금 반환 받을수있을까요.?<br /><br />
                지금 당장 할수있는 조치가 뭐가있을까요..<br />
                풀대출로 영끌해서 들어왔습니다 도와주세요…
              </p>
              <!-- <p v-html="boardArticle.baContentHtml"></p> -->
            </div>
          </div>

          <div class="board-comment-box">
            <div class="content-header">
              <div class="info-box">
                <div class="title-box">
                  <h4>답변내용</h4>
                </div>
                <div class="inner-box">
                  <span class="date-span">작성일: 2024-10-28</span>
                </div>
              </div>
            </div>
            <div class="content-body">
              <p>
                올려주신 글 잘 읽어보았습니다.<br /><br />
                일단 해당 주택에서 계속 거주하실 예정이신지요? 거주할 의사가
                없다면 만기 2개월 전까지 집주인에게 내용증명을 해지통고를
                해두시는 것이 좋습니다. 그리고 만기일에 집주인이 보증금을
                반환하지 않을 경우 귀하는 집주인을 상대로 임대차계약 만기해지에
                기한 보증금반환청구소송을 제기할 수 있고, 이사가 필요한 경우에는
                주택임차권등기명령을 신청하여 등기부에 경료한 후 이사해야
                대항력과 우선변제권을 유지할 수 있습니다.
              </p>
              <!-- <p v-html="boardArticle.asaBoardAnswer.baContentHtml"></p> -->
            </div>
          </div>

          <ButtonGroup align="right" class="!mt-50px">
            <CommonButton to="#" variants="primary" width="sm"
              >목록으로</CommonButton
            >
          </ButtonGroup>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
