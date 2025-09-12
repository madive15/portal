<script setup lang="ts">
import CommonBreadCrumb from '~/components/ui/breadcrumb/index.vue';
import InputSatisfaction from '~/components/ui/input/inputSatisfaction.vue';

definePageMeta({
  layout: 'guide'
});

const breadcrumbMenuItem: { menuitem: BreadcrumbItem[]; menutitle: string } = {
  menutitle: '고객센터',
  menuitem: [
    { menuid: 1, text: '메뉴1', to: '/test1' },
    { menuid: 2, text: '메뉴2', to: '/test2' },
    { menuid: 3, text: '메뉴3', to: '/test3' },
    { menuid: 4, text: '메뉴3', to: '/test3' },
    { menuid: 6, text: '마지막 메뉴', to: '/test5' }
  ]
};
</script>

<template>
  <div class="content" id="common-content">
    <div class="sub-wrap">
      <div class="container">
        <div class="sub-content-box">
          <section class="section1">
            <CommonBreadCrumb
              :breadcrumb-title="breadcrumbMenuItem.menutitle"
              :showPrintButton="true"
              :breadcrumbItems="breadcrumbMenuItem.menuitem"
            />
          </section>
          <section class="section2">
            <div class="board-view-box">
              <div class="content-header">
                <span class="category-span">222</span>
                <div class="info-box">
                  <div class="title-box">
                    <h4>사용자와근로자사이에약정한</h4>
                  </div>
                  <div class="inner-box">
                    <span class="date-span">작성일: 0000-00-00</span>
                    <span class="hit-span">조회수: 1111</span>
                  </div>
                </div>
              </div>
              <div class="content-body">
                <p>저는 갑회사로부터 대학 전학년 장학금을 지급받는 대신</p>
                <div class="nuri-type-box">
                  <div class="img-box">
                    <!-- 유형별로 다른 이미지 표시 -->
                    <img
                      src="~/assets/image/sub/etc/copyright04.png"
                      alt="출처표시 + 상업적 이용금지 + 변경금지"
                    />
                  </div>

                  <div class="img-text-box">
                    <p>
                      법률구조플랫폼이 보유한
                      <b class="highlight">[문화PD] 이미지명</b><br />
                      본 저작물은 "공공누리"
                      <span class="text-re-span"
                        >제4유형:출처 표시 + 상업적 이용금지 + 변경금지</span
                      >
                      조건에 따라 이용 할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div class="content-footer">
                <div class="file-wrap-box">
                  <div class="file-box">
                    <div class="file-title-box">
                      <span class="title-span">첨부파일 </span>
                      <span class="file-span">
                        <a href="#">사회보장급여신청(변경)서</a>
                      </span>
                    </div>

                    <div class="file-info-box">
                      <button class="btn download-button">
                        <span class="icon-span">
                          <img
                            src="~/assets/image/sub/file/doc.svg"
                            alt="문서 파일(DOC)다운로드"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="file-box">
                    <div class="file-title-box">
                      <span class="title-span">첨부파일 </span>
                      <span class="file-span">
                        <a href="#">사회보장급여신청(변경)서</a>
                      </span>
                    </div>

                    <div class="file-info-box">
                      <button class="btn download-button">
                        <span class="icon-span">
                          <img
                            src="~/assets/image/sub/file/pdf.svg"
                            alt="PDF 파일 다운로드"
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div class="file-box">
                    <div class="file-title-box">
                      <span class="title-span">첨부파일 </span>
                      <span class="file-span">
                        <a href="#">사회보장급여신청(변경)서</a>
                      </span>
                    </div>

                    <div class="btn-area">
                      <button
                        type="button"
                        title="다운로드"
                        class="btn-basic sm"
                      >
                        <i class="icon-download"></i>
                        <span class="text">다운로드</span>
                      </button>

                      <button
                        type="button"
                        title="바로보기"
                        class="btn-basic primary sm"
                      >
                        <i class="icon-shortcut"></i>
                        <span class="text">바로보기 </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--            <div class="button-list-box">-->
            <!--              <button type="button" class="btn list-button">목록으로</button>-->
            <!--            </div>-->
            <div class="common-btn__area">
              <button type="button" class="ml-auto btn-basic primary">
                <span class="text">목록으로</span>
              </button>
            </div>
          </section>
        </div>
        <!-- 만족도 조사 -->
        <inputSatisfaction />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/style/pages/center/ntc/detail.scss';
</style>
