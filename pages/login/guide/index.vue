<script setup lang="ts">
import Breadcrumb from '~/components/common/breadcrumb.vue';
import Modal from '~/components/common/Newmodal.vue';
import { useModal } from '~/composables/useModal';
import { useLoginStore } from '~/stores/login';

const loginStore = useLoginStore();
const { auth } = storeToRefs(loginStore);

const modal1 = useModal();
const router = useRouter();
const movePage = () => {
  router.push('/login/guide/rmv', { external: true });
};
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <breadcrumb
          breadcrumb-title="로그인"
          :breadcrumbItems="[
            { text: '로그인' },
            { text: '장기미사용 로그인', active: true }
          ]"
        />
        <div class="content-header">
          <h4>장기 미사용 안내</h4>
          <p class="notice-p">
            고객님은 12개월 이상 홈페이지 접속이력이 없어 계정이 정지되었습니다.
          </p>
          <div class="information-box">
            <p>
              12개월 동안 로그인 하지 않은 고객님의 거래안전을 위하여 계정이
              정지됩니다.<br />
              장기미사용 해지를 하시려면 아래의 "장기미사용 해제" 버튼을
              클릭하여 주십시오.
            </p>
            <strong>최종 접속일자 : {{ auth.lgnDt }}</strong>
          </div>
        </div>
        <div class="content-body">
          <div class="table-information-box">
            <table>
              <caption>
                장기 미사용 안내의, 구분 - 정부 시책, 관련 법렬, 내용에 관한 표
              </caption>
              <thead>
                <tr>
                  <th scope="col" class="first-th">구분</th>
                  <th scope="col">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="first-th">정부 시책</th>
                  <td>
                    <dl>
                      <dt class="dt-bottom">장기미사용 고객정보 분리관리</dt>
                      <dd>
                        - 장기 미사용 고객 : 최근 1년간 접속이력(로그인)이 없는
                        고객
                      </dd>
                      <dd>- 분리보관 항목 : 회원가입 시 수집된 정보</dd>
                    </dl>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="first-th">관련 법령</th>
                  <td>
                    <p>
                      정보통신망이용촉진 및 정보보호 등에 관한 법률 (제
                      29조/시행령 제 16조)
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="dormancy-submit-box">
            <button type="button" class="btn dormancy-button" @click="movePage">
              장기미사용 해제
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/login/guide/index.scss';
</style>
