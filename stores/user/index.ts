import { DEFAULT_USER } from './const';
import { User } from '~/types/user';

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User>(DEFAULT_USER);
  const users = ref<User[]>([]);

  return {
    user,
    users
  };
});