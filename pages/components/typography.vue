<script setup lang="ts">
definePageMeta({
  layout: 'guide'
});

const sequence = [10, 12, 14, 16, 18, 20, 25, 28, 32, 40, 48];
const text1 = `
법률구조플랫폼
`;
const text2 = `
abcdefghijklmnopqrstuvwxyz
`;
const text3 = `
12345667890
`;
const text4 = `
!@#$%^&*()-+(※)
`;
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Typography</h1>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • 기본 글꼴로 국문과 영문 모두 Pretendard GOV를 사용한다.
      </p>

      <div class="box-tit-h3">📁 sample</div>
      <div class="box-tit-h4">📝 font-weight 900</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 900 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 800</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 800 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 700</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 700 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 600</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 600 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 500</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 500 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 400</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 400 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 300</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 300 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 200</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 200 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="box-tit-h4">📝 font-weight 100</div>
      <div class="typography-item-wrap" :style="{ 'font-weight': 100 }">
        <ul>
          <li v-for="(item, index) in sequence" :key="index">
            <div class="typography-px" :style="{ 'font-size': `${item}px` }">
              {{ item }}px &#x1F4BF;
            </div>
            <div class="typography-cont" :style="{ 'font-size': `${item}px` }">
              <p>{{ text1 }}</p>
              <p>{{ text2 }}</p>
              <p>{{ text3 }}</p>
              <p>{{ text4 }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typography-item-wrap {
  margin-bottom: 20px;
  > ul {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px;
    > li {
      padding: 0;
      list-style: none;
      display: flex;
      align-items: baseline;
      margin-bottom: 10px;
    }
  }
  .typography-px {
    margin-right: 15px;
    color: #428bca;
  }
  .typography-cont {
    overflow: hidden;
    p {
      padding: 5px;
      margin: 0;
    }
  }
}
</style>
