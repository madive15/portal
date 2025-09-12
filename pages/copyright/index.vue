<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumb.vue';

const router = useRouter();

const GoCopyRight = () => {
  window.open(
    'https://www.law.go.kr/lsSc.do?menuId=0&p1=&subMenu=1&query=%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95&x=0&y=0#liBgcolor0',
    '_blank',
    'noopener noreferrer'
  );
};

const gongGo = () => {
  window.open(
    'https://www.kogl.or.kr/index.do',
    '_blank',
    'noopener noreferrer'
  );
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          breadcrumb-title="저작권정책"
          :showPrintButton="true"
          :breadcrumbItems="[{ text: '저작권 정책', active: true }]"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <h4>저작권 정책</h4>
        <div class="list-box">
          <ul>
            <li>
              저작권법 제24조의2에 따라 대한법률구조공단에서 저작재산권을 보유한
              저작물의 경우에는 별도의 이용허락 없이 자유이용이 가능합니다.
            </li>
            <li>
              단, 자유이용이 가능한 자료는 "공공저작물 자유이용허락 표시
              기준(공공누리,KOGL) 제1~4유형"을 부착하여 개방하고 있으므로,
              공공누리 표시가 부착된 저작물은 각 저작물의 표시 기준 범위 안에서
              이용하시기<br />
              바랍니다.
            </li>
          </ul>
        </div>
        <div class="table-box">
          <table class="pc-only">
            <caption>
              저작권 정책 - 제1유형, 제2유형, 제3유형, 제4유형에 대한 표
            </caption>
            <thead>
              <tr>
                <th scope="col">제1유형</th>
                <th scope="col">제2유형</th>
                <th scope="col">제3유형</th>
                <th scope="col">제4유형</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright01.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시"
                    />
                    <span>출처 표시</span>
                  </div>
                </td>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright02.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 상업적 이용금지"
                    />
                    <span>출처 표시+상업적 이용금지</span>
                  </div>
                </td>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright03.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 변경금지"
                    />
                    <span>출처 표시+변경금지</span>
                  </div>
                </td>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright04.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 상업적 이용금지 + 변경금지"
                    />
                    <span>출처 표시+상업적 이용금지+변경금지</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="mo-only">
            <caption>
              저작권 정책 - 제1유형, 제2유형, 제3유형, 제4유형에 대한 표
            </caption>
            <tbody>
              <tr>
                <th scope="row">제1유형</th>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright01.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시"
                    />
                    <span>출처 표시</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">제2유형</th>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright02.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 상업적 이용금지"
                    />
                    <span>출처 표시+상업적 이용금지</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">제3유형</th>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright03.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 변경금지"
                    />
                    <span>출처 표시+변경금지</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>제4유형</th>
                <td>
                  <div class="img-text-box">
                    <img
                      src="/assets/image/sub/etc/copyright04.png"
                      alt="공공누리 공공저작물 자유이용허락 출처표시 + 상업적 이용금지 + 변경금지"
                    />
                    <span>출처 표시+상업적 이용금지+변경금지</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="list-box">
          <ul>
            <li>
              자유이용의 경우에는 반드시 저작물의 출처를 구체적으로 표시하여야
              합니다.
            </li>
            <li>
              공공누리가 부착되지 않은 자료들을 사용하고자 할 경우에는 담당자와
              사전에 협의한 이후에 이용하여 주시기 바랍니다.
            </li>
          </ul>
        </div>
        <div class="button-box">
          <NuxtLink
            :to="'https://www.law.go.kr/lsSc.do?menuId=0&p1=&subMenu=1&query=%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95&x=0&y=0#liBgcolor0'"
            target="_blank"
            rel="noopener noreferrer"
            class="btn view-detail-copyright"
            title="새 창에서 열림"
          >
            <span class="text-span"> 저작권법 자세히보기 </span>
          </NuxtLink>
          <!--          <button class="btn view-detail-copyright" @click="GoCopyRight">-->
          <!--            <span class="text-span"> 저작권법 자세히보기 </span>-->
          <!--            <span class="icon-span">-->
          <!--              <img-->
          <!--                src="/assets/image/sub/etc/shortcut_wh.svg"-->
          <!--                alt="저작권법 자세히보기"-->
          <!--              />-->
          <!--            </span>-->
          <!--          </button>-->
          <NuxtLink
            :to="'https://www.kogl.or.kr/index.do'"
            target="_blank"
            rel="noopener noreferrer"
            class="btn gonggong-button"
            title="새 창에서 열림"
          >
            <span class="text-span"> 공공누리 바로가기 </span>
          </NuxtLink>
          <!--          <button class="btn gonggong-button" @click="gongGo">-->
          <!--            <span class="text-span"> 공공누리 바로가기 </span>-->
          <!--            <span class="icon-span">-->
          <!--              <img-->
          <!--                src="/assets/image/sub/etc/shortcut.svg"-->
          <!--                alt="공공누리 바로가기"-->
          <!--              />-->
          <!--            </span>-->
          <!--          </button>-->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/copyright/index.scss';
</style>
