// stores/sso.ts
import { defineStore } from 'pinia';

export const useSsoStore = defineStore('sso', {
  state: () => ({
    sso: {} as Record<string, any> // 필요한 구조에 따라 타입 지정
  }),
  actions: {
    setSso(data: any) {
      this.sso = data;
    }
  }
});
