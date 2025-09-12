// /stores/auth.ts
import { defineStore } from 'pinia';

export type Sso = Record<string, any>; // 필요하면 정확한 타입으로 교체
export type UserInfo = Record<string, any>;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sso: {} as Sso, // 기존과 동일: 초기값 {}
    userinfo: {} as UserInfo
  }),

  getters: {
    isLoggedIn: (state) => !!(state.sso as any)?.token // 토큰 기준 예시
  },

  actions: {
    // Vuex의 mutations.sso
    setSso(data: Sso) {
      console.log('sso data : ', data); // 개발용 로그(완료 후 주석)
      this.sso = data;
    },
    // Vuex의 mutations.userinfo
    setUserinfo(data: UserInfo) {
      console.log('userinfo data : ', data);
      this.userinfo = data;
    },
    clearSso() {
      this.sso = {} as Sso;
    },
    clearUserinfo() {
      this.userinfo = {} as UserInfo;
    }
  }
});
