<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import { useFileStore } from '~/stores/file';
import { useCaseStore } from '~/stores/case';
import { useDscsnStore } from '~/stores/dscsn';
import Dropdown from '~/components/dropdown/Dropdown.vue';
import { useCustomAlert } from '~/composables/useCustomAlert';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';

const { showAlert } = useCustomAlert();
const dscsnCase = useDscsnStore();
const { dscsnCaseDetail } = storeToRefs(dscsnCase);

const router = useRouter();
const route = useRoute();

const fileStore = useFileStore();
const fileList = ref([]);

const KAKAO_APP_KEY = '6805619df2ce78e0e8f9e6803478d249';

onBeforeMount(async () => {
  await dscsnCase.searchCase(route.query);
});

const currentUrl = window.location.href;
// url 복사
function copyPageUrl() {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showAlert({
          icon: 'success',
          text: '링크가 복사 되었습니다.',
          confirmButtonText: '확인'
        });
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err);
      });
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = currentUrl;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showAlert({
        icon: 'success',
        text: '링크가 복사 되었습니다.',
        confirmButtonText: '확인'
      });
    } catch (err) {
      console.error('링크 복사 실패:', err);
    }
    document.body.removeChild(textarea);
  }
}

function loadKakaoSDK() {
  return new Promise((resolve, reject) => {
    if (window.Kakao) {
      return resolve(); // 이미 로드된 경우
    }

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

const facebook = () => {
  window.open('http://facebook.com/sharer/sharer.php?u=' + currentUrl);
};

const twitter = () => {
  window.open('https://x.com/intent/post?url=' + currentUrl);
};

const kakao = async () => {
  try {
    await loadKakaoSDK();

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '법률상담사례',
        description: dscsnCaseDetail.value.caseTtl,
        imageUrl: '',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl
        }
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl
          }
        }
      ]
    });
  } catch (error) {
    console.error('카카오 SDK 로드 실패:', error);
  }
};

const moveList = () => {
  const keys = Object.keys(route.query);
  const params = new URLSearchParams();
  for (const key of keys) {
    if (key !== 'caseNo') {
      if (!!route.query[key]) {
        params.append(key, route.query[key] as string);
      }
    }
  }

  router.push(
    `${route.path.slice(0, route.path.lastIndexOf('/'))}/list?${params.toString()}`,
    { external: true }
  );
};

watch(dscsnCaseDetail, async (newValue) => {
  if (newValue.atchFileId) {
    const { data } = await fileStore.fileList(newValue.atchFileId);
    fileList.value = data;
  }
});

const ext = (fileNm: string) => {
  const extPosition = fileNm.lastIndexOf('.');
  return fileNm.substring(extPosition + 1);
};

const fileSize = (fileSize: number) => {
  return `${Math.ceil(fileSize / 1024)}Kb`;
};

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};
</script>

<template>
  <div class="sub-wrap" id="board-view">
    <div class="sub-content-box">
      <section class="section1">
        <div class="container">
          <!-- breadcrumb에서 :showPrintButton=true일시 인쇄하기 버튼이 보입니다. -->
          <Breadcrumb
            breadcrumb-title="법률상담사례"
            :showPrintButton="true"
            :breadcrumbItems="[
              { text: '사례/서식' },
              { text: '법률사례' },
              { text: '법률상담사례', active: true }
            ]"
          />
        </div>
      </section>
      <section class="section2">
        <div class="container">
          <div class="board-view-box">
            <div class="content-header">
              <span
                class="category-span"
                v-if="!!dscsnCaseDetail.lwaCtgryNm"
                v-text="dscsnCaseDetail.lwaCtgryNm"
              />
              <div class="info-box">
                <div class="title-box">
                  <CommonTitle tag="h4" size="1">{{
                    dscsnCaseDetail.caseTtl
                  }}</CommonTitle>
                  <div class="share-box">
                    <Dropdown :drop-slots="true" drop-class="ex-share-dropbox">
                      <template #button>
                        <img
                          src="~/assets/image/sub/example/new_share.svg"
                          alt="공유"
                        />
                      </template>
                      <div class="share-ul-box">
                        <div class="share-header">
                          <div class="share-title-box">
                            <h4 class="tit">공유하기</h4>
                          </div>
                          <!--                          <div class="share-close-box">-->
                          <!--                            <button class="btn share-close-button">-->
                          <!--                              <img-->
                          <!--                                src="/image/sub/search/gnb_search_close.svg"-->
                          <!--                                alt="닫기"-->
                          <!--                              />-->
                          <!--                            </button>-->
                          <!--                          </div>-->
                        </div>
                        <div class="share-body">
                          <ul>
                            <li class="kakao-li">
                              <a
                                href="javascript:void(0)"
                                title="카카오 공유 새 창 열림"
                                @click.prevent="kakao()"
                              >
                                <img
                                  src="~/assets/image/sub/example/new_kakao.svg"
                                  alt="카카오 공유"
                                />
                                <span class="text-span">카카오톡</span>
                              </a>
                            </li>
                            <li class="facebook-li">
                              <a
                                href="javascript:void(0)"
                                title="페이스북 공유 새 창 열림"
                                @click.prevent="facebook()"
                              >
                                <img
                                  src="~/assets/image/sub/example/new_facebook.svg"
                                  alt="페이스북 공유"
                                />
                                <span class="text-span">페이스북</span>
                              </a>
                            </li>
                            <li class="x-li">
                              <a
                                href="javascript:void(0)"
                                title="x(구 트위터) 공유 새 창 열림"
                                @click.prevent="twitter()"
                              >
                                <img
                                  src="~/assets/image/sub/example/new_x.svg"
                                  alt="x(구 트위터) 공유"
                                />
                                <span class="text-span">트위터</span>
                              </a>
                            </li>
                            <li class="copy-li">
                              <a
                                href="javascript:void(0)"
                                @click.prevent="copyPageUrl"
                              >
                                <img
                                  src="~/assets/image/sub/example/new_clipboard.svg"
                                  alt="URL 복사"
                                />
                                <span class="text-span">URL 복사</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <button class="btn share-close-button">
                          <img
                            src="/image/sub/search/gnb_search_close.svg"
                            alt="닫기"
                          />
                        </button>
                      </div>
                    </Dropdown>
                  </div>
                </div>
                <div class="inner-box">
                  <span class="date-span"
                    >작성일:
                    {{ dscsnCaseDetail.frstRegDt.substring(0, 10) }}</span
                  >
                  <span class="hit-span"
                    >조회수: {{ dscsnCaseDetail.inqCnt }}</span
                  >
                </div>
              </div>
            </div>
            <div class="content-body">
              <dl class="qustion-dl">
                <dt>질문</dt>
                <dd v-html="dscsnCaseDetail.caseQstnCn"></dd>
              </dl>
              <dl class="answer-dl">
                <dt>답변</dt>
                <dd v-html="dscsnCaseDetail.caseCn"></dd>
              </dl>
            </div>
            <div
              v-if="dscsnCaseDetail.atchFileId != null"
              class="content-footer"
            >
              <div class="file-box">
                <span class="title-span">첨부파일</span>
                <span class="file-span">
                  <button
                    type="button"
                    @click="() => download(file.atchFileId, file.atchFileSeq)"
                    v-for="file in fileList"
                  >
                    {{
                      `${file.orgnlFileNm} [${ext(file.orgnlFileNm)}, ${fileSize(file.atchFileSz)}KB]`
                    }}
                  </button>
                </span>
              </div>
              <div class="file-info-box">
                <button
                  type="button"
                  title="다운로드"
                  class="btn-basic sm"
                  :title="file.orgnlFileNm"
                  @click="() => download(dscsnCaseDetail.atchFileId)"
                >
                  <i class="icon-download"></i>
                  <span class="text">다운로드</span>
                </button>

                <button
                  type="button"
                  title="바로보기"
                  class="btn-basic primary sm"
                  v-if="dscsnCaseDetail.pdfId != null"
                >
                  <i class="icon-shortcut"></i>
                  <NuxtLink
                    :href="`/streamdocs/view/sd;streamdocsId=${dscsnCaseDetail.pdfId}`"
                    target="_blank"
                    class="btn-basic primary sm"
                    title="새 창 열림"
                  >
                    <span class="text">바로보기</span>
                  </NuxtLink>
                </button>
              </div>
            </div>
          </div>
          <div class="button-list-box">
            <CommonButton
              title="목록으로"
              variants="primary"
              width="sm"
              @click="moveList"
            >
              <span class="text">목록으로</span>
            </CommonButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/statuteinfo/discussion/detail.scss';
</style>
