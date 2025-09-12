<script setup lang="ts">
import Tag from '~/components/ui/tag/tag.vue';
import { useEasySrchStore } from '~/stores/myservice';

const easySrchStore = useEasySrchStore();
const {
  easySrchQuery,
  easySrchTypeList,
  easySrchTrprList,
  easySrchInstClsfList,
  easySrchRgnList
} = storeToRefs(easySrchStore);

const list = computed(() =>
  toRaw(easySrchQuery.value).reduce((accumulator, current) => {
    const topIndex = accumulator.findIndex(
      (item) => item.type === current.type
    );

    if (topIndex === -1) {
      switch (current.type) {
        case 'type': {
          accumulator.push({
            type: current.type,
            children: [
              {
                name: current.typeNm,
                value: current.typeCd,
                children: current.children.map((item) => ({
                  name: item.subTypeNm,
                  value: item.subTypeCd
                }))
              }
            ]
          });
          break;
        }
        case 'trpr': {
          accumulator.push({
            type: current.type,
            children: [
              {
                name: current.trprNm,
                value: current.trprCd,
                children: current.children.map((item) => ({
                  name: item.subTrprNm,
                  value: item.subTrprCd
                }))
              }
            ]
          });
          break;
        }
        case 'inst': {
          accumulator.push({
            type: current.type,
            children: [
              {
                name: current.instClsfNm,
                value: current.instClsfCd,
                children: current.children.map((item) => ({
                  name: item.instNm,
                  value: item.instNo
                }))
              }
            ]
          });
          break;
        }
        case 'rgn': {
          accumulator.push({
            type: current.type,
            children: [
              {
                name: current.rgnNm,
                value: current.rgnCd
              }
            ]
          });
          break;
        }
      }
    } else {
      const topItem = accumulator.find((item) => item.type === current.type);
      switch (topItem.type) {
        case 'type': {
          topItem.children.push({
            name: current.typeNm,
            value: current.typeCd,
            children: current.children.map((item) => ({
              name: item.subTypeNm,
              value: item.subTypeCd
            }))
          });
          break;
        }
        case 'trpr': {
          topItem.children.push({
            name: current.trprNm,
            value: current.trprCd,
            children: current.children.map((item) => ({
              name: item.subTrprNm,
              value: item.subTrprCd
            }))
          });
          break;
        }
        case 'inst': {
          topItem.children.push({
            name: current.instClsfNm,
            value: current.instClsfCd,
            children: current.children.map((item) => ({
              name: item.instNm,
              value: item.instNo
            }))
          });
          break;
        }
        case 'rgn': {
          topItem.children.push({
            name: current.rgnNm,
            value: current.rgnCd
          });
          break;
        }
      }
    }

    return accumulator;
  }, [])
);

const tagList = computed(() =>
  list.value.map((item) => {
    let text = '';

    switch (item.type) {
      case 'type': {
        text = '유형: ';
        if (item.children.length === easySrchTypeList.value.length) {
          text = text + '전체';
        } else {
          const childrenTexts = item.children.map((child) => {
            return `${child.name}${!!child.children && child.children.length > 0 ? ':' : ''} ${!!child.children && child.children.length > 0 ? child.children.map(({ name }) => name).join(' > ') : ''}`;
          });

          const resultText = childrenTexts.join(', ');
          text = text + resultText;
        }
        break;
      }
      case 'trpr': {
        text = '대상자: ';
        if (item.children.length === easySrchTrprList.value.length) {
          text = text + '전체';
        } else {
          const childrenTexts = item.children.map((child) => {
            return `${child.name}${!!child.children && child.children.length > 0 ? ':' : ''} ${!!child.children && child.children.length > 0 ? child.children.map(({ name }) => name).join(' > ') : ''}`;
          });

          const resultText = childrenTexts.join(', ');
          text = text + resultText;
        }
        break;
      }
      case 'inst': {
        text = '기관: ';
        if (item.children.length === easySrchInstClsfList.value.length) {
          text = text + '전체';
        } else {
          const childrenTexts = item.children.map((child) => {
            return `${child.name}${!!child.children && child.children.length > 0 ? ':' : ''} ${!!child.children && child.children.length > 0 ? child.children.map(({ name }) => name).join(' > ') : ''}`;
          });

          const resultText = childrenTexts.join(', ');
          text = text + resultText;
        }
        break;
      }
      case 'rgn': {
        text = '지역: ';
        if (item.children.length === easySrchRgnList.value.length) {
          text = text + '전체';
        } else {
          const childrenTexts = item.children.map((child) => {
            return `${child.name}${!!child.children && child.children.length > 0 ? ':' : ''} ${!!child.children && child.children.length > 0 ? child.children.map(({ name }) => name).join(' > ') : ''}`;
          });

          const resultText = childrenTexts.join(', ');
          text = text + resultText;
        }
        break;
      }
    }

    return {
      type: item.type,
      text: text
    };
  })
);

const removeTag = (type: 'type' | 'trpr' | 'inst' | 'rgn') => {
  const results = toRaw(easySrchQuery.value);
  const removeResults = results.filter((item) => item.type !== type);

  easySrchQuery.value = [...removeResults];
};
</script>

<template>
  <a-space :size="[8, 8]" wrap class="tag-bx">
    <!-- 서비스 유형 -->
    <template :key="`${tag.type}${index}`" v-for="(tag, index) in tagList">
      <Tag :tagName="tag.text" @close="removeTag(tag.type)" />
    </template>
  </a-space>
</template>

<style scoped></style>
