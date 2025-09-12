<script setup lang="ts">
import {
  HighlightOutlined,
  HeatMapOutlined,
  ClearOutlined,
  UserOutlined,
  SearchOutlined,
  PushpinOutlined,
  WhatsAppOutlined
} from '@ant-design/icons-vue';
import { ref } from 'vue';
const route = useRoute();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>([route.path]);

// 모바일 여부
const isMobile = ref(false);

const handleGoBack = () => {
  window.history.back();
};

const onGoTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1200;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});

watch(
  () => isMobile.value,
  (newItems) => {
    collapsed.value = !!newItems;
  }
);

watch(
  () => route.path,
  (newItems) => {
    selectedKeys.value = [newItems];
    // console.log(newItems);
  }
);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="/components">
          <router-link to="/components">
            <HighlightOutlined />
            <span>Intro</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/components/typography">
          <router-link to="/components/typography">
            <HighlightOutlined />
            <span>Typography</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/components/colors">
          <router-link to="/components/colors">
            <ClearOutlined />
            <span>Colors</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/components/elementsAll">
          <router-link to="/components/components">
            <HeatMapOutlined />
            <span>Components</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu key="identity">
          <template #title>
            <span>
              <UserOutlined />
              <span>Identity</span>
            </span>
          </template>
          <a-menu-item key="/components/identity/banner">
            <router-link to="/components/identity/banner">Banner</router-link>
          </a-menu-item>
          <a-menu-item key="/components/identity/header">
            <router-link to="/components/identity/header">Header</router-link>
          </a-menu-item>
          <a-menu-item key="/components/identity/footer">
            <router-link to="/components/identity/footer">Footer</router-link>
          </a-menu-item>
          <a-menu-item key="/components/identity/identifier">
            <router-link to="/components/identity/identifier"
              >Identifier</router-link
            >
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="research">
          <template #title>
            <span>
              <SearchOutlined />
              <span>Research</span>
            </span>
          </template>
          <a-menu-item key="/components/research/main">
            <router-link to="/components/research/main">Main</router-link>
          </a-menu-item>
          <a-menu-item key="/components/research/title">
            <router-link to="/components/research/title">Title</router-link>
          </a-menu-item>
          <a-menu-item key="/components/research/skip">
            <router-link to="/components/research/skip">Skip</router-link>
          </a-menu-item>
          <a-menu-item key="/components/research/side">
            <router-link to="/components/research/side">Side</router-link>
          </a-menu-item>
          <a-menu-item key="/components/research/pagenation">
            <router-link to="/components/research/pagenation"
              >Pagenation</router-link
            >
          </a-menu-item>
          <a-menu-item key="/components/research/search">
            <router-link to="/components/research/search">Search</router-link>
          </a-menu-item>
          <a-menu-item key="/components/research/breadcrumb">
            <router-link to="/components/research/breadcrumb"
              >Breadcrumb</router-link
            >
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="layout">
          <template #title>
            <span>
              <HeatMapOutlined />
              <span>Layout</span>
            </span>
          </template>
          <a-menu-item key="/components/layout/lists">
            <router-link to="/components/layout/lists">Lists</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/modal">
            <router-link to="/components/layout/modal">Modal</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/badge">
            <router-link to="/components/layout/badge">Badge</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/tab">
            <router-link to="/components/layout/tab">Tab</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/spinner">
            <router-link to="/components/layout/spinner">Spinner</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/popup">
            <router-link to="/components/layout/popup">Popup</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/icons">
            <router-link to="/components/layout/icons">Icons</router-link>
          </a-menu-item>
          <a-menu-item key="/components/layout/bullList">
            <router-link to="/components/layout/bullList"
              >Bull list</router-link
            >
          </a-menu-item>
          <a-menu-item key="/components/layout/form">
            <router-link to="/components/layout/form">Form</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="select">
          <template #title>
            <span>
              <PushpinOutlined />
              <span>Select</span>
            </span>
          </template>
          <a-menu-item key="/components/select/radio">
            <router-link to="/components/select/radio">Radio</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/select">
            <router-link to="/components/select/select">Select</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/check">
            <router-link to="/components/select/check">Check</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/tag">
            <router-link to="/components/select/tag">Tag</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/button">
            <router-link to="/components/select/button">button</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/tooltip">
            <router-link to="/components/select/tooltip">tooltip</router-link>
          </a-menu-item>
          <a-menu-item key="/components/select/accordion">
            <router-link to="/components/select/accordion"
              >Accordion</router-link
            >
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="/components/table">
          <router-link to="/components/table">
            <WhatsAppOutlined />
            <span>Table</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu key="input">
          <template #title>
            <span>
              <PushpinOutlined />
              <span>Input</span>
            </span>
          </template>
          <a-menu-item key="/components/input/date">
            <router-link to="/components/input/date">Date</router-link>
          </a-menu-item>
          <a-menu-item key="/components/input/textarea">
            <router-link to="/components/input/textarea">Textarea</router-link>
          </a-menu-item>
          <a-menu-item key="/components/input/input">
            <router-link to="/components/input/input">Input</router-link>
          </a-menu-item>
          <a-menu-item key="/components/input/file">
            <router-link to="/components/input/file">File</router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="customer-service">
          <template #title>
            <span>
              <!--              <PushpinOutlined />-->
              <span>고객센터</span>
            </span>
          </template>
          <a-menu-item key="/components/publishing/cs/notice">
            <router-link to="/components/publishing/cs/notice"
              >Notice</router-link
            >
          </a-menu-item>
          <a-menu-item key="/components/publishing/cs/detail">
            <router-link to="/components/publishing/cs/detail"
              >Detail</router-link
            >
          </a-menu-item>
          <a-menu-item key="/components/publishing/cs/question">
            <router-link to="/components/publishing/cs/question"
              >Question</router-link
            >
          </a-menu-item>
          <a-menu-item key="/components/publishing/cs/qna">
            <router-link to="/components/publishing/cs/qna">Qna</router-link>
          </a-menu-item>
          <a-menu-item key="/components/publishing/cs/accept">
            <router-link to="/components/publishing/cs/accept"
              >Accept</router-link
            >
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-page-header
        style="
          border: 1px solid rgb(235, 237, 240);
          background-color: #fff;
          z-index: 111;
        "
        title="퍼블리싱"
        sub-title="스타일 가이드"
        @back="handleGoBack"
      />
      <a-layout-content style="margin: 0 16px">
        <div class="guide-box">
          <slot />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Copyright ⓒ by MOJ & KLAC. All rights reserved.
      </a-layout-footer>
      <button data-v-985d1517="" type="button" class="go-top" @click="onGoTop">
        ⬆️
      </button>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
@use '~/assets/style/_mixins.scss' as *;

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.ant-layout-sider {
  &.ant-layout-sider-collapsed:deep() {
    width: 50px !important;
    min-width: 50px !important;
    flex: 0 0 50px !important;
    .ant-layout-sider-trigger {
      width: 50px !important;
    }
  }
}
.ant-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  &.ant-menu-inline-collapsed {
    width: 50px !important;
  }
}
.ant-page-header {
  position: fixed;
  width: 100%;
}
.ant-layout-content {
  margin-top: 100px !important;
}

.guide-box {
  padding: 20px;
  background-color: #fff;
  min-height: 36px;
  :deep() {
    .box-cont {
      max-width: 1280px;
      margin: 0 auto;
      .box-tit-h1 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 30px;
      }
      .box-tit-h2 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 20px;
      }
      .box-tit-h3 {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      .box-tit-h4 {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 10px;
      }
      .box-p {
        font-size: 14px;
        line-height: 1.2;
        font-weight: 400;
        margin-bottom: 20px;
      }
      .box-item {
        border: 1px solid #dadce1;
        border-radius: 5px;
        padding: 20px;
        margin-bottom: 30px;
      }
      .box-code {
        background-color: #2e3440ff;
        color: var(--color-primary-0);
        padding: 15px;
        font-weight: 300;
        line-height: 1.5;
      }
    }
  }
}

.go-top {
  background-color: transparent;
  border: none;
  bottom: 10px;
  font-size: 45px !important;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 10px;
  z-index: 999;
}
</style>
