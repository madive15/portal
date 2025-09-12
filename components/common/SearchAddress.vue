<script setup lang="ts">
import NewModal from '~/components/common/Newmodal.vue';
import Boardpagenation from '~/components/pagenation/boardpagenation.vue';
import { useModal } from '~/composables/useModal';
import type {
  AddressQueryType,
  AddressType
} from '~/stores/common/address.types';
import { cloneDeep } from 'lodash-es';
import {
  DEFAULT_ADDRESS_QUERY,
  DEFAULT_ADDRESS_RESULTS
} from '~/stores/common/address.const';
import type { Page } from '~/types/common';
import { ref } from 'vue';

const modal = useModal();
const emit = defineEmits(['openModal']);
const open = defineModel('open');
const zip = defineModel('zip');
const mbrAddr = defineModel('mbrAddr');
const modalFocus = defineModel('modalFocus');
const isSearch = ref(false);
const searchInput = ref(null);

const addressQuery = ref<AddressQueryType>(cloneDeep(DEFAULT_ADDRESS_QUERY));
const addresses = ref<Page<AddressType>>(cloneDeep(DEFAULT_ADDRESS_RESULTS));

watch(open, (newValue) => {
  if (newValue) {
    modal.openModal();
  } else {
    modal.closeModal();
    isSearch.value = false;
    resetQuery();
  }
});

watch(
  () => modal.isVisible.value,
  (newValue) => {
    if (!newValue) {
      open.value = false;
      modal.closeModal();
      isSearch.value = false;
      resetQuery();
    }
  }
);

const handleSearch = () => {
  if (addressQuery.value.keyword.length < 2) {
    message.error('주소를 2글자 이상 입력해주세요.');
    searchInput.value?.focus();
  } else {
    isSearch.value = true;
    useAxios()
      .get('/api/address', {
        params: toRaw(addressQuery.value)
      })
      .then(({ data }) => {
        addresses.value = data;
      });
  }
};

const handleClick = (addr) => {
  zip.value = addr.zip;
  mbrAddr.value = addr.mbrAddr;

  open.value = false;
};

const resetQuery = () => {
  addressQuery.value = { keyword: '', page: 1, size: 10 };
};

const movePage = (page: number) => {
  addressQuery.value.page = page;
  handleSearch();
};

const totalPages = computed(() =>
  !addresses.value.totalPages ? 1 : addresses.value.totalPages
);
const list = computed(() => addresses.value.content);
</script>

<template>
  <NewModal
    :is-visible="modal.isVisible.value"
    :close-modal="modal.closeModal"
    :show-header="true"
    header-text="주소 검색"
    modal-class="address-modal"
    :show-close-button="true"
    ref="modalFocus"
  >
    <div class="zip-box">
      <div class="zip-search-box">
        <label for="zipSearch">
          <span class="sr-only">도로명주소, 건물명 또는 지번입력</span>
        </label>
        <input
          class="form-control zip-search-input"
          id="zipSearch"
          maxlength="50"
          ref="searchInput"
          v-model="addressQuery.keyword"
          @keydown.enter="handleSearch"
        />
        <button
          type="button"
          class="btn zip-search-button"
          @click="handleSearch"
        >
          검색
        </button>
      </div>
      <div class="zip-example-box" v-if="!isSearch">
        <dl>
          <dt>검색 방법</dt>
          <dd>
            <strong>도로명 + 건물번호</strong>
            <span>- 꽃마을로 34</span>
          </dd>
          <dd>
            <strong>지역명(동/읍/면/리) + 번지</strong>
            - 신천동 7-30, 동면 만천리 1000
          </dd>
        </dl>
      </div>
      <div class="zip-result-box" v-if="isSearch">
        <div class="empty-box" v-if="list.length === 0">
          <p class="text-center d-block">검색 결과가 없습니다.</p>
        </div>
        <ul class="zip-result-list">
          <li v-for="(item, index) in list" v-if="list.length > 0">
            <button
              type="button"
              @click="handleClick(item)"
              class="btn-zip-result"
            >
              <span class="zip-result-text-box">
                <strong>{{ item.mbrAddr }}</strong>
                <span>({{ item.zip }}) {{ item.lotno }}}</span>
              </span>
              <span class="icon-box">
                <img :src="'/image/sub/join/address_choose.svg'" alt="" />
              </span>
            </button>
          </li>
        </ul>
        <div class="mb-4">
          <boardpagenation
            v-if="isSearch"
            :total-pages="totalPages"
            @update:page="movePage"
          />
        </div>
      </div>
    </div>
  </NewModal>
</template>

<style scoped lang="scss">
@use './scss/SearchAddress';
</style>
