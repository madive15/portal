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

const handleInput = (event) => {
  const {
    target: { value }
  } = event;
  input.value = value.replace(/[^\d\s-]/g, '');
};

const SecondMbrMblTelnoRef = ref();

const focus = () => {
  return SecondMbrMblTelnoRef.value.focus();
};

defineExpose({
  focus
});
</script>

<template>
  <a-input
    :class="className"
    :id="id"
    type="text"
    :maxlength="maxlength"
    @input="handleInput"
    ref="SecondMbrMblTelnoRef"
    v-model:value="input"
  />
</template>
