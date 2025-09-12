<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRequestURL } from '#app';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { myDocOutVO } from '~/types/mydoc';

const urlIframeSrc = ref(''); // 반응형 변수 선언
const profile = ref('');
const router = useRouter();
onMounted(() => {});

const sendParentUrl = async () => {
  if (profile.value === '') {
    const res = await axios.get('/api/anyid/ip');
    profile.value = res.data;
  }
  /*
  if (profile.value === 'dev') {
    window.addEventListener('message', handleUrlIframeMessage); // 메시지 리스너 추가
  }
  */
  try {
    const iframe = document.querySelector('iframe#urlIframe');
    if (iframe.src) {
      if (iframe && iframe?.contentWindow)
        iframe?.contentWindow.postMessage(
          { purpose: 'anyid', profile: profile.value },
          '*'
        );
      if (iframe?.contentWindow?.location?.search) {
        router.push('/login/anyid' + iframe?.contentWindow.location?.search, {
          external: true
        });
      }
    }
  } catch (e) {
    console.log('iframe load 오류 ::: ', e);
  }
};
/*
const handleUrlIframeMessage = (event: any) => {
  window.removeEventListener('message', handleUrlIframeMessage); // 메시지 리스너 추가
  if (event.data && event.data.search) {
    router.push('/login/anyid' + event.data.search, {
      external: true
    });
  }
};
 */
</script>

<template>
  <footer>
    <div class="footer-bottom-box">
      <div class="footer-bottom-wrap">
        <div class="footer-bottom-top-box">
          <div class="container">
            <div class="footer-info-wrap">
              <div class="info-box">
                <div class="left-box">
                  <div class="logo-box">
                    <ul>
                      <li>
                        <img
                          src="~/assets/image/main/hd_logo.png"
                          alt="맞춤형 법률복지 법률구조 플랫폼"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="footer-info">
                <div class="container">
                  <div class="etc-box">
                    <ul class="etc-list">
                      <li>
                        <NuxtLink
                          :to="'/trms'"
                          target="_blank"
                          title="새 창 열림"
                          style="font-weight: bold"
                        >
                          이용약관
                        </NuxtLink>
                      </li>
                      <li class="active">
                        <NuxtLink
                          :to="'/prvc'"
                          target="_blank"
                          title="새 창 열림"
                          style="font-weight: bold"
                        >
                          개인정보처리방침
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink
                          :to="'/center/qna'"
                          target="_blank"
                          title="새 창 열림"
                        >
                          시스템 이용문의
                        </NuxtLink>
                      </li>
                      <li>
                        <NuxtLink
                          :to="'/copyright'"
                          target="_blank"
                          title="새 창 열림"
                        >
                          저작권정책
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom-logo-box">
              <NuxtLink
                :to="'https://www.wa.or.kr/board/list.asp?BoardID=0006'"
                target="_blank"
                title="웹접근성인증평가원 홈페이지 새 창 열림"
              >
                <img
                  src="~/assets/image/main/logo_footer_mark.svg"
                  alt="웹접근성인증마크"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="footer-bottom-end-box">
          <div class="container">
            <div class="row">
              <div class="">
                <div class="footer-new-info-box">
                  <ul class="new-info-list">
                    <li>
                      <span class="img-span">
                        <img
                          src="~/assets/image/main/logo3_w.png"
                          alt="법무부"
                        />
                      </span>
                      <span class="text-span">
                        13809 경기도 과천시 관문로 47<br class="pc-only" />
                        정부과천청사 법무부(1동)
                      </span>
                    </li>
                    <li>
                      <span class="img-span">
                        <img
                          src="~/assets/image/main/logo4_w.png"
                          alt="대한법률구조공단"
                        />
                      </span>
                      <span class="text-span">
                        39660 경북 김천시 혁신2로 26<br class="pc-only" />
                        대한법률구조공단
                      </span>
                    </li>
                    <li>
                      <span class="help-text">시스템 이용 헬프 데스크</span>
                      <strong class="help-tel">02)6923-9490</strong>
                    </li>
                    <li>
                      <p class="copyright-text">
                        Copyright ⓒ by MOJ & KLAC. All rights reserved.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-2 col-12 align-self-end">
                <div class="sns-box d-none">
                  <span class="instagram-span">
                    <NuxtLink
                      :to="'https://www.instagram.com/klac.or.kr/'"
                      target="_blank"
                      title="인스타그램 새 창 열림"
                    >
                      <img
                        src="/assets/image/main/ft_instagram.svg"
                        alt="인스타그램"
                      />
                    </NuxtLink>
                  </span>
                  <span class="youtube-span">
                    <NuxtLink
                      :to="'https://www.youtube.com/channel/UChXSpetKRrf9UANr5apLzzA'"
                      target="_blank"
                      title="유튜브 새 창 열림"
                    >
                      <img
                        src="/assets/image/main/ft_youtube.svg"
                        alt="유튜브"
                      />
                    </NuxtLink>
                  </span>
                  <span class="facebook-span">
                    <NuxtLink
                      :to="'https://www.facebook.com/klac132'"
                      target="_blank"
                      title="페이스북 새 창 열림"
                    >
                      <img
                        src="/assets/image/main/ft_facebook.svg"
                        alt="페이스북"
                      />
                    </NuxtLink>
                  </span>
                  <span class="blog-span">
                    <NuxtLink
                      :to="'https://blog.naver.com/smile-law'"
                      target="_blank"
                      title="블로그 새 창 열림"
                    >
                      <img src="/assets/image/main/ft_blog.svg" alt="블로그" />
                    </NuxtLink>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template>
      <div>
        <iframe id="urlIframe" frameborder="0" @load="sendParentUrl"></iframe>
      </div>
    </template>
  </footer>
</template>

<style scoped lang="scss"></style>
