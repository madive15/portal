<!--
* 화면명 : 대한법률구조공단 국외 사이버상담 폼
* 화면ID : LASP_CON_030
* 파일명 : CybKlacOvsM
* 작성자 : 김정남
* 화면설명 : 대한법률구조공단 국외 사이버상담 페이지
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
변경일       변경자       변경내역
ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
2025.07.21  김정남       최초생성
-->

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Breadcrumb from '~/components/common/breadcrumbNew.vue';
import ImgBox from '~/components/display/img-box/index.vue';
import CommonTitle from '~/components/ui/title/title.vue';
import CommonButton from '~/components/ui/button/button.vue';
import CommonBadge from '~/components/ui/badge/badge.vue';
import CommonTable from '~/components/ui/table/tables.vue';
import ButtonGroup from '~/components/ui/button/buttonGroup.vue';
import BullList from '~/components/ui/bullList/bullList.vue';
import Icon from '~/components/ui/icon/icon.vue';
import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionHead
} from '~/components/ui/accordion';
import EmailInput from '~/components/common/EmailInputRules.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useInqStore } from '~/stores/inq';
import AddrInput from '~/components/common/AddrInputRules.vue';
import * as valid from '~/utils/validation';
import * as dscsnApis from '~/composables/dscsn';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import { useLoginStore } from '~/stores/login';
import { mapRequestToAsset } from '@cloudflare/kv-asset-handler';

definePageMeta({
  layout: 'pub2nd'
});

const activeKey = ref([1, 2]);

const loginStore = useLoginStore();
const { authenticated } = storeToRefs(loginStore);
const route = useRoute();
const { showAlert } = useCustomAlert();

const formRef = ref();
const nameRef = ref();
const engNameRef = ref();
const telNumRef = ref();
const tel0Ref = ref();
const tel1Ref = ref();
const tel2Ref = ref();
const tel3Ref = ref();
const rcgPathRef = ref();
const titleRef = ref();
const contentRef = ref();
const passwordRef = ref();
const passwordCheckRef = ref();

const refMap: Record<string, Ref<any>> = {
  dscsnAplcntNm: nameRef,
  engName: engNameRef,
  rcgPathCd: rcgPathRef,
  dscsnTtl: titleRef,
  dscsnCn: contentRef,
  tel: telNumRef,
  tel0: tel0Ref,
  tel1: tel1Ref,
  tel2: tel2Ref,
  tel3: tel3Ref,
  wrtr_pswd: passwordRef,
  passwordCheck: passwordCheckRef
};

const commonCodeStore = useCommonCodeStore();
const cd2 = 'CO0049';
const { data: codeList2 } = useQuery({
  queryKey: ['code', cd2],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const cd3 = 'CO0092';
const { data: codeList3 } = useQuery({
  queryKey: ['code', cd3],
  queryFn: ({ queryKey }) => commonCodeStore.searchCommonCodeList(queryKey[1])
});

const form = reactive({
  dscsnAplyNo: '',
  status: '',
  instNo: 'I001000000',
  dscsnSeCd: '4',
  prSttsCd: 'D01',
  dscsnAplcntNm: '',
  engName: '',
  aplcntNtnltyNm: '',
  aplcntBrdt: '',
  aplcntZip: '',
  aplcntAddr: '',
  aplcntDaddr: '',
  dscsnAplcntTelno: '---',
  dscsnAplcntMblTelno: '---',
  dscsnAplcntEmlAddr: '@',
  emailCert: false,
  wrtr_pswd: '',
  passwordCheck: '',
  rcgPathCd: '',
  rcgPathCdNm: '',
  dscsnTtl: '',
  dscsnCn: '',
  rlsYn: 'N',
  tdptyPvsnAgreYn: 'N',
  smsCert: false,
  elnewsRcptnAgre: false,
  elnewsRcptnAgreYn: '',

  smsRcptnAgreYn: '',
  emlRcptnAgreYn: ''
});

/**
 * name : changeAplcntRlprBrdt
 * desc : 날짜 변경 핸들러 (신청자 생년월일)
 */
const aplcntBrdt = ref<Date | null>(null);
const onAplcntRlprBrdt = (val: Date | null) => {
  if (val) {
    form.aplcntBrdt = dayjs(val).format('YYYY-MM-DD');
  }
};

// 폼 항목
const tel0 = computed({
  get() {
    if (form.dscsnAplcntTelno) {
      const numbers = form.dscsnAplcntTelno.split('-');
      return numbers[0];
    } else {
      return '';
    }
  },
  set(newValue) {
    let formatted = newValue.trim();

    // 숫자만 남기기 (기존 값이 +로 시작할 수도 있으니 앞의 +는 보존)
    formatted = formatted.replace(/[^\d+]/g, '');

    // 맨 앞에 +가 없으면 붙여주고, 있으면 그대로 둠
    if (formatted.length > 0 && !formatted.startsWith('+')) {
      formatted = `+${formatted}`;
    }

    const numbers = form.dscsnAplcntTelno.split('-');
    numbers.splice(0, 1, formatted);
    form.dscsnAplcntTelno = numbers.join('-');
  }
});

const tel1 = computed({
  get() {
    if (form.dscsnAplcntTelno) {
      const numbers = form.dscsnAplcntTelno.split('-');
      return numbers[1];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntTelno.split('-');
    numbers.splice(1, 1, newValue);
    form.dscsnAplcntTelno = numbers.join('-');
  }
});

const tel2 = computed({
  get() {
    if (form.dscsnAplcntTelno) {
      const numbers = form.dscsnAplcntTelno.split('-');
      return numbers[2];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntTelno.split('-');
    numbers.splice(2, 1, newValue);
    form.dscsnAplcntTelno = numbers.join('-');
  }
});

const tel3 = computed({
  get() {
    if (form.dscsnAplcntTelno) {
      const numbers = form.dscsnAplcntTelno.split('-');
      return numbers[3];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntTelno.split('-');
    numbers.splice(3, 1, newValue);
    form.dscsnAplcntTelno = numbers.join('-');
  }
});

const phone0 = computed({
  get() {
    if (form.dscsnAplcntMblTelno) {
      const numbers = form.dscsnAplcntMblTelno.split('-');
      return numbers[0];
    } else {
      return '';
    }
  },
  set(newValue) {
    let formatted = newValue.trim();

    // 숫자만 남기기 (기존 값이 +로 시작할 수도 있으니 앞의 +는 보존)
    formatted = formatted.replace(/[^\d+]/g, '');

    // 맨 앞에 +가 없으면 붙여주고, 있으면 그대로 둠
    if (formatted.length > 0 && !formatted.startsWith('+')) {
      formatted = `+${formatted}`;
    }

    const numbers = form.dscsnAplcntMblTelno.split('-');
    numbers.splice(0, 1, formatted);
    form.dscsnAplcntMblTelno = numbers.join('-');
  }
});

const phone1 = computed({
  get() {
    if (form.dscsnAplcntMblTelno) {
      const numbers = form.dscsnAplcntMblTelno.split('-');
      return numbers[1];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntMblTelno.split('-');
    numbers.splice(1, 1, newValue);
    form.dscsnAplcntMblTelno = numbers.join('-');
  }
});

const phone2 = computed({
  get() {
    if (form.dscsnAplcntMblTelno) {
      const numbers = form.dscsnAplcntMblTelno.split('-');
      return numbers[2];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntMblTelno.split('-');
    numbers.splice(2, 1, newValue);
    form.dscsnAplcntMblTelno = numbers.join('-');
  }
});

const phone3 = computed({
  get() {
    if (form.dscsnAplcntMblTelno) {
      const numbers = form.dscsnAplcntMblTelno.split('-');
      return numbers[3];
    } else {
      return '';
    }
  },
  set(newValue) {
    const numbers = form.dscsnAplcntMblTelno.split('-');
    numbers.splice(3, 1, newValue);
    form.dscsnAplcntMblTelno = numbers.join('-');
  }
});
const recaptcha = ref<boolean>(false);
// 폼 항목

const inqStore = useInqStore();
const { inqRequest } = storeToRefs(inqStore);

/**
 * name : selectUserInfo
 * desc : 로그인한 회원정보를 가져온다.
 */
const selectUserInfo = async () => {
  const response = await dscsnApis.selectLoginInfo();

  if (!response.data.mbrTelno) response.data.mbrTelno = '---';

  form.dscsnAplcntNm = response.data.mbrNm;
  form.dscsnAplcntMblTelno = '-' + response.data.mbrMblTelno;
  form.dscsnAplcntTelno = response.data.mbrTelno;
  form.dscsnAplcntEmlAddr =
    response.data.mbrEmlAddr + '@' + response.data.dmnEmlAddr;
};

/**
 * name : selectDscsnInfo
 * desc : 등록된 상담정보를 가져온다
 */
const selectDscsnInfo = async () => {
  const formData = new FormData();
  Object.keys(form).forEach(function (i) {
    formData.append(i, form[i]);
  });

  const response = await axios.post('/api/dscsn/selectKlacOvsInfo', formData);
  Object.keys(response.data).forEach(function (i) {
    if (form.hasOwnProperty(i)) {
      form[i] = response.data[i];
    }
  });

  if (form.smsRcptnAgreYn == 'Y') {
    form.smsCert = true;
  }

  if (form.emlRcptnAgreYn == 'Y') {
    form.emailCert = true;
  }

  if (form.elnewsRcptnAgreYn == 'Y') {
    form.elnewsRcptnAgre = true;
  }

  if (response.data.aplcntBrdt != null) {
    const str = response.data.aplcntBrdt; // "yyyyMMdd"
    const year = parseInt(str.substring(0, 4), 10);
    const month = parseInt(str.substring(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(str.substring(6, 8), 10);

    aplcntBrdt.value = new Date(year, month, day);
  }

  if (response.data.dscsnAplcntTelno != null) {
    form.dscsnAplcntTelno = formatPhone(response.data.dscsnAplcntTelno);
  }

  if (response.data.dscsnAplcntMblTelno != null) {
    form.dscsnAplcntMblTelno = formatPhone(response.data.dscsnAplcntMblTelno);
  }
};

/**
 * name : formatPhone
 * desc : 국가번호-번호1-번호2-번호3 형태로 변환한다.
 */
const formatPhone = (phone: string): string => {
  if (!phone) return '';

  const cleaned = phone.replace(/[^\d+]/g, '');
  let country = '';
  let rest = cleaned;

  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1);
    let matched = '';

    // 국가번호 후보: 3 → 2 → 1 자리 순으로 검사
    for (let len = 3; len >= 1; len--) {
      const candidate = digits.slice(0, len);
      if (callingCodes.value.has(candidate)) {
        matched = candidate;
        break;
      }
    }

    if (matched) {
      country = `+${matched}`;
      rest = digits.slice(matched.length);
    } else {
      rest = digits;
    }
  }

  let part1 = '',
    part2 = '',
    part3 = '';

  if (rest.length === 11) {
    // 11자리 → 3-4-4
    part1 = rest.slice(0, 3);
    part2 = rest.slice(3, 7);
    part3 = rest.slice(7);
  } else {
    // 그 외 → 뒤에서부터 4-3-나머지
    part3 = rest.slice(-4) || '';
    part2 = rest.slice(-7, -4) || '';
    part1 = rest.slice(0, Math.max(0, rest.length - 7)) || '';
  }

  return `${country ? country : ''}-${part1}-${part2}-${part3}`;
};

onBeforeMount(async () => {
  if (authenticated.value) {
    if (route.query.dscsnAplyNo === undefined) {
      selectUserInfo();
    } else {
      await loadCallingCodes();
      form.dscsnAplyNo = route.query.dscsnAplyNo;
      form.status = route.query.status;
      selectDscsnInfo();
    }
  } else {
    showAlert({
      icon: 'info',
      html: '본인인증 되었거나 회원 로그인 후 이용 가능 합니다.',
      confirmButtonText: '확인'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigateTo({
            path: '/login', //추후 anyid로 변경
            query: { redirect: route.fullPath } // 현재 페이지 전체 경로
          });
        }
      })
      .catch(() => {});
  }
});

const changePath = (event) => {
  const selectedValue = event.target.value;
  form.rcgPathCd = selectedValue;

  const selectedItem = codeList2.value?.find(
    (item) => item.value === selectedValue
  );

  form.rcgPathCdNm = selectedItem?.text || '';
};

const formRules: Record<string, RuleObject[]> = {
  dscsnAplcntNm: [valid.required()],
  engName: [valid.required()],
  dscsnAplcntTelno: [
    valid.required(),
    {
      validator: (_: any, value?: string) => {
        if (!value) return Promise.resolve(); // required는 별도 처리

        const raw = String(value).trim();
        // 숫자/플러스만 남기고 선두 외 '+' 제거
        let cleaned = raw.replace(/[^\d+]/g, '');
        if (cleaned.startsWith('+'))
          cleaned = '+' + cleaned.slice(1).replace(/\+/g, '');

        // E.164: +[1-9]\d{6,14}  (총 7~15자리)
        return /^\+[1-9]\d{6,14}$/.test(cleaned)
          ? Promise.resolve()
          : Promise.reject(
              new Error(`국제전화 형식(+국가코드, 7~15자리)이어야 합니다.`)
            );
      },
      trigger: ['blur', 'change']
    }
  ],
  rcgPathCd: [valid.required()],
  dscsnTtl: [valid.required()],
  dscsnCn: [valid.required()],
  wrtr_pswd: [{ min: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' }],
  passwordCheck: [
    {
      validator: (_, value) => {
        if (value !== form.wrtr_pswd) {
          return Promise.reject('비밀번호가 일치하지 않습니다.');
        }
        return Promise.resolve();
      },
      trigger: ['blur', 'change']
    }
  ]
};

/**
 * name : insertBtn
 * desc : 대한법률구조공단 사이버상담(국외) 신청 데이터 저장
 */
const insertBtn = async () => {
  if (contentRef.value != undefined) {
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  try {
    await formRef.value.validate();

    // if (!recaptcha.value) {
    //   await showAlert({
    //     icon: 'warning',
    //     html: '자동등록방지 확인이 필요합니다.'
    //   });
    //   return;
    // }

    const submit = await showAlert({
      icon: 'question',
      html: '작성하신 내용으로 상담예약 하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });

    if (submit.isConfirmed) {
      const formData = new FormData();

      let elnewsRcptnAgreYn = 'N';
      if (form.elnewsRcptnAgre) elnewsRcptnAgreYn = 'Y';
      form.elnewsRcptnAgreYn = elnewsRcptnAgreYn;

      let smsRcptnAgreYn = 'N';
      let emlRcptnAgreYn = 'N';
      if (form.smsCert) smsRcptnAgreYn = 'Y';
      if (form.emailCert) emlRcptnAgreYn = 'Y';
      form.smsRcptnAgreYn = smsRcptnAgreYn;
      form.emlRcptnAgreYn = emlRcptnAgreYn;

      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });

      formData.append('aplcntRlprSeCd', '01');
      formData.append('aplcntRlprSeq', '1');
      formData.append('aplcntNm', form.dscsnAplcntNm);

      const response = await axios.post(
        '/api/dscsn/insertCybKlacOvsAply',
        formData
      );

      if (response.status == 200) {
        const result = await showAlert({
          icon: 'info',
          html: '상담신청이 완료되었습니다.'
        });

        if (result.isConfirmed) {
          navigateTo(
            '/dscsn/cyber/CyberRsvtCmptnInfo?dscsnAplyNo=' + response.data
          );
        }
      }
    }
  } catch (err) {
    const errField = err.errorFields?.[0]?.name?.[0];
    if (errField && refMap[errField]?.value) {
      if (typeof refMap[errField].value.focus === 'function') {
        refMap[errField].value.focus();
      }
    }
  }
};

/**
 * name : updateBtn
 * desc : 대한법률구조공단 사이버상담(국외) 신청 데이터 수정
 */
const updateBtn = async () => {
  if (contentRef.value != undefined) {
    if (contentRef.value.getTextValue().trim() !== '') {
      form.dscsnCn = contentRef.value.getValue();
    }
  }

  try {
    await formRef.value.validate();

    // if (!recaptcha.value) {
    //   await showAlert({
    //     icon: 'warning',
    //     html: '자동등록방지 확인이 필요합니다.'
    //   });
    //   return;
    // }

    const submit = await showAlert({
      icon: 'question',
      html: '작성하신 내용으로 예약내용을 수정하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    });

    if (submit.isConfirmed) {
      const formData = new FormData();

      let elnewsRcptnAgreYn = 'N';
      if (form.elnewsRcptnAgre) elnewsRcptnAgreYn = 'Y';
      form.elnewsRcptnAgreYn = elnewsRcptnAgreYn;

      let smsRcptnAgreYn = 'N';
      let emlRcptnAgreYn = 'N';
      if (form.smsCert) smsRcptnAgreYn = 'Y';
      if (form.emailCert) emlRcptnAgreYn = 'Y';
      form.smsRcptnAgreYn = smsRcptnAgreYn;
      form.emlRcptnAgreYn = emlRcptnAgreYn;

      Object.keys(form).forEach(function (i) {
        formData.append(i, form[i]);
      });

      formData.append('aplcntRlprSeCd', '01');
      formData.append('aplcntRlprSeq', '1');
      formData.append('aplcntNm', form.dscsnAplcntNm);

      const response = await axios.post(
        '/api/dscsn/updateCybKlacOvsAply',
        formData
      );

      if (response.status == 200) {
        const result = await showAlert({
          icon: 'info',
          html: '상담신청 수정이 완료되었습니다.'
        });

        if (result.isConfirmed) {
          navigateTo(
            '/dscsn/cyber/CyberRsvtCmptnInfo?dscsnAplyNo=' + response.data
          );
        }
      }
    }
  } catch (err) {
    const errField = err.errorFields?.[0]?.name?.[0];
    if (errField && refMap[errField]?.value) {
      if (typeof refMap[errField].value.focus === 'function') {
        if (errField == 'dscsnAplcntMblTelno') {
          const ref = refMap[errField].value;
          if (!ref.first) {
            ref.firstFocus?.(); // select가 선택되지 않은 경우
          } else {
            ref.focus?.(); // 입력란으로 포커스
          }
        } else {
          refMap[errField].value.focus();
        }
      }
    }
  }
};

const cancel = () => {
  showAlert({
    icon: 'question',
    html: `예약을 취소하시겠습니까?<br/>취소 시 입력 사항은 저장되지 않으며 재예약 시 입력항목을 재입력 하셔야합니다.`,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      navigateTo('/');
    }
  });
};

const isValidTel = (tel: string, type: string): boolean => {
  const phoneRegex = /^(\+?\d{1,3})-(01[016789])-\d{3,4}-\d{4}$/;
  const telRegex = /^(\+?\d{1,3})-(0[2-6][0-9]?)-\d{3,4}-\d{4}$/;
  if (type == 'phone') {
    return phoneRegex.test(tel);
  } else {
    return telRegex.test(tel);
  }
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://www.google.com/recaptcha/api.js';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});

// 전역에 등록
window.recaptchaCallback = () => {
  recaptcha.value = true;
};

window.recaptchaExpiredCallback = () => {
  recaptcha.value = false;
};

/**
 * name: callingCodes
 * desc: 국가번호 보관
 */
const callingCodes = ref<Set<string>>(new Set());

/**
 * name: loadCallingCodes
 * desc: 국가번호 목록 조회
 */
const loadCallingCodes = async () => {
  const { data } = await useAxios().get('/api/dscsn/selectNtnRgnTelnoList');
  callingCodes.value = new Set(
    (data ?? [])
      .map((s: string) => String(s).trim())
      .filter(Boolean)
      .map((s: string) => s.replace(/^\+/, '')) // "+82" → "82"
  );
};

// 메뉴 넣으면 지워야함
const handleGoBack = () => {
  window.history.back();
};

const handlePrint = () => {
  window.print();
};
// 메뉴 넣으면 지워야함
</script>

<template>
  <div class="sub-content-box">
    <section class="section1">
      <div class="container">
        <!-- <Breadcrumb :showPrintButton="true" /> -->
        <!--퍼블리싱용 Breadcrumb-->
        <h2 class="sr-only">본문 내용 시작</h2>
        <div class="breadcrumb-title-box">
          <div class="title-box">
            <h3>사이버상담</h3>
          </div>
          <div class="breadcrumb-box">
            <nav aria-label="sub-breadcrumb" class="sub-breadcrumb">
              <ol class="breadcrumb">
                <!-- 홈 아이템 -->
                <li class="breadcrumb-item home-item">홈</li>
                <!-- 브레드크럼 항목 렌더링 -->
              </ol>
              <div class="btns-breadcrumb">
                <button class="btn prev-button" @click="handleGoBack">
                  <span class="text-span"> 뒤로가기 </span>
                </button>
                <button class="btn print-button" @click="handlePrint">
                  <span class="text-span"> 인쇄하기 </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <!--//퍼블리싱용 Breadcrumb-->
      </div>
    </section>
    <section class="section2">
      <div class="container">
        <CommonTitle tag="h4" size="1">
          대한법률구조공단 사이버상담 안내
        </CommonTitle>
        <div class="bull-list-box">
          <BullList type="dot">
            <li>
              사이버상담 접수 및 답변현황 등 정확한 안내를 위해 휴대전화번호를
              정확히 기입해 주시기 바랍니다.
            </li>
            <li>
              휴대전화번호를 고의로 잘못 기재한 경우 안내를 받으실 수 없으며,
              사이버상담실 이용에 일정한 제한이 있습니다.
            </li>
          </BullList>
        </div>

        <a-form :model="form" :rules="formRules" ref="formRef">
          <Accordion v-model:activeKey="activeKey" variant="gray">
            <template #expandIcon="{ isActive }">
              <AccordionIcon :isActive="isActive" />
            </template>
            <AccordionItem key="1">
              <template #header>
                <AccordionHead title="기본정보">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i
                  ><span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    사이버상담 기본정보의 성명, 전화번호, 휴대전화번호, 이메일,
                    비밀번호, 비밀번호 확인, 상담예약시간, 방문가능 공단사무소,
                    인지경로 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        성명
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="dscsnAplcntNm"
                          label="성명"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnAplcntNm"
                            ref="nameRef"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">
                        영문이름
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="engName"
                          label="영문이름"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            placeholder="예) 홍길동 = HONG GILDONG"
                            v-model:value="form.engName"
                            ref="engNameRef"
                            :maxlength="200"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">국가</th>
                      <td>
                        <a-select
                          id=""
                          class="common-select"
                          placeholder="선택"
                          v-model:value="form.aplcntNtnltyNm"
                        >
                          <a-select-option
                            v-for="zone in codeList3"
                            :value="zone.value"
                            >{{ zone.text }}</a-select-option
                          >
                          <!--                          <a-select-option value="1">국가</a-select-option>-->
                          <!--                          <a-select-option value="2">국가2</a-select-option>-->
                        </a-select>
                      </td>
                      <th scope="row">생년월일</th>
                      <td>
                        <div class="txt-form">
                          <a-form-item
                            name="aplcntRlprBrdt"
                            label="생년월일"
                            :labelCol="{ class: 'sr-only' }"
                            style="width: 200px"
                          >
                            <div class="date-picker__group">
                              <VueDatePicker
                                name="aplcntRlprBrdt"
                                id="write-period-aplcntRlprBrdt"
                                :year-range="[
                                  new Date().getFullYear() - 100,
                                  new Date().getFullYear() + 5
                                ]"
                                v-model="aplcntBrdt"
                                locale="ko"
                                :enable-time-picker="false"
                                :format="'yyyy-MM-dd'"
                                :auto-apply="true"
                                :clearable="false"
                                :transitions="false"
                                :highlight-week-days="[0]"
                                :week-start="0"
                                placeholder="생년월일 선택"
                                hide-input-icon
                                @update:model-value="onAplcntRlprBrdt"
                              />
                            </div>
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">주소</th>
                      <td>
                        <div class="form-group-box">
                          <AddrInput
                            v-model:zip="form.aplcntZip"
                            v-model:addr="form.aplcntAddr"
                            v-model:dAddr="form.aplcntDaddr"
                          />
                          <ul class="counsel-bull-sub-list">
                            <li>
                              <span class="num">※</span>
                              최소행정단위까지 정확히 기재
                            </li>
                          </ul>
                        </div>
                      </td>
                      <th scope="row">
                        전화번호
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <div class="form-group-box">
                          <a-form-item
                            name="dscsnAplcntTelno"
                            label="전화번호"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <div class="form-item__number country">
                              <a-input
                                class="text-bx"
                                placeholder="국가번호"
                                v-model:value="tel0"
                                ref="tel0Ref"
                                :maxlength="6"
                              />
                              <span class="dash">-</span>
                              <a-input
                                class="text-bx"
                                v-model:value="tel1"
                                ref="tel1Ref"
                                :maxlength="5"
                              />
                              <span class="dash">-</span>

                              <a-input
                                class="text-bx"
                                v-model:value="tel2"
                                ref="tel2Ref"
                                :maxlength="5"
                              />
                              <span class="dash">-</span>
                              <a-input
                                class="text-bx"
                                v-model:value="tel3"
                                ref="tel3Ref"
                                :maxlength="5"
                              />
                            </div>
                          </a-form-item>
                          <ul class="counsel-bull-sub-list">
                            <li>예)지역번호-국번-번호뒷자리</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">휴대전화</th>
                      <td>
                        <div class="form-group-box">
                          <div class="form-item__number">
                            <a-form-item
                              name="mobile1"
                              label="전화번호"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                placeholder="국가번호"
                                v-model:value="phone0"
                                :maxlength="3"
                              />
                            </a-form-item>
                            <span class="dash">-</span>
                            <a-form-item
                              name="mobile2"
                              label="전화번호"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="phone1"
                                :maxlength="5"
                              />
                            </a-form-item>
                            <span class="dash">-</span>
                            <a-form-item
                              name="mobile3"
                              label="전화번호"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="phone2"
                                :maxlength="5"
                              />
                            </a-form-item>
                            <span class="dash">-</span>
                            <a-form-item
                              name="mobile4"
                              label="전화번호"
                              :labelCol="{ class: 'sr-only' }"
                            >
                              <a-input
                                class="text-bx"
                                v-model:value="phone3"
                                :maxlength="5"
                              />
                            </a-form-item>
                          </div>
                          <ul class="counsel-bull-sub-list">
                            <li>예)지역번호-국번-번호뒷자리</li>
                          </ul>
                        </div>
                      </td>
                      <th scope="row">이메일</th>
                      <td>
                        <div class="form-group-box">
                          <div class="form-item__email">
                            <EmailInput v-model="form.dscsnAplcntEmlAddr" />
                          </div>
                          <a-checkbox
                            class="check-bx"
                            value=""
                            name="type"
                            v-model:checked="form.emailCert"
                            >이메일 수신동의</a-checkbox
                          >
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">비밀번호</th>
                      <td>
                        <a-form-item
                          name="wrtr_pswd"
                          label="비밀번호"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            type="password"
                            v-model:value="form.wrtr_pswd"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                      <th scope="row">비밀번호 확인</th>
                      <td>
                        <a-form-item
                          name="passwordCheck"
                          label="비밀번호 확인"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            type="password"
                            v-model:value="form.passwordCheck"
                            :maxlength="100"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        인지경로
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td colspan="3">
                        <div class="form-group-box">
                          <BullList type="refMark">
                            <li>귀하는 공단의 법률서비스를 어떻게 아셨나요?</li>
                          </BullList>
                          <a-form-item
                            name="rcgPathCd"
                            label="인지경로"
                            :labelCol="{ class: 'sr-only' }"
                          >
                            <a-radio-group
                              v-model:value="form.rcgPathCd"
                              @change="changePath"
                              ref="rcgPathRef"
                            >
                              <a-radio
                                class="radio-bx"
                                v-for="list in codeList2"
                                :value="list.value"
                                >{{ list.text }}</a-radio
                              >
                            </a-radio-group>
                          </a-form-item>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">자동등록방지</th>
                      <!--                    <td colspan="3">자동등록방지 영역</td>-->
                      <td colspan="3">
                        <div
                          class="g-recaptcha"
                          data-sitekey="6LdAtKorAAAAAAoG6cZzNE_SwDyIIV2renNEGg5n"
                          data-callback="recaptchaCallback"
                          data-expired-callback="recaptchaExpiredCallback"
                        ></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
            <AccordionItem key="2">
              <template #header>
                <AccordionHead title="상담내용입력">
                  <template #right>
                    <div class="form-ess_info pc-only">
                      <i class="red-span">*</i
                      ><span> 표시는 필수 입력 사항입니다. </span>
                    </div>
                  </template>
                </AccordionHead>
              </template>
              <div class="common-form__area">
                <p class="form-ess_info mo-only">
                  <i class="red-span">*</i
                  ><span> 표시는 필수 입력 사항입니다. </span>
                </p>
                <table>
                  <caption>
                    사이버상담 상담내용입력의 제목, 내용, 공개여부, 제3자
                    정보제공 및 공개 동의여부 입력에관한 표
                  </caption>
                  <tbody>
                    <tr>
                      <th scope="row">
                        제목
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <a-form-item
                          name="dscsnTtl"
                          label="제목"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <a-input
                            class="text-bx"
                            v-model:value="form.dscsnTtl"
                            ref="titleRef"
                            :maxlength="255"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        내용
                        <span class="red-span">
                          *<span class="sr-only">필수 입력 항목</span>
                        </span>
                      </th>
                      <td>
                        <label for="textMessage">
                          <span class="sr-only">textarea</span>
                        </label>
                        <a-form-item
                          name="dscsnCn"
                          label="내용"
                          :labelCol="{ class: 'sr-only' }"
                        >
                          <lazy-data-editor
                            ref="contentRef"
                            :initial-value="form.dscsnCn"
                          />
                        </a-form-item>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">공개여부</th>
                      <td>
                        <a-radio-group v-model:value="form.rlsYn">
                          <a-radio class="radio-bx" value="Y">공개</a-radio>
                          <a-radio class="radio-bx" value="N">비공개</a-radio>
                        </a-radio-group>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">제3자 정보제공 및 공개 동의여부</th>
                      <td>
                        <a-radio-group v-model:value="form.tdptyPvsnAgreYn">
                          <a-radio class="radio-bx" value="Y">예</a-radio>
                          <a-radio class="radio-bx" value="N">아니요</a-radio>
                        </a-radio-group>
                        <CommonTable class="mt-17px">
                          <caption>
                            사이버상담 제3자 정보제공 및 공개 동의여부 구분,
                            내용 에관한 표
                          </caption>
                          <colgroup>
                            <col width="20%" />
                            <col width="80%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col">구분</th>
                              <th scope="col">내용</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>개인정보</td>
                              <td>
                                이름·주민등록번호·주소·전화번호·아이디(ID)·전자우편(E-mail)·신체·교육·소득·신용정보
                                그 밖에 특정 개인의 과거 및 현재의 상황이나
                                상태를 나타낼 수 있는 정보 등
                              </td>
                            </tr>
                            <tr>
                              <td>민감정보</td>
                              <td>
                                사상·신념, 노동조합·정당의 가입·탈퇴, 정치적
                                견해, 건강, 성생활 등에 관한 정보, 그 밖에
                                정보주체의 사생활을 현저히 침해할 우려가 있는
                                개인정보로서 대통령령으로 정하는
                                정보(개인정보보호법 제23조)
                              </td>
                            </tr>
                            <tr>
                              <td>공개가 부적절한 경우</td>
                              <td>
                                내용부실, 비 소관사항, 악의적인 비방내용,
                                공개취지에 어긋나는 내용 등
                              </td>
                            </tr>
                          </tbody>
                        </CommonTable>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionItem>
          </Accordion>

          <div class="form-bottom-box">
            <a-checkbox
              class="check-bx"
              value="1"
              name="type"
              v-model:checked="form.smsCert"
            >
              SMS 수신동의 (예약번호 수신 시 필요합니다.)
            </a-checkbox>

            <a-checkbox
              class="check-bx"
              value="2"
              name="type"
              v-model:checked="form.elnewsRcptnAgre"
            >
              전자사보 수신동의
            </a-checkbox>
          </div>
        </a-form>

        <ButtonGroup align="center" class="!mt-50px" v-if="form.status == 'U'">
          <CommonButton variants="primary" width="xs" @click="updateBtn">
            수정하기
          </CommonButton>
          <CommonButton variants="line-primary" width="xs" @click="cancel">
            취소하기
          </CommonButton>
        </ButtonGroup>

        <ButtonGroup align="center" class="!mt-50px" v-else>
          <CommonButton variants="primary" width="xs" @click="insertBtn">
            신청하기
          </CommonButton>
          <CommonButton variants="line-primary" width="xs" @click="cancel">
            취소하기
          </CommonButton>
        </ButtonGroup>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/style/pages/dscsn/cyber/klac/CyberKlacOvsM';
</style>
