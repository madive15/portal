<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { computed, ref } from 'vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import { useBoardArticleStore } from '~/stores/bbs';
import LoginRequired from '~/components/common/LoginRequired.vue';
import Satisfaction from '~/components/common/satisfaction.vue';
import { cloneDeep } from 'lodash-es';
import { useLoginStore } from '~/stores/login';
import dayjs from 'dayjs';
import { TAB_RESULT } from '~/constants/dropdown';
import DropdownBasic from '~/components/ui/dropdown/dropdownbasic.vue';
import CommonButton from '~/components/ui/button/button.vue';
const fileInput = ref<HTMLInputElement | null>(null);

const { showAlert } = useCustomAlert();
const router = useRouter();
const route = useRoute();

const editorRef = ref();
const baTitleRef = ref();
const baTypeRef = ref();
const baContentRef = ref();

const dropdownCategory = ref('시스템 이용 문의');

await useBoardArticleStore().searchBoardConfig(route.path);

const boardArticleStore = useBoardArticleStore();
const { boardConfig, boardArticle } = storeToRefs(boardArticleStore);

boardArticle.value.bcId = '200000'; //1:1문의 ::FIXME

//boardConfig.value의 값을 여기서 선택할 때마다 선택된 값으로 set 해준다.
boardConfig.value = cloneDeep({
  ...boardConfig.value,
  bcId: boardArticle.value.bcId
});

const baTypeCodes = await useCommonCodeStore().searchCommonCodeList('QNA_TYPE');

const baTypeCodeOptions = computed(() => {
  return [{ label: '선택', value: '' }, ...baTypeCodes];
});

// 빈 값 체크
//문의하기 등록에 구분선택이나 제목 미 입력시 비활성화
const disabled = computed(() => {
  return boardArticle.value.baType === '' || !boardArticle.value.baTitle;
});

const updateBoardArticle = () => {
  if (!boardArticle.value.baType) {
    message.error('구분을 선택해주세요.');
    baTypeRef.value.focus();
    return;
  }
  if (!boardArticle.value.baTitle) {
    message.error('제목을 입력해주세요.');
    baTitleRef.value.focus();
    return;
  }

  //const baContentHtml = editorRef.value.getTextValue().trim();

  if (!boardArticle.value.baContentHtml) {
    message.error('내용을 입력해주세요.');
    baContentRef.value.focus();
    return;
  }

  Modal.confirm({
    title: '시스템 이용 문의 등록하기',
    content: `입력한 내용으로 시스템 이용 문의를 등록하시겠습니까?`,
    okText: '확인',
    cancelText: '취소',
    onOk: () => {
      //boardArticle.value.baContentHtml = editorRef.value.getValue();
      boardArticleStore
        .updateBoardArticle()
        .then(() => {
          message.success('시스템 이용 문의가 등록되었습니다.');
          movePage();
        })
        .catch((e) => {
          if (e.status === 406) {
            message.error('내용에서 개인정보가 검출되었습니다.');
          } else {
            message.error('시스템 이용 문의 등록 중 에러가 발생되었습니다.');
          }
        });
    }
  });
};

// 1. 세션정보 조회
const loginStore = useLoginStore();
const { auth, authentication } = storeToRefs(loginStore);

const userId = auth.value.memberId;

const movePage = () => {
  router.push('/center/qna/cmptn', { external: true });
};

const today = ref('');
onBeforeMount(async () => {
  await boardArticleStore.resetBoardArticle();
  today.value = dayjs().format('YYYY-MM-DD'); // 'YYYY/MM/DD' 형식
});

const activeIndex = ref<number | null>(2);
function setActive(index: number) {
  activeIndex.value = index;
}
</script>

<template>
  <LoginRequired>
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <Breadcrumb
            breadcrumb-title="시스템 이용 문의"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '고객센터' },
              { text: '시스템 이용 문의', active: true }
            ]"
          />
          <div class="common-category__button">
            <div class="btn-select__wrap mo-visible">
              <DropdownBasic class="select-type" v-model="dropdownCategory">
                <template #default="{ select }">
                  <ul role="menu">
                    <li
                      role="menuitem"
                      v-for="(tab, index) in TAB_RESULT"
                      :key="index"
                      @click="select(tab.label)"
                      @keydown.enter.prevent="select(tab.label)"
                    >
                      <router-link :to="tab.link" class="btn-auto">
                        {{ tab.label }}
                      </router-link>
                    </li>
                  </ul>
                </template>
              </DropdownBasic>
            </div>
            <div class="btn-tab__wrap-gap pc-visible">
              <router-link
                v-for="(tab, index) in TAB_RESULT"
                :to="tab.link"
                class="btn-auto"
                :class="{ active: activeIndex === index }"
                @click="setActive(index)"
                >{{ tab.label }}</router-link
              >
            </div>
          </div>
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="form-box">
            <div class="content-header">
              <div class="info-txt">
                <span class="category-span">작성자</span>
                <span class="file-span">
                  {{ auth.memberName }}
                </span>
              </div>
              <div class="info-txt-box">작성일: {{ today }}</div>
            </div>

            <div class="reason-box">
              <label for="reason">구분선택</label>
              <a-select
                id="reason"
                class="common-select"
                placeholder="선택"
                v-model:value="boardArticle.baType"
                :options="baTypeCodeOptions"
                ref="baTypeRef"
              />
            </div>

            <div class="title-box">
              <label for="title">제목</label>
              <a-input
                id="title"
                class="text-bx"
                placeholder="제목을 입력해 주세요"
                v-model:value="boardArticle.baTitle"
                ref="baTitleRef"
              />
            </div>
            <div class="content-box">
              <!--
              <label for="content">내용</label>
              <lazy-data-editor
                ref="editorRef"
                :initial-value="boardArticle.baContentHtml"
              />
              -->
              <a-textarea
                placeholder="내용 입력"
                v-model:value="boardArticle.baContentHtml"
                ref="baContentRef"
              ></a-textarea>
            </div>
            <!--
            <div class="file-box">
              <strong>파일첨부</strong>
              <data-fileupload
                v-model:atch-file-id="boardArticle.atchFileId"
                module="bbs"
                :max-count="5"
                :size="5"
              />
              <p class="notice-p">※ 첨부파일 용량은 2M이하로 올려주세요.</p>
            </div>
            -->
            <div class="submit-box">
              <CommonButton
                title="문의하기"
                variants="primary"
                width="sm"
                @click="updateBoardArticle"
              >
                <span class="text">문의하기</span>
              </CommonButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  </LoginRequired>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/qna/index.scss';
</style>
