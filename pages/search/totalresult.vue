<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSearchStore } from '~/stores/search';
import { useCaseStore } from '~/stores/search/case';
import { useServiceStore } from '~/stores/search/service';
import { useTemplateStore } from '~/stores/search/template';
import { useInstitutionStore } from '~/stores/search/institution';
import { useEtcStore } from '~/stores/search/etc';
import { useFileStore } from '~/stores/file';
import { cloneDeep } from 'lodash-es';
import { DEFAULT_SERVICE } from '~/constants/search/service';
import type { ServiceListType } from '~/types/search/service';
import Loading from '~/components/allsearch/loading.vue';
import CardA from '~/components/ui/card/cardA.vue';
import CardB from '~/components/ui/card/cardB.vue';
import CardC from '~/components/ui/card/cardC.vue';

const searchStore = useSearchStore();
const { totalMenuList } = storeToRefs(searchStore);

const serviceStore = useServiceStore();
const { serviceTotalList } = storeToRefs(serviceStore);

const institutionStore = useInstitutionStore();
const { institutionTotalList } = storeToRefs(institutionStore);

const caseStore = useCaseStore();
const { caseTotalList } = storeToRefs(caseStore);

const templateStore = useTemplateStore();
const { templateTotalList } = storeToRefs(templateStore);

const etcStore = useEtcStore();
const { etcTotalList } = storeToRefs(etcStore);

// 요약보기
const isExpanded = ref<boolean>(false);
const toggleExpand = (item) => {
  if (!item.expanded) {
    isExpanded.value = true;
    itemExpanded.value = item;
    serviceTotalList.value.content.forEach((srvc) => (srvc.expanded = false));
  } else {
    isExpanded.value = false;
    itemExpanded.value = cloneDeep(DEFAULT_SERVICE);
  }

  item.expanded = !item.expanded;
};

const itemExpanded = ref<ServiceListType>(cloneDeep(DEFAULT_SERVICE));

// 더보기 탭 이동
const goToTab = (index) => {
  if (tabRef.value) {
    tabRef.value.activeTabIndex = index;
    window.scrollTo({ top: 0 });
  }
};

// 파일 다운로드
const fileStore = useFileStore();

const download = async (atchFileId: string, atchFileSeq?: number) => {
  const { data } = await fileStore.download(atchFileId, atchFileSeq);
  DownloadUtils.download(data);
};

const preview = async (pdfId: string) => {
  OpenPdfViewer(pdfId);
};

const tabRef = inject('tabRef');

const listCnt = inject('listCnt') as (index: number) => number;

const removeHighlightingTag = (kwd: string) => {
  const reg = /<[^>]*>?/g; // 하이라이팅 html 태그 제거
  return kwd.replace(reg, '');
};
</script>

<template>
  <div class="sub-content-box" id="basic-result">
    <section class="section2">
      <div class="container">
        <div class="all-result-box result-wrap">
          <Loading />
          <div class="service-box">
            <h4>서비스({{ listCnt(1) }})</h4>
            <div class="list-box">
              <div class="row list-row">
                <div
                  class="col-xl-3 col-12"
                  v-for="(srvc, index) in serviceTotalList.content.slice(0, 4)"
                >
                  <CardA
                    :title="srvc.srvcTtl"
                    textLine="3"
                    :content="srvc.srvcExpln.replaceAll('\\n', '<br>')"
                    dlDt="대상자"
                    :dlDd="srvc.trprNm"
                    dlDt2="담당기관"
                    :dlDd2="srvc.instNm"
                    :link="`/servicetype?srvcNo=${srvc.srvcNo}`"
                  />
                  <!--                  <div class="card-list-box" :class="{ active: srvc.expanded }">
                    <div class="card-list-header">
                      <strong v-html="srvc.srvcTtl"></strong>
                    </div>
                    <div class="card-list-middle">
                      &lt;!&ndash;p v-html="srvc.srvcExpln.replaceAll('\\n', '<br>')"></p &ndash;&gt;
                      <p>
                        <truncatetext :max-length="75" :text="srvc.srvcExpln" />
                      </p>
                      <ul>
                        <li v-if="srvc.trprNo">
                          <strong>대상자 : </strong>{{ srvc.trprNm }}
                        </li>
                        <li v-if="srvc.instNo">
                          <strong>담당기관 : </strong>{{ srvc.instNm }}
                        </li>
                      </ul>
                    </div>
                    <div class="card-list-footer">
                      <button
                        class="btn priview-button d-none"
                        @click="toggleExpand(srvc)"
                        :disabled="srvc.svcCnt == 0"
                      >
                        <span class="text-span">
                          {{ srvc.expanded ? '요약닫기' : '요약보기' }}
                        </span>
                        <span class="icon-span">
                          <img
                            src="/image/sub/service/summation_down.svg"
                            alt="요약보기"
                          />
                        </span>
                      </button>
                      <NuxtLink
                        :to="`/servicetype?srvcNo=${srvc.srvcNo}`"
                        class="btn list-link-button"
                        :external="true"
                        :title="removeHighlightingTag(srvc.srvcTtl)"
                      >
                        <span class="text-span">자세히보기</span>
                      </NuxtLink>
                    </div>
                  </div>
                  &lt;!&ndash; 요약보기 클릭시 나오는 내용 &ndash;&gt;
                  <div
                    v-if="srvc.expanded"
                    class="col-xl-12 col-12 none-col"
                    :class="{ active: !isExpanded }"
                  >
                    <div class="inner-box">
                      <div class="inner-header">
                        <strong>
                          {{ itemExpanded.instNm }}
                        </strong>
                        <NuxtLink
                          :to="`/servicepvsn?instNo=${srvc.instNo}`"
                          class="btn information-button"
                          :external="true"
                        >
                          <span class="text-span">기관안내 자세히보기</span>
                          <span class="icon-span">
                            <img
                              src="/image/sub/service/view.svg"
                              alt="기관안내 자세히보기"
                            />
                          </span>
                        </NuxtLink>
                      </div>
                      <div class="inner-body">
                        <div class="row">
                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl1 }}</dt>
                                <dd>{{ itemExpanded.smryNm1 }}</dd>
                              </dl>
                            </div>
                          </div>

                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl2 }}</dt>
                                <dd>{{ itemExpanded.smryNm2 }}</dd>
                              </dl>
                            </div>
                          </div>

                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl3 }}</dt>
                                <dd>{{ itemExpanded.smryNm3 }}</dd>
                              </dl>
                            </div>
                          </div>

                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl4 }}</dt>
                                <dd>{{ itemExpanded.smryNm4 }}</dd>
                              </dl>
                            </div>
                          </div>

                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl5 }}</dt>
                                <dd>{{ itemExpanded.smryNm5 }}</dd>
                              </dl>
                            </div>
                          </div>

                          <div class="col-xl-4 col-12 inner-col">
                            <div class="info-box">
                              <dl>
                                <dt>{{ itemExpanded.smryTtl6 }}</dt>
                                <dd>{{ itemExpanded.smryNm6 }}</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  &lt;!&ndash; 요약 내용 끝 &ndash;&gt;-->
                </div>
                <div class="col-xl-12 col-12 more-list-col">
                  <div class="more-lists-box">
                    <button class="btn more-lists-button" @click="goToTab(1)">
                      <span class="text-span"> 서비스 더보기 </span>
                      <span class="icon-span">
                        <img src="/image/sub/service/view.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="list-h4">기관({{ listCnt(2) }})</h4>
            <div class="service-list-boxs">
              <div class="card-list">
                <template
                  v-for="(inst, index) in institutionTotalList.content.slice(
                    0,
                    4
                  )"
                >
                  <CardB
                    :title="inst.instNm"
                    :textLine="4"
                    :content="inst.instSrvc"
                    dlDt="제공서비스"
                    :dlDd="inst.instSrvc"
                    :link="`/servicepvsn?instNo=${inst.instNo}`"
                    :hpUrl="inst.hpUrl"
                    :menu-items="inst.urlList"
                  />
                  <!--                  <div class="col-xl-3 col-12">
                    <div class="card-box">
                      <div class="card-headers">
                        <strong v-html="$instNmOverride(inst.instNm)"></strong>
                        <p v-html="inst.instExpln"></p>
                      </div>
                      <div class="card-bodys">
                        <dl>
                          <dt>제공서비스</dt>
                          <dd v-html="inst.instSrvc"></dd>
                        </dl>
                        <Dropbutton
                          v-if="inst.urlList.length > 0"
                          buttonText="관련기관 바로가기"
                          :menuItems="inst.urlList"
                          :title="inst.instNm"
                        />
                        <button
                          v-else
                          class="btn url-list"
                          :disabled="inst.urlList.length === 0"
                        >
                          <span class="text-span"> 관련기관 없음 </span>
                        </button>
                      </div>
                      <div class="card-footers">
                        <NuxtLink
                          :to="`/servicepvsn?instNo=${inst.instNo}`"
                          class="btn info-button"
                          :external="true"
                          :title="removeHighlightingTag(inst.instNm)"
                        >
                          <div class="info-text">자세히보기</div>
                        </NuxtLink>
                        <NuxtLink
                          :to="inst.hpUrl"
                          target="_blank"
                          :title="`${removeHighlightingTag(inst.instNm)} 새 창 열림`"
                          class="btn link-button"
                          :disabled="inst.hpUrl == ''"
                        >
                          <span class="text-span">홈페이지 바로가기</span>
                          <span class="icon-span">
                            <img
                              src="/image/sub/service/shortcut_black.svg"
                              alt=""
                            />
                          </span>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>-->
                </template>
                <div class="col-xl-12 col-12 more-list-col">
                  <div class="more-lists-box">
                    <button class="btn more-lists-button" @click="goToTab(2)">
                      <span class="text-span"> 기관 더보기 </span>
                      <span class="icon-span">
                        <img src="/image/sub/service/view.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="list-h4">사례({{ listCnt(3) }})</h4>
            <div class="">
              <div class="card-list">
                <template
                  v-for="(cases, index) in caseTotalList.content.slice(0, 3)"
                >
                  <CardC
                    :title="cases.caseTtl"
                    :badge="cases.caseClsfNm"
                    textLine="2"
                    :content="cases.caseCn"
                    dlDt="작성일"
                    :dlDd="formatDate(cases.regDt)"
                    dlDt2="조회수"
                    :dlDd2="cases.inqCnt"
                    :link="`/statuteinfo/discussion/detail?caseNo=${cases.caseNo}&ctgryNo=${cases.instNo}`"
                  />
                </template>
                <div class="col-xl-12 col-12 more-list-col">
                  <div class="more-lists-box">
                    <button class="btn more-lists-button" @click="goToTab(3)">
                      <span class="text-span"> 사례 더보기 </span>
                      <span class="icon-span">
                        <img src="/image/sub/service/view.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="list-h4">서식({{ listCnt(4) }})</h4>
            <div class="example-list-boxs file-list-boxs">
              <div class="row">
                <template
                  v-for="(tmplt, index) in templateTotalList.content.slice(
                    0,
                    3
                  )"
                >
                  <div class="col-xl-10 col-12 download-col">
                    <div class="list-text-box">
                      <dl>
                        <dt v-html="tmplt.tmpltNm"></dt>
                        <template v-for="atch in tmplt.atchFileList">
                          <dd class="button-dd">
                            <button
                              class="btn download-button"
                              :title="removeHighlightingTag(tmplt.tmpltNm)"
                              @click="
                                download(tmplt.atchFileId, atch.atchFileSeq)
                              "
                            >
                              <span class="icon-span">
                                <img
                                  src="/image/sub/customer/file.svg"
                                  alt=""
                                />
                              </span>
                              <span class="text-span"> 다운로드 </span>
                            </button>
                            <button
                              class="btn preview-button"
                              v-if="atch.pdfId"
                              @click="preview(atch.pdfId)"
                              :title="`${removeHighlightingTag(tmplt.tmpltNm)} 첨부파일 미리보기 새 창 열림`"
                            >
                              <span class="icon-span">
                                <img
                                  src="/image/sub/template/shortcut_wh.svg"
                                  alt=""
                                />
                              </span>
                              <span class="text-span"> 바로보기 </span>
                            </button>
                          </dd>
                        </template>
                        <dd class="etc-dd">
                          <span class="category-span" v-if="tmplt.pathNm">
                            {{ tmplt.pathNm }}
                          </span>
                          <span class="vr" v-if="tmplt.pathNm"></span>
                          <span class="date-span">
                            등록일 : {{ formatDate(tmplt.regDt) }}
                          </span>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div class="col-xl-2 col-12 cate-col">
                    <span class="bedge-span">{{ tmplt.tmpltClsfNm }}</span>
                  </div>
                </template>
                <div class="col-xl-12 col-12 more-list-col" @click="goToTab(4)">
                  <div class="more-lists-box">
                    <button class="btn more-lists-button">
                      <span class="text-span"> 서식 더보기 </span>
                      <span class="icon-span">
                        <img src="/image/sub/service/view.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="list-h4">기타({{ listCnt(5) }})</h4>
            <div class="example-list-boxs">
              <div class="row">
                <template
                  v-for="(etc, index) in etcTotalList.content.slice(0, 3)"
                >
                  <div class="col-xl-10 col-12 a-col">
                    <div class="list-text-box">
                      <NuxtLink
                        :to="`/center/ntc/detail?baId=${etc.pstTtl}`"
                        class="link-txt"
                        :external="true"
                      >
                        <dl>
                          <dt v-html="etc.pstTtl"></dt>
                          <dd class="title-dd" v-html="etc.pstCn"></dd>
                          <dd class="etc-dd">
                            <span class="date-span">
                              작성일 : {{ formatDate(etc.regDt) }}
                            </span>
                            <span class="vr"></span>
                            <span class="hit-span">
                              조회수 : {{ etc.inqCnt }}
                            </span>
                          </dd>
                        </dl>
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="col-xl-2 col-12 cate-col">
                    <span class="bedge-span">{{ etc.etcClsfNm }}</span>
                  </div>
                </template>
                <div class="col-xl-12 col-12 more-list-col">
                  <div class="more-lists-box">
                    <button class="btn more-lists-button" @click="goToTab(5)">
                      <span class="text-span"> 기타 더보기 </span>
                      <span class="icon-span">
                        <img src="/image/sub/service/view.svg" alt="" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h4 class="list-h4">
              메뉴({{ formatComma(totalMenuList.length) }})
            </h4>
            <template v-if="totalMenuList.length > 0">
              <div class="menu-list-boxs">
                <ul>
                  <li v-for="(menu, index) in totalMenuList" :key="index">
                    <NuxtLink :to="menu.menuUrl" :external="true">
                      <span v-html="menu.menuLctn"></span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/search/totalresult.scss';
</style>
