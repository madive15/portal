<script setup lang="ts">
const input = defineModel({
  type: String,
  default: ''
});

const props = defineProps<{
  maxlength: string;
}>();

const handleInput = (event) => {
  const {
    target: { value }
  } = event;
  input.value = value.replace(/[^0-9]/g, '');
};

watch(input, (newValue) => {
  if (newValue) {
    input.value = newValue.replace(/[^0-9]/g, '');
  }
});

const captchaNumInputRef = ref();
const juminNumber = ref();

const focus = () => {
  return captchaNumInputRef.value.focus();
};

const juminFocus = () => {
  if (input.value.length != 6) {
    return juminNumber.value.focus();
  }
};

defineExpose({
  focus
});
</script>

<template>
  <a-input
    class="text-bx"
    type="text"
    :maxlength="maxlength"
    v-model:value="input"
    ref="captchaNumInputRef"
  />
</template>
