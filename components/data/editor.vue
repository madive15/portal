<script setup lang="ts">
import CrossEditor from 'crosseditor-vue3';
import '@toast-ui/editor/dist/toastui-editor.css';
import { v4 } from 'uuid';
const emit = defineEmits(['change']);
const props = defineProps<{ initialValue: string }>();
const instance = ref();

const params = ref({
  UploadFileExecutePath: '/api/editor/image/upload',
  SupportBrowser: 0,
  ImageSavePath: '/',
  Width: '100%',
  UserToolbar: true,
  Menu: false,
  CreateTab: '0',
  MoveCellToTabKey: true,
  ResizeBar: false,
  Css: '/crosseditor/css/custom.css',
  CreateToolbar: 'formatblock|fontname|fontsize|lineheight'
});

onBeforeMount(() => {
  const cookies = document.cookie.split('; ');
  const filteredCookies = cookies.filter((cookie) =>
    cookie.startsWith('CEnterkey_')
  );

  for (const cookie of filteredCookies) {
    document.cookie =
      cookie.split('=')[0] +
      `=; expires=${new Date().toUTCString()}; path=/; domain=.${location.host}`;
  }
});

const loaded = (event, editor) => {
  editor.SetValue(props.initialValue ?? '');

  instance.value = editor;
};

const getValue = () => {
  return instance.value.GetBodyValue();
};

const getTextValue = () => {
  return instance.value.GetTextValue();
};

defineExpose({
  getValue,
  getTextValue
});
</script>

<template>
  <div class="sr-only">
    에디터 입력 내용에서 벗어나시려는 경우 ESC 키를 눌러주신 후 TAB으로 이동이
    가능합니다.
  </div>
  <cross-editor
    :key="v4()"
    :name="v4()"
    :value="initialValue"
    @loaded="loaded"
    :params="params"
    v-memo="[initialValue]"
  />
</template>
