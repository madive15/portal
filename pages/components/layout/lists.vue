<script setup lang="ts">
import CardA from "~/components/ui/card/cardA.vue";
import CardC from "~/components/ui/card/cardC.vue";
import CardB from "~/components/ui/card/cardB.vue";
import CardD from "~/components/ui/card/cardD.vue";
import Button from "~/components/ui/button/button.vue";

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Layout/Lists</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• Card A type ,card 밖 class="card-list"로 감싼다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="card-list">
          <CardA
              title="서비스 제목1"
              textLine="3"
              content="ddfdfdfdf"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
          />
          <CardA
              title="서비스 제목2"
              textLine="3"
              badge="지부단독"
              content="콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
          />
          <CardA
              title="서비스 제목3"
              textLine="3"
              content="콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄
                        콘텐츠 내용이 설명형으로 들어감 최대 3줄"
              dlDt="대상자"
              dlDd="기준상위"
              dlDt2="담당기관"
              dlDd2="대한법률구조공단"
          />
          <CardA
                title="서비스 제목4"
                textLine="3"
                content="ddfdfdfdf"
                dlDt="대상자"
                dlDd="기준상위"
                dlDt2="담당기관"
                dlDd2="대한법률구조공단"
            />
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CardA
            title="서비스 제목1"
            textLine="3"
            content="ddfdfdfdf"
            dlDt="대상자"
            dlDd="기준상위"
            dlDt2="담당기관"
            dlDd2="대한법률구조공단"
        />
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• Card B type ,card 밖 class="card-list"로 감싼다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="card-list">
          <CardB
              title="기관 이름"
              textLine="4"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="제공서비스"
              dlDd="제공서비스 목록, 제공서비스 목록, 제공서비스 목록, 제공서비스 목록"
          />
        </div>
      </div>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;CardB
            title="기관 이름"
            textLine="4"
            content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
            dlDt="제공서비스"
            dlDd="제공서비스 목록, 제공서비스 목록, 제공서비스 목록, 제공서비스 목록"
        />
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• Card C Type ,card 밖 class="card-list"로 감싼다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="card-list">
          <CardC
              title="대법원“부부가 공동으로 진ㅅㄷㅌㅅ "
              badge="기관사례"
              textLine="2"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="작성일"
              dlDd="2025-00-00"
              dlDt2="조회수"
              dlDd2="1000"
          />
          <CardC
              title="신용회복지원 신청 및 채무 조정합의서(군복무자 및 입대예정자용)"
              badge="기관사례"
              textLine="2"
              content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
              dlDt="작성일"
              dlDd="2025-00-00"
              dlDt2="조회수"
              dlDd2="1000"
          />
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
         &lt;CardC
             title="대법원“부부가 공동으로 진ㅅㄷㅌㅅ "
             badge="기관사례"
             textLine="2"
             content="기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 기관에 대한 설명 및 소개가 들어가는 공간 ..."
             dlDt="작성일"
             dlDd="2025-00-00"
             dlDt2="조회수"
             dlDd2="1000"
         />
      </pre>
    </div>

    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">• Card D Type ,card 밖 class="card-list"로 감싼다</p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <div class="card-list">
          <CardD />
        </div>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
          &lt;div class="card-type__board">
            &lt;div class="card-header">
              &lt;h3 class="title">서식제목1&lt;/h3>
              &lt;span class="badge-exam">해당되는 서식 구분명&lt;/span>
            &lt;/div>
            &lt;div class="btn-area">
              &lt;template >
                &lt;Button class="btn-basic sm" title="다운로드1" icon-left="true" class-name="icon-download" />
                &lt;Button class="btn-basic sm primary" title="바로보기" icon-left="true" class-name="icon-shortcut" />
              &lt;/template>
            &lt;/div>
            &lt;div class="text-etc">
              &lt;span class="bx">
                  &lt;span>서식 구분, 해당되지 않을 시 제외&lt;/span>
              &lt;/span>
              &lt;span class="bx">등록일&lt;/span>
            &lt;/div>
          &lt;/div>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
