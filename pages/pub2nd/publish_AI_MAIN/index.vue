<script setup lang="ts">
import { useRouter } from 'vue-router';
import BullList from '~/components/ui/bullList/bullList.vue';

definePageMeta({
  layout: 'pub2nd'
});
</script>

<template>
  <div class="sub-content-box">
    <div class="ai-main-wrap">
      <div class="container">
        <div class="ai-main-contnet">
          <div class="txt-area">
            <div class="title-box">
              <div class="ai-vis">
                <h2 class="ai-title-2">
                  생성형 AI가<br class="mo-visible" />
                  도와드립니다!
                </h2>
              </div>
              <p class="info-txt">필요한 법률 서비스를 선택해 주세요.</p>
            </div>
          </div>
          <div class="link-area">
            <ul class="ai-main-link-list">
              <li>
                <NuxtLink to="#" class="link-box">
                  <dl>
                    <dt>
                      생성형
                      <span>법률지원서비스</span> 검색
                    </dt>
                    <dd>
                      <p>
                        법률구조 플랫폼 참여기관의 <br />
                        다양한 서비스를 맞춤형으로 제공합니다
                      </p>
                      <span class="ico-ai-link"></span>
                    </dd>
                  </dl>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="#" class="link-box">
                  <dl>
                    <dt>생성형 <span>법률정보</span> 검색</dt>
                    <dd>
                      <p>
                        사용자의 질의에 가장 적합한 법률사례정보 및 <br />
                        관련 법령, 판례를 맟춤형으로 제공합니다
                      </p>
                      <span class="ico-ai-link"></span>
                    </dd>
                  </dl>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
