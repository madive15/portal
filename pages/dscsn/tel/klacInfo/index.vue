<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import CommonTitle from '~/components/ui/title/title.vue';
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb :showPrintButton="true" />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" type="circle" size="1"
          >132 법률상담 콜센터 이용안내</CommonTitle
        >
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              긴급하게 법률문제의 해결방안을 찾고자 하실 때에는 132 법률상담 콜
              센터를 이용해 주시기 바랍니다.
            </li>
            <li>
              콜 센터를 이용하실 때에는 국번 없이 132번을 누르시면 됩니다.
            </li>
            <li>해외에서 이용하실 경우는 82-54-132로 연락 주시기 바랍니다.</li>
            <li>통화료는 발신자 부담으로 서비스를 제공하고 있습니다.</li>
            <li>
              132법률상담 콜센터와 연결되면 안내 멘트에 따라 상담원과 직접
              상담하실 수 있습니다.
            </li>
            <li>
              상담시간 안내 : 평일 (오전 9시 ~ 11시 50분, 오후 1시 ~ 5시 50분)
            </li>
            <li>전화상담은 간단한 내용에 대해서만 상담 가능합니다.</li>
            <li>
              법률상담은 단정적 판단이 쉽지 않으므로 복잡한 사안은 공단 사무실로
              방문하여 상담해 주시기 바랍니다.
            </li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >ARS 법률정보 제공</CommonTitle
        >
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>국번없이 132(통화료는 발신자 부담) 누름</li>
            <li>음성안내에 따라 번호를 누르면 원하는 정보에 연결</li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1"
          >법률상담시 유의사항</CommonTitle
        >
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>공단은 한정된 상담으로 상담이 지연될 수 있습니다.</li>
            <li>
              상담내용은 상담원의 개인적 의견이므로 참고자료로만 활용하시기
              바랍니다.
            </li>
            <li>
              비예약 면접상담, 132 전화상담, 채팅상담 등은 월․화요일, 하루 중
              오전에 상담이 많습니다.(사정에 따라 다를 수 있음)
            </li>
            <li>
              상담유형별 특성을 참고하여 적절한 상담방법을 선택하여 주시기
              바랍니다.
            </li>
            <li>다음 상담고객을 위하여 상담시간을 준수하여 주시기 바랍니다.</li>
          </ul>
        </div>

        <CommonTitle tag="h4" type="circle" size="1">법률상담 제한</CommonTitle>
        <div class="bull-list-box">
          <ul class="counsel-bull-list">
            <li>
              우리 공단은 산업안전보건법에 따른 고객응대근로자 보호조치로 폭언,
              욕설, 성희롱 등의 상담 및 아래 표와 같은 내용의 상담은 제한될 수
              있습니다.
            </li>
            <li>행정기관ㆍ법원의 처분 및 판결 결과 등에 대한 탄원성 질의</li>
            <li>강제집행면탈ㆍ조세포탈 등 반사회질서에 해당하는 질의</li>
            <li>
              기타 공단 설립취지상 답변이 부적절하다고 판단되는 내용 등의
              질의(예, 법령ㆍ정관ㆍ내규 등의 유권해석을 구하는 질의)
            </li>
            <li>단체 내부 분쟁사항에 대한 질의</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/dscsn/tel/klacInfo/index.scss';
</style>
