<script setup lang="ts">
import { inject, useSlots } from 'vue';

const addTab = inject('addTab') as (tab: { title:any[], content:any[] }) => number;
const slots = useSlots();

// 슬롯 함수 호출하여 실제 VNode 배열 얻기
const titleNode = slots.title ? slots.title() : [];
const contentNode = slots.default ? slots.default() : [];

// 이제 titleNode와 contentNode는 VNode 배열이므로 상위에 전달
addTab({
  title: titleNode,
  content: contentNode
});
</script>
