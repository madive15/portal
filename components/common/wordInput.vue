<script setup lang="ts">
const input = defineModel({
  type: String,
  default: ''
});

const props = defineProps<{
  className: string;
  id: string;
  maxlength: string;
}>();

const restrict = (event) => {
  nextTick(() => {
    // 영문자, 숫자, 특수문자만 허용하는 정규 표현식
    const regex = /[^a-zA-Z0-9_\-]+$/;
    input.value = event.target.value.replace(regex, '');
  });
};

const inputRef = ref();

const focus = () => {
  return inputRef.value.focus();
};

defineExpose({
  focus
});
</script>

<template>
  <a-input
    ref="inputRef"
    type="text"
    :class="className"
    :id="id"
    :maxlength="maxlength"
    @input="restrict"
    v-model:value="input"
  />
</template>
