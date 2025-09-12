<script setup lang="ts">
const props = defineProps<{
  tagName: string;
}>();
const isVisible = ref(true);
const handleClose = () => {
  isVisible.value = false;
};
</script>

<template>
  <a-tag v-if="isVisible" class="common-tag" closable @close="handleClose">
    {{ tagName }}
    <template #closeIcon>
      <button type="button" @keydown.enter.stop="handleClose">
        <img
          src="~/assets/image/sub/myservice/selected_delete.svg"
          alt="선택 삭제"
        />
      </button>
    </template>
  </a-tag>
</template>

<style scoped></style>
