<script setup lang="ts">
import Icon from '~/components/ui/icon/icon.vue';
import CommonButton from '~/components/ui/button/button.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';

definePageMeta({
  layout: 'guide'
});
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Select/Button</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • button 옵션<br />
        1.type (기본 button),submit, reset <br />
        2. disabled <br />
        3. title - 버튼 타이틀 <br />
        4. variants 버튼 스타일- primary,line-primary, gray <br />
        5. 아이콘 정렬 - #icon-left 아이콘 왼쪽 정렬, #icon-right 아이콘 오른쪽
        정렬 <br />
        6. width : <br />
        xs= 90px, sm= 100px, sm-1= 110px, md= 150px, lg= 180px, xl= 260, xxl=
        315px<br />
        height : <br />
        sm = 28px, md= 40px<br /><br />

        • ButtonGroup 정렬옵션<br />
        1. ButtonGroup align 정렬 위치 지정 - left, right,center
        ,center-right(가운데 및 오른쪽) <br />
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-p">
        <ButtonGroup align="left">
          <CommonButton variants="line-primary" width="md" height="md">
            이번만 허용
          </CommonButton>
          <CommonButton variants="line-primary" width="md" height="md">
            방문할 때마다 허용
          </CommonButton>
          <CommonButton variants="line-primary" width="md" height="md">
            허용 안 함
          </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="center">
          <CommonButton variants="primary" width="sm"> 수정 </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="right">
          <CommonButton variants="primary" width="sm"> 목록으로 </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="right">
          <CommonButton variants="primary" width="sm-1"> 확인 </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="right">
          <CommonButton variants="primary" width="sm-1">
            우편번호 찾기
          </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="center-right">
          <CommonButton width="xs"> 취소 </CommonButton>
          <CommonButton variants="primary" width="sm-1" disabled="disabled">
            회원정보 수정
          </CommonButton>
          <CommonButton variants="line-primary" width="xs">
            회원탈퇴
          </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="right">
          <CommonButton width="xs" height="md"> 취소 </CommonButton>
          <CommonButton variants="primary" width="xs" height="md">
            제출
          </CommonButton>
        </ButtonGroup>

        <a-space :size="[8, 8]" wrap style="margin-top: 15px">
          <CommonButton variants="primary" width="sm" height="sm">
            다운로드
          </CommonButton>
          <CommonButton variants="gray" height="md"> 취소 </CommonButton>
          <CommonButton>
            자세히 보기
            <template #right-icon>
              <Icon name="arrowRight" />
            </template>
          </CommonButton>
          <CommonButton>
            관련기관 바로가기
            <template #right-icon>
              <Icon name="plus" />
            </template>
          </CommonButton>
          <CommonButton>
            홈페이지 바로가기
            <template #right-icon>
              <Icon name="shortcut" />
            </template>
          </CommonButton>
          <CommonButton>
            <template #left-icon>
              <Icon name="downloadAtt" />
            </template>
            다운로드
          </CommonButton>
          <CommonButton variants="primary">
            <template #left-icon>
              <Icon name="shortcutWhite" />
            </template>
            바로보기
          </CommonButton>
          <CommonButton height="sm"> 뒤로가기 </CommonButton>
        </a-space>
      </div>

      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
        &lt;ButtonGroup align="left">
          &lt;CommonButton variants="line-primary" width="md" height="md">
            이번만 허용
          &lt;/CommonButton>
          &lt;CommonButton variants="line-primary" width="md" height="md">
            방문할 때마다 허용
          &lt;/CommonButton>
          &lt;CommonButton variants="line-primary" width="md" height="md">
            허용 안 함
          &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="center">
          &lt;CommonButton variants="primary" width="sm"> 수정 &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="right">
          &lt;CommonButton variants="primary" width="sm">
            목록으로
          &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="right">
          &lt;CommonButton variants="primary" width="sm-1"> 확인 &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="right">
          &lt;CommonButton variants="primary" width="sm-1">
            우편번호 찾기
          &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="center-right">
          &lt;CommonButton width="xs"> 취소 &lt;/CommonButton>
          &lt;CommonButton variants="primary" width="sm-1" disabled="disabled">
            회원정보 수정
          &lt;/CommonButton>
          &lt;CommonButton variants="line-primary" width="xs">
            회원탈퇴
          &lt;/CommonButton>
        &lt;/ButtonGroup>

        &lt;ButtonGroup align="right">
          &lt;CommonButton width="xs" height="md"> 취소 &lt;/CommonButton>
          &lt;CommonButton variants="primary" width="xs" height="md">
            제출
          &lt;/CommonButton>
        &lt;/ButtonGroup>

          &lt;CommonButton variants="primary" width="sm" height="sm">
            다운로드
          &lt;/CommonButton>

          &lt;CommonButton variants="gray" height="md"> 취소 &lt;/CommonButton>

          &lt;CommonButton>
            자세히 보기
            &lt;template #right-icon>
              &lt;Icon name="arrowRight" />
            &lt;/template>
          &lt;/CommonButton>

          &lt;CommonButton>
            관련기관 바로가기
            &lt;template #right-icon>
              &lt;Icon name="plus" />
            &lt;/template>
          &lt;/CommonButton>

          &lt;CommonButton>
            홈페이지 바로가기
            &lt;template #right-icon>
              &lt;Icon name="shortcut" />
            &lt;/template>
          &lt;/CommonButton>

          &lt;CommonButton>
            &lt;template #left-icon>
              &lt;Icon name="downloadAtt" />
            &lt;/template>
            다운로드
          &lt;/CommonButton>

          &lt;CommonButton variants="primary">
            &lt;template #left-icon>
              &lt;Icon name="shortcutWhite" />
            &lt;/template>
            바로보기
          &lt;/CommonButton>

          &lt;CommonButton height="sm"> 뒤로가기 &lt;/CommonButton>
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
