<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/ui/breadcrumb/index.vue';
import CalendarLayer from '~/components/ui/calendar/calendarLayer.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';

definePageMeta({
  layout: 'pub2nd'
});

const EVENT_TAB_TYPE = {
  TAB1: 'EVENT_TAB1',
  TAB2: 'EVENT_TAB2',
  TAB3: 'EVENT_TAB3',
  TAB4: 'EVENT_TAB4'
} as const;
const AREA_TAB_TYPE = {
  TAB1: 'AREA_TAB1',
  TAB2: 'AREA_TAB2',
  TAB3: 'AREA_TAB3',
  TAB4: 'AREA_TAB4',
  TAB5: 'AREA_TAB5',
  TAB6: 'AREA_TAB6',
  TAB7: 'AREA_TAB7',
  TAB8: 'AREA_TAB8',
  TAB9: 'AREA_TAB9',
  TAB10: 'AREA_TAB10',
  TAB11: 'AREA_TAB11',
  TAB12: 'AREA_TAB12',
  TAB13: 'AREA_TAB13',
  TAB14: 'AREA_TAB14',
  TAB15: 'AREA_TAB15',
  TAB16: 'AREA_TAB16',
  TAB17: 'AREA_TAB17'
} as const;
type EVENT_KEY = (typeof EVENT_TAB_TYPE)[keyof typeof EVENT_TAB_TYPE];
type AREA_KEY = (typeof AREA_TAB_TYPE)[keyof typeof AREA_TAB_TYPE];

interface Reactive {
  activeEventTab: EVENT_KEY;
  activeAreaTab: AREA_KEY | null;
}

const stateTab = reactive<Reactive>({
  activeEventTab: EVENT_TAB_TYPE.TAB1,
  activeAreaTab: null
});
const _onChangeEventTab = (id: EVENT_KEY) => {
  stateTab.activeEventTab = id;
};
const _onChangeAreaTab = (id: AREA_KEY, e: Event) => {
  const target = e.currentTarget as HTMLElement;
  const parent = target.parentNode;
  if (stateTab.activeAreaTab === id) {
    stateTab.activeAreaTab = null;
  } else {
    stateTab.activeAreaTab = id;
  }
  nextTick(() => {
    if (!parent) return;
    const heightTarget = parent.querySelector('.sub-area-box') as HTMLElement;
    const height = heightTarget?.querySelector('.sub-area-items')?.clientHeight;
    if (heightTarget) heightTarget.style.height = `${height}px`;
  });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <Breadcrumb
          :showPrintButton="true"
          :breadcrumbItems="[{ menuid: 1, text: '메뉴1', to: '/test1' }]"
          breadcrumbTitle="면접상담"
        />
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <div class="counsel-reservation-box">
          <div class="inner">
            <div class="box-left">
              <div class="select-event-wrap">
                <h4>사건 선택</h4>
                <ul class="select-event-items pc-only">
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type01',
                        EVENT_TAB_TYPE.TAB1 === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB1 === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB1)"
                    >
                      <div class="tit">
                        민사, 형사,<br />
                        행정 등 사건
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type02',
                        EVENT_TAB_TYPE.TAB2 === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB2 === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB2)"
                    >
                      <div class="tit">
                        이혼, 친권, <br />
                        양육비, 가족관계 <br />
                        등 가사사건
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type03',
                        EVENT_TAB_TYPE.TAB3 === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB3 === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB3)"
                    >
                      <div class="tit">
                        개인회생,<br />
                        개인파산사건
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-event-item',
                        'type04',
                        EVENT_TAB_TYPE.TAB4 === stateTab.activeEventTab &&
                          'is-active'
                      ]"
                      :title="
                        EVENT_TAB_TYPE.TAB4 === stateTab.activeEventTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="_onChangeEventTab(EVENT_TAB_TYPE.TAB4)"
                    >
                      <div class="tit">기타 사건</div>
                    </button>
                  </li>
                </ul>
                <a-select
                  id="select"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1"
                    >민사, 형사, 행정등 사건</a-select-option
                  >
                  <a-select-option value="2"
                    >이혼, 친권, 양육비, 가족관계 등 가사사건</a-select-option
                  >
                  <a-select-option value="3"
                    >개인회생, 개인파산사건</a-select-option
                  >
                  <a-select-option value="4">기타 사건</a-select-option>
                </a-select>
              </div>
              <div class="select-area-wrap">
                <h4>지역 선택</h4>
                <ul class="select-area-items pc-only">
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB1, $event)
                      "
                    >
                      <div class="tit">서울</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB1 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item is-active">
                            전체
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            강남구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item is-emphasis"
                          >
                            강동구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            강북구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            강서구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            관악구
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            class="sub-area-item is-emphasis"
                          >
                            광진구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            구로구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            금천구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            노원구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            도봉구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            동대문구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            동작구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            마포구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            서대문구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            서초구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            성동구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            성북구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            송파구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            양천구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            영등포구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            용산구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            은평구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            종로구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            중구
                          </button>
                        </li>

                        <li>
                          <button type="button" class="sub-area-item">
                            중랑구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB2, $event)
                      "
                    >
                      <div class="tit">부산</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB2 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            강서구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            금정구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            기장군
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            남구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            동구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            동래구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            부산진구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            북구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            사상구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            사하구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            서구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            수영구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            연제구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            영도구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            중구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            해운대구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB3, $event)
                      "
                    >
                      <div class="tit">대구</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB3 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            군위군
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            남구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            달서구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            달성군
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            동구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            북구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            서구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            수성구
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            중구
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB4, $event)
                      "
                    >
                      <div class="tit">인천</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB4 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            인천
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB5, $event)
                      "
                    >
                      <div class="tit">광주</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB5 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            광주
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB6, $event)
                      "
                    >
                      <div class="tit">대전</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB6 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            대전
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB7, $event)
                      "
                    >
                      <div class="tit">울산</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB7 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            울산
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB8, $event)
                      "
                    >
                      <div class="tit">세종</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB8 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            세종
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB9, $event)
                      "
                    >
                      <div class="tit">경기</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB9 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            경기
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB10, $event)
                      "
                    >
                      <div class="tit">강원</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB10 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            강원
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB11, $event)
                      "
                    >
                      <div class="tit">충북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB11 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            충북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB12, $event)
                      "
                    >
                      <div class="tit">충남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB12 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            충남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB13, $event)
                      "
                    >
                      <div class="tit">전북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB13 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            전북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB14, $event)
                      "
                    >
                      <div class="tit">전남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB14 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            전남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB15, $event)
                      "
                    >
                      <div class="tit">경북</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB15 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            경북
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB16, $event)
                      "
                    >
                      <div class="tit">경남</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB16 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            경남
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="[
                        'select-area-item',
                        AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab &&
                          'is-active'
                      ]"
                      :title="
                        AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab
                          ? '선택됨'
                          : ''
                      "
                      @click.prevent="
                        _onChangeAreaTab(AREA_TAB_TYPE.TAB17, $event)
                      "
                    >
                      <div class="tit">제주</div>
                    </button>
                    <div
                      class="sub-area-box"
                      v-if="AREA_TAB_TYPE.TAB17 === stateTab.activeAreaTab"
                    >
                      <ul class="sub-area-items">
                        <li>
                          <button type="button" class="sub-area-item">
                            전체
                          </button>
                        </li>
                        <li>
                          <button type="button" class="sub-area-item">
                            제주
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                <a-select
                  id="select2"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1">서울</a-select-option>
                  <a-select-option value="2">경기</a-select-option>
                  <a-select-option value="3">부산</a-select-option>
                  <a-select-option value="4">대구</a-select-option>
                </a-select>
                <a-select
                  id="select3"
                  class="common-select mo-only"
                  placeholder="선택"
                >
                  <a-select-option value="1">전체</a-select-option>
                  <a-select-option value="2">강동구</a-select-option>
                  <a-select-option value="3">강서구</a-select-option>
                  <a-select-option value="4">강남구</a-select-option>
                </a-select>
              </div>
            </div>
            <div class="box-right">
              <div class="select-period-wrap">
                <h4 class="sr-only">기간 선택</h4>
                <div class="select-period-result">
                  <!-- <div class="period-result-group">
                    <CalendarLayer />
                  </div> -->
                  <CalendarLayer />
                </div>
              </div>
              <div class="select-result-wrap">
                <h4 class="sr-only">선택 결과</h4>
                <!-- <div class="select-result-date">
                  <h5>날짜선택</h5>
                </div> -->
                <div class="select-result-group">
                  <div class="result-group-box">
                    <CommonTitle tag="h5" size="1" type="dot">
                      대한법률구조공단
                    </CommonTitle>
                    <ul class="result-group-btns">
                      <li>
                        <button
                          type="button"
                          class="result-group-btn is-active"
                        >
                          <div class="main-txt">인천지부</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부 부천출장소</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부 강화지소</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부 김포지소</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                    </ul>
                    <CommonTitle tag="h5" size="1" type="dot">
                      한국가정법률상담소
                    </CommonTitle>
                    <div class="no-result-group">
                      <span class="info-message"
                        >※ 해당 기관의 예약 가능일자 가져오기가 실패하였습니다.
                        다시 조회하시려면, 새로고침 버튼을 클릭하세요.</span
                      >
                      <CommonButton width="sm" height="sm" variants="line-blue">
                        새로고침
                        <template #right-icon>
                          <Icon name="refreshDark" />
                        </template>
                      </CommonButton>
                    </div>

                    <CommonTitle tag="h5" size="1" type="dot">
                      대한가정법률복지상담원
                    </CommonTitle>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                    </ul>

                    <CommonTitle tag="h5" size="1" type="dot">
                      법률홈닥터
                    </CommonTitle>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천지부</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">인천 사회복지협의회</div>
                          <div class="sub-txt">2025.04.10</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- <div class="select-result-group">
                  <div class="result-group-box">
                    <CommonTitle tag="h5" size="1" type="dot">
                      시간선택
                    </CommonTitle>
                    <strong class="time-tit">오전</strong>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">10:20</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">10:20</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">10:20</div>
                          <div class="sub-txt is-bold">한국가정법률상담소</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">10:20</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns">
                      <li>
                        <button
                          type="button"
                          class="result-group-btn is-active"
                        >
                          <div class="main-txt">10:40</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">11:00</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                    </ul>
                    <strong class="time-tit">오후</strong>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">1:20</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">1:20</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">1:20</div>
                          <div class="sub-txt is-bold">한국가정법률상담소</div>
                        </button>
                      </li>
                    </ul>
                    <ul class="result-group-btns">
                      <li>
                        <button type="button" class="result-group-btn">
                          <div class="main-txt">2:00</div>
                          <div class="sub-txt is-bold">대한법률구조공단</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div> -->
                <div class="select-result-time">
                  <div class="result-time-box">
                    <CommonTitle tag="h5" size="1" type="dot">
                      시간
                    </CommonTitle>
                    <div class="select-txt">
                      [대한법률구조공단] 인천지부 2025.04.10
                    </div>
                    <ul class="result-time-btns">
                      <li>
                        <button type="button" class="result-time-btn is-active">
                          <div class="main-txt">10:00</div>
                        </button>
                      </li>
                      <li>
                        <button type="button" class="result-time-btn">
                          <div class="main-txt">11:00</div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="select-result-time">
                  <div class="result-time-box">
                    <CommonTitle tag="h5" size="1" type="dot">
                      시간
                    </CommonTitle>
                    <div class="guide-txt">예약 대상을 선택해 주세요.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ButtonGroup align="center" class="!mt-50px">
          <CommonButton variants="primary" width="xs">예약하기</CommonButton>
          <CommonButton variants="line-primary" width="xs">
            예약확인
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
