<script setup lang="ts">
definePageMeta({
  layout: 'guide'
});

const primaryItemsList = [
  {
    title: 'Primary-0',
    variableName: 'var(--color-primary-0)',
    hexColorCode: '#FFFFFF',
    description: ''
  },
  {
    title: 'Primary-5',
    variableName: 'var(--color-primary-5)',
    hexColorCode: '#E7EFFF',
    description: ''
  },
  {
    title: 'Primary-10',
    variableName: 'var(--color-primary-10)',
    hexColorCode: '#DCE8F8',
    description: ''
  },
  {
    title: 'Primary-20',
    variableName: 'var(--color-primary-20)',
    hexColorCode: '#4FB0F9',
    description: ''
  },
  {
    title: 'Primary-30',
    variableName: 'var(--color-primary-30)',
    hexColorCode: '#3E80EB',
    description: 'Base'
  },
  {
    title: 'Primary-40',
    variableName: 'var(--color-primary-40)',
    hexColorCode: '#0D6EFD',
    description: 'Mobile Base'
  },
  {
    title: 'Primary-50',
    variableName: 'var(--color-primary-50)',
    hexColorCode: '#0868B8',
    description: ''
  },
  {
    title: 'Primary-60',
    variableName: 'var(--color-primary-60)',
    hexColorCode: '#355797',
    description: ''
  },
  {
    title: 'Primary-70',
    variableName: 'var(--color-primary-70)',
    hexColorCode: '#2c519d',
    description: ''
  },
  {
    title: 'Primary-80',
    variableName: 'var(--color-primary-80)',
    hexColorCode: '#1856AE',
    description: ''
  },
  {
    title: 'Primary-90',
    variableName: 'var(--color-primary-90)',
    hexColorCode: '#12426A',
    description: ''
  },
  {
    title: 'Primary-100',
    variableName: 'var(--color-primary-100)',
    hexColorCode: '#000000',
    description: ''
  }
];

const secondaryItemsList = [
  {
    title: 'Secondary-0',
    variableName: 'var(--color-secondary-0)',
    hexColorCode: '#FFFFFF',
    description: 'background - card, button'
  },
  {
    title: 'Secondary-10',
    variableName: 'var(--color-secondary-10)',
    hexColorCode: '#F5F7FA',
    description: 'background - card, button'
  },
  {
    title: 'Secondary-20',
    variableName: 'var(--color-secondary-20)',
    hexColorCode: '#EDF1F5',
    description: ''
  },
  {
    title: 'Secondary-30',
    variableName: 'var(--color-secondary-30)',
    hexColorCode: '#ECEFF6',
    description: ''
  },
  {
    title: 'Secondary-40',
    variableName: 'var(--color-secondary-40)',
    hexColorCode: '#E7EAF0',
    description: 'button-unselected'
  },
  {
    title: 'Secondary-50',
    variableName: 'var(--color-secondary-50)',
    hexColorCode: '#DADCE1',
    description: 'border'
  },
  {
    title: 'Secondary-60',
    variableName: 'var(--color-secondary-60)',
    hexColorCode: '#7C8292',
    description: ''
  },
  {
    title: 'Secondary-70',
    variableName: 'var(--color-secondary-70)',
    hexColorCode: '#373F57',
    description: ''
  },
  {
    title: 'Secondary-80',
    variableName: 'var(--color-secondary-80)',
    hexColorCode: '#003675',
    description: ''
  },
  {
    title: 'Secondary-90',
    variableName: 'var(--color-secondary-90)',
    hexColorCode: '#1F3869',
    description: ''
  },
  {
    title: 'Secondary-100',
    variableName: 'var(--color-secondary-100)',
    hexColorCode: '#000000',
    description: ''
  }
];

const grayscaleItemsList = [
  {
    title: 'Grayscale-0',
    variableName: 'var(--color-grayscale-0)',
    hexColorCode: '#FFFFFF',
    description: ''
  },
  {
    title: 'Grayscale-5',
    variableName: 'var(--color-grayscale-5)',
    hexColorCode: '#f8f8f8',
    description: ''
  },
  {
    title: 'Grayscale-10',
    variableName: 'var(--color-grayscale-10)',
    hexColorCode: '#f4f4f4',
    description: ''
  },
  {
    title: 'Grayscale-20',
    variableName: 'var(--color-grayscale-20)',
    hexColorCode: '#F0F0F0',
    description: ''
  },
  {
    title: 'Grayscale-30',
    variableName: 'var(--color-grayscale-30)',
    hexColorCode: '#CCCCCC',
    description: ''
  },
  {
    title: 'Grayscale-40',
    variableName: 'var(--color-grayscale-40)',
    hexColorCode: '#bababa',
    description: 'Text-unselected'
  },
  {
    title: 'Grayscale-50',
    variableName: 'var(--color-grayscale-50)',
    hexColorCode: '#6a6a6a',
    description: ''
  },
  {
    title: 'Grayscale-60',
    variableName: 'var(--color-grayscale-60)',
    hexColorCode: '#555555',
    description: 'Text-body'
  },
  {
    title: 'Grayscale-70',
    variableName: 'var(--color-grayscale-70)',
    hexColorCode: '#3E3E3E',
    description: 'footer bg'
  },
  {
    title: 'Grayscale-80',
    variableName: 'var(--color-grayscale-80',
    hexColorCode: '#222222',
    description: 'Text-title'
  },
  {
    title: 'Grayscale-90',
    variableName: 'var(--color-grayscale-90)',
    hexColorCode: '#1d1d1d',
    description: ''
  },
  {
    title: 'Grayscale-100',
    variableName: 'var(--color-grayscale-100)',
    hexColorCode: '#000000',
    description: ''
  }
];

const pointItemsList = [
  {
    title: 'Point-main-badge-0',
    variableName: 'var(--color-point-main-badge-0)',
    hexColorCode: '#FEF6E8',
    description: ''
  },
  {
    title: 'Point-main-badge-10',
    variableName: 'var(--color-point-main-badge-10)',
    hexColorCode: '#E8FEF3',
    description: ''
  },
  {
    title: 'Point-icon-bg-0',
    variableName: 'var(--color-point-icon-bg-0)',
    hexColorCode: '#B0E869',
    description: ''
  },
  {
    title: 'Point-icon-bg-10',
    variableName: 'var(--color-point-icon-bg-10)',
    hexColorCode: '#4ECB8C',
    description: ''
  },
  {
    title: 'Point-icon-bg-20',
    variableName: 'var(--color-point-icon-bg-20)',
    hexColorCode: '#159F63',
    description: ''
  },
  {
    title: 'Point-main-title-0',
    variableName: 'var(--color-point-main-title-0)',
    hexColorCode: '#055843',
    description: ''
  },
  {
    title: 'Point-error-50',
    variableName: 'var(--color-point-error-0)',
    hexColorCode: '#E80000',
    description: ''
  }
];
</script>

<template>
  <div class="box-cont">
    <h1 class="box-tit-h1">📌 Colors</h1>

    <h2 class="box-tit-h2">🔉 Primary color</h2>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Primary color는 버튼, 활성 상태와 같은 UI 전체의 주요 구성 요소에
        사용된다.
      </p>
      <ul class="color-list-wrap">
        <li v-for="(item, index) in primaryItemsList" :key="index">
          <div class="color-item-wrap">
            <div class="color-item-info">
              <div class="color-title-txt">{{ item.title }}</div>
              <div class="color-var-txt">
                <span>{{ item.variableName }}</span>
              </div>
            </div>
            <div class="color-item-box">
              <div
                class="color-box-item"
                :style="{ 'background-color': item.hexColorCode }"
              ></div>
              <div class="color-hex-txt">
                {{ item.hexColorCode }}
                <template v-if="!!item.description">
                  <span class="color-description">{{ item.description }}</span>
                </template>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
      --color-primary-0: #FFFFFF;
      --color-primary-5: #E7EFFF;
      --color-primary-10: #DCE8F8;
      --color-primary-20: #4FB0F9;
      --color-primary-30: #3E80EB;
      --color-primary-40: #0D6EFD;
      --color-primary-50: #0868B8;
      --color-primary-60: #355797;
      --color-primary-70: #2c519d;
      --color-primary-80: #1856AE;
      --color-primary-90: #12426A;
      --color-primary-100: #000000;
      </pre>
    </div>

    <h2 class="box-tit-h2">🔉 Secondary color</h2>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Secondary color는 필터, 칩과 같이 UI에서 보조적인 역할을 하는 구성
        요소 전반에 사용된다.
      </p>
      <ul class="color-list-wrap">
        <li v-for="(item, index) in secondaryItemsList" :key="index">
          <div class="color-item-wrap">
            <div class="color-item-info">
              <div class="color-title-txt">{{ item.title }}</div>
              <div class="color-var-txt">
                <span>{{ item.variableName }}</span>
              </div>
            </div>
            <div class="color-item-box">
              <div
                class="color-box-item"
                :style="{ 'background-color': item.hexColorCode }"
              ></div>
              <div class="color-hex-txt">
                {{ item.hexColorCode }}
                <template v-if="!!item.description">
                  <span class="color-description">{{ item.description }}</span>
                </template>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
      --color-secondary-0: #FFFFFF;
      --color-secondary-10: #F5F7FA;
      --color-secondary-20: #EDF1F5;
      --color-secondary-30: #ECEFF6;
      --color-secondary-40: #E7EAF0;
      --color-secondary-50: #DADCE1;
      --color-secondary-60: #7C8292;
      --color-secondary-70: #373F57;
      --color-secondary-80: #003675;
      --color-secondary-90: #1F3869;
      --color-secondary-100: #000000;
      </pre>
    </div>

    <h2 class="box-tit-h2">🔉 Grayscale</h2>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Grayscale은 정보전달과 위계를 나타내는 중요한 역할을 한다. 주로 BG,
        Text, Line에 사용되며 특히 텍스트는 가독성을 고려해야 하므로 배경과의
        명암비를 고려해야 한다.
      </p>
      <ul class="color-list-wrap">
        <li v-for="(item, index) in grayscaleItemsList" :key="index">
          <div class="color-item-wrap">
            <div class="color-item-info">
              <div class="color-title-txt">{{ item.title }}</div>
              <div class="color-var-txt">
                <span>{{ item.variableName }}</span>
              </div>
            </div>
            <div class="color-item-box">
              <div
                class="color-box-item"
                :style="{ 'background-color': item.hexColorCode }"
              ></div>
              <div class="color-hex-txt">
                {{ item.hexColorCode }}
                <template v-if="!!item.description">
                  <span class="color-description">{{ item.description }}</span>
                </template>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
      --color-grayscale-0: #ffffff;
      --color-grayscale-5: #f8f8f8;
      --color-grayscale-10: #f4f4f4;
      --color-grayscale-20: #F0F0F0;
      --color-grayscale-30: #CCCCCC;
      --color-grayscale-40: #bababa;
      --color-grayscale-50: #6a6a6a;
      --color-grayscale-60: #555555;
      --color-grayscale-70: #3E3E3E;
      --color-grayscale-80: #222222;
      --color-grayscale-90: #1d1d1d;
      --color-grayscale-100: #000000;
      </pre>
    </div>

    <h2 class="box-tit-h2">🔉 Point color</h2>
    <div class="box-item">
      <div class="box-tit-h3">📁 description</div>
      <p class="box-p">
        • Point color는 Primary와 Secondary의 균형을 맞추거나 요소에 대한 집중도
        높이는 데 사용된다.
      </p>
      <ul class="color-list-wrap">
        <li v-for="(item, index) in pointItemsList" :key="index">
          <div class="color-item-wrap">
            <div class="color-item-info">
              <div class="color-title-txt">{{ item.title }}</div>
              <div class="color-var-txt">
                <span>{{ item.variableName }}</span>
              </div>
            </div>
            <div class="color-item-box">
              <div
                class="color-box-item"
                :style="{ 'background-color': item.hexColorCode }"
              ></div>
              <div class="color-hex-txt">
                {{ item.hexColorCode }}
                <template v-if="!!item.description">
                  <span class="color-description">{{ item.description }}</span>
                </template>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="box-tit-h3">📁 code</div>
      <pre class="box-code">
      --color-point-main-badge-0: #FEF6E8;
      --color-point-main-badge-10: #E8FEF3;
      --color-point-icon-bg-0: #B0E869;
      --color-point-icon-bg-10: #4ECB8C;
      --color-point-icon-bg-20: #159F63;
      --color-point-main-title-0: #055843;
      --color-point-error-0: #E80000;
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/_mixins.scss' as *;

.color-list-wrap {
  margin-bottom: 20px;
  max-width: 700px;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  > li {
    list-style: none;
    display: inline-flex;
    width: 33.333%;
    margin-bottom: 15px;
  }
}
.color-item-wrap {
  width: 90%;
  border: 1px solid #000;
  .color-title-txt {
    font-size: 14px;
    font-weight: 700;
    padding: 5px 10px;
    background-color: beige;
  }
  .color-var-txt {
    font-size: 13px;
    padding: 5px 10px;
    border-bottom: 1px solid #000;
    span {
      font-weight: 700;
    }
  }
  .color-box-item {
    height: 50px;
  }
  .color-hex-txt {
    font-size: 13px;
    text-align: center;
    border-top: 1px solid #000;
  }
  .color-description {
    font-weight: 700;
    display: block;
    font-size: 15px;
    padding: 5px 0;
    background-color: var(--color-primary-100);
    color: var(--color-primary-0);
  }
}
</style>
