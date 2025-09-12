import { defineStore } from 'pinia';

interface Sso {
  [key: string]: any;
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    sso: {} as Sso
  }),
  actions: {
    setSso(data: Sso) {
      console.log('sso data:', data);
      this.sso = data;
    }
  }
});
