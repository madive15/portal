/**
 * name : required
 * description : 필수값 체크
 */
export const required = (label: string) => ({
  required: true,
  message: '${label}은(는) 필수입력 값입니다.',
  trigger: 'blur'
});

/**
 * name : mobile
 * description : 휴대전화번호 유효성 검증
 */
export const mobile = (label: string) => ({
  pattern: /^(01[016789])-?\d{3,4}-?\d{4}$/,
  message: '${label} 형식이 올바르지 않습니다.',
  trigger: ['blur', 'change']
});

/**
 * name : telNum
 * description : 전화번호 유효성 검증
 */
export const telNum = (label: string) => ({
  pattern: /^\d{2,3}-?\d{3,4}-?\d{4}$/,
  message: '${label} 형식이 올바르지 않습니다.',
  trigger: ['blur', 'change']
});

/**
 * name : email
 * description : 이메일 유효성 검증
 */
export const email = (label: string) => ({
  validator: (_: any, value: string) => {
    if (!value) return Promise.resolve();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value)
      ? Promise.resolve()
      : Promise.reject('${label} 형식이 올바르지 않습니다.');
  },
  trigger: ['blur', 'change']
});

/**
 * name : checkbox
 * description : 체크박스 체크여부 체크
 */
export const checkbox = (label: string) => ({
  validator: (_: any, value: boolean) =>
    value
      ? Promise.resolve()
      : Promise.reject(new Error(`${label}에 동의가 필요합니다.`)),
  trigger: 'change'
});

/**
 * name : addressGroup
 * description : 우편번호와 주소 모두 입력되었는지 체크
 */
export const addressGroup = <T extends object>(
  form: T,
  zipKey: keyof T,
  addrKey: keyof T
) => ({
  validator: () =>
    form[zipKey] && form[addrKey]
      ? Promise.resolve()
      : Promise.reject(new Error(`우편번호와 주소는 필수입력 값입니다.`)),
  trigger: ['blur', 'change']
});

/**
 * name : rlprRrno
 * description : 주민등록번호(날짜/성별코드/체크섬) 검증
 * - 2020-10-05 이후 출생자: 체크섬 없음(무작위 뒷 6자리) → 체크섬 건너뜀
 * - 그 이전 출생자: 기존 체크섬 적용
 */
export const rlprRrno = (label = '주민등록번호') => ({
  validator: (_: any, value?: string) => {
    if (!value) return Promise.resolve(); // required와 분리

    const s = value.replace(/-/g, '');
    if (!/^\d{13}$/.test(s)) {
      return Promise.reject(new Error(`${label} 형식이 올바르지 않습니다.`));
    }

    // 생년월일/성별코드
    const yy = Number(s.slice(0, 2));
    const mm = Number(s.slice(2, 4));
    const dd = Number(s.slice(4, 6));
    const g = Number(s[6]);

    // 성별코드 유효성(내/외국인 코드까지 허용: 1~8)
    if (![1, 2, 3, 4, 5, 6, 7, 8].includes(g)) {
      return Promise.reject(new Error(`${label} 형식이 올바르지 않습니다.`));
    }

    // 세기 결정
    const century = [1, 2, 5, 6].includes(g)
      ? 1900
      : [3, 4, 7, 8].includes(g)
        ? 2000
        : null;
    if (century === null) {
      return Promise.reject(new Error(`${label} 형식이 올바르지 않습니다.`));
    }

    const year = century + yy;

    // 날짜 유효성 체크(윤년 포함)
    const date = new Date(year, mm - 1, dd);
    const validDate =
      date.getFullYear() === year &&
      date.getMonth() === mm - 1 &&
      date.getDate() === dd;
    if (!validDate) {
      return Promise.reject(
        new Error(`${label}의 생년월일이 유효하지 않습니다.`)
      );
    }

    // 2020-10-05 이후 출생자는 체크섬 없음 → 건너뜀
    const skipChecksum =
      year > 2020 || (year === 2020 && (mm > 10 || (mm === 10 && dd >= 5)));

    if (skipChecksum) {
      return Promise.resolve();
    }

    // (구) 체크섬 검증: (11 - (∑(d1..d12 * w) % 11)) % 10 === d13
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    const sum = weights.reduce((acc, w, i) => acc + Number(s[i]) * w, 0);
    const check = (11 - (sum % 11)) % 10;

    return check === Number(s[12])
      ? Promise.resolve()
      : Promise.reject(new Error(`${label}가 유효하지 않습니다.`));
  },
  trigger: ['blur', 'change']
});
