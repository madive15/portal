<script setup lang="ts">
import { Record } from 'immutable';
import Dropdown from '~/components/dropdown/Dropdown.vue';

const selectedLanguage = ref<string>('ko');

const localMap: Record<string, string>[] = [
  {
    lang: 'ko',
    locale: 'ko-KR',
    language: '한국어'
  },
  {
    lang: 'en',
    locale: 'en-US, en-GB',
    language: 'English'
  },
  {
    lang: 'ja',
    locale: 'ja-JP',
    language: '日本語'
  },
  {
    lang: 'zh-CN',
    locale: 'zh-CN',
    language: '简体中文'
  },
  {
    lang: 'vi',
    locale: 'vi-VN',
    language: 'Tiếng Việt'
  },
  {
    lang: 'th',
    locale: 'th-TH',
    language: 'ภาษาไทย'
  }
];

const interval = ref();

const load = ref(true);
onMounted(() => {
  nextTick(() => {
    window.addEventListener('beforeunload', () => {
      if (interval.value) {
        clearInterval(interval.value);
      }
    });

    if (load.value) {
      load.value = false;
      try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(script);

        const googleTransCookie = document.cookie.indexOf('googtrans');
        if (googleTransCookie !== -1) {
          const cookieValue = document.cookie.substring(googleTransCookie);
          selectedLanguage.value = cookieValue.replace('googtrans=/auto/', '');
        } else {
          const locale = localMap.find(({ locale }) => {
            return navigator.language === locale;
          });

          if (locale) {
            selectedLanguage.value = locale.lang;
          } else {
            selectedLanguage.value = 'ko';
          }
        }

        createGoogleTranslateElement();
      } catch (e) {
        console.log(e);
      }
    }
  });
});

const createGoogleTranslateElement = () => {
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: navigator.language === 'ko-KR' ? 'ko' : 'auto',
        includedLanguages: 'ko,en,ja,zh-CN,vi,th',
        layout: window.google.translate.TranslateElement.InlineLayout.NONE,
        autoDisplay: false,
        multilanguagePage: true
      },
      'google_translate_element'
    );
  };

  interval.value = setInterval(() => {
    const el = document.querySelector(`#google_translate_element select`);
    if (el && el.value === '') {
      selectedLanguage.value = 'ko';
    }
  }, 300);
};

const handleLanguageChange = (lang: string) => {
  if (lang) {
    selectedLanguage.value = lang;

    const el = document.querySelector(`#google_translate_element select`);
    if (el) {
      el.value = lang;
      const changeEvent = new Event('change');
      el.dispatchEvent(changeEvent);
    } else {
      createGoogleTranslateElement();
    }
  }
};

const text = () => {
  return localMap.find(({ lang }) => selectedLanguage.value === lang)[
    'language'
  ];
};
</script>

<template>
  <div
    id="google_translate_element"
    style="display: none"
    key="google_translate_element"
  ></div>
  <Dropdown
    :buttonText="text()"
    :drop-slots="true"
    class="select-box notranslate"
  >
    <li
      class="hit-li"
      v-for="(item, index) in localMap"
      :key="`language-${index}`"
    >
      <button
        type="button"
        class="btn-item"
        @click="handleLanguageChange(item.lang)"
        :title="selectedLanguage === item.lang ? '선택됨' : ''"
      >
        <span class="text-span">{{ item.language }}</span>
      </button>
    </li>
  </Dropdown>
</template>

<style scoped lang="scss">
.select-box:deep() {
  width: 160px;
  margin: 0;

  .dropdown-toggle::after {
    top: 16px;
  }
}
</style>
