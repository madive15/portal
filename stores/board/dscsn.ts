import { findDetailDscsn } from '~/apis/tmplt';

export const useDscsnStore = defineStore('useDscsnStore', () => {
  const data = ref<any>({
    previousDscsn: null,
    nextDscsn: null
  });
  const loadData = async (id: string) => {
    const result = await findDetailDscsn(id);
    data.value = result.data;
  };

  return {
    data,
    loadData
  };
});
