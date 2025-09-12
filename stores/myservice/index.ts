import { useAxios } from '~/composables/useAxios';
import type {
  EasySrchInstClsfListResult,
  EasySrchListQuery,
  EasySrchRgnListResult,
  EasySrchSubInstListResult,
  EasySrchSubTrprListResult,
  EasySrchSubTypeListResult,
  EasySrchTrprListResult,
  EasySrchTypeListResult,
  SrchTypeQuery
} from '~/stores/myservice/index.types';

export const useEasySrchStore = defineStore('useEasySrchStore', () => {
  const easySrchQuery = ref<EasySrchListQuery[]>([]);
  const easySrchTypeList = ref<EasySrchTypeListResult[]>([]);
  const easySrchSubTypeList = ref<EasySrchSubTypeListResult[]>([]);
  const easySrchTrprList = ref<EasySrchTrprListResult[]>([]);
  const easySrchSubTrprList = ref<EasySrchSubTrprListResult[]>([]);
  const easySrchInstClsfList = ref<EasySrchInstClsfListResult[]>([]);
  const easySrchSubInstList = ref<EasySrchSubInstListResult[]>([]);
  const easySrchRgnList = ref<EasySrchRgnListResult[]>([]);

  const isExpanded = ref(false);

  const findSrchTypeList = async (): Promise<EasySrchTypeListResult[]> => {
    try {
      const { data } = await useAxios().get('/api/srch/srchSvcList');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchTrprList = async (): Promise<EasySrchTrprListResult[]> => {
    try {
      const { data } = await useAxios().get('/api/srch/srchTrprList');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchInstList = async (): Promise<EasySrchInstClsfListResult[]> => {
    try {
      const { data } = await useAxios().get('/api/srch/srchInstList');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchMapList = async (): Promise<EasySrchRgnListResult[]> => {
    try {
      const { data } = await useAxios().get('/api/srch/srchMapList');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchSubTypeList = async (): Promise<
    EasySrchSubTypeListResult[]
  > => {
    try {
      const { data } = await useAxios().get('/api/srch/srchSvcList/list');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchSubTrprList = async (): Promise<
    EasySrchSubTrprListResult[]
  > => {
    try {
      const { data } = await useAxios().get('/api/srch/srchTrprList/list');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findSrchSubInstList = async (): Promise<
    EasySrchSubInstListResult[]
  > => {
    try {
      const { data } = await useAxios().get('/api/srch/srchInstList/list');
      return data;
    } catch (e) {
      return [];
    }
  };

  const findEasySrchList = async (
    query: SrchTypeQuery,
    easySrchQuery: EasySrchListQuery[]
  ) => {
    const params = new URLSearchParams();

    params.append('desc', query.desc);
    params.append('size', query.size);
    params.append('page', query.page);

    const typeQueryList = easySrchQuery.filter(({ type }) => type === 'type');
    if (easySrchTypeList.value.length !== typeQueryList.length) {
      easySrchQuery
        .filter(({ type }) => type === 'type')
        .forEach((item) => {
          params.append('srvcSvc', item.typeCd);
          for (const child of item.children) {
            params.append('srchSvcChk', child.subTypeCd);
          }
        });
    }

    const trprQueryList = easySrchQuery.filter(({ type }) => type === 'trpr');
    if (trprQueryList.length !== easySrchTrprList.value.length) {
      easySrchQuery
        .filter(({ type }) => type === 'trpr')
        .forEach((item) => {
          params.append('srvc', item.trprCd);
          for (const child of item.children) {
            params.append('srchChk', child.subTrprCd);
          }
        });
    }

    const instQueryList = easySrchQuery.filter(({ type }) => type === 'inst');
    if (instQueryList.length !== easySrchInstClsfList.value) {
      instQueryList.forEach((item) => {
        params.append('srvcInst', item.instClsfCd);
        for (const child of item.children) {
          params.append('srchInstChk', child.instNo);
        }
      });
    }

    const rgnQueryList = easySrchQuery.filter(({ type }) => type === 'rgn');
    if (rgnQueryList.length !== easySrchRgnList.value.length) {
      easySrchQuery
        .filter(({ type }) => type === 'rgn')
        .forEach((item) => {
          params.append('srvcMap', item.rgnCd);
        });
    }

    const { data } = await useAxios().get('/api/srch/srchMainList', {
      params
    });

    for (let i = 0; i < data.content.length; i++) {
      data.content[i].urls = data.content[i].urls.map((item: any) => {
        return {
          text: item.urlNm,
          to: item.urlAddr
        };
      });
    }

    return data;
  };

  return {
    findSrchTypeList,
    findSrchTrprList,
    findSrchInstList,
    findSrchMapList,
    findSrchSubTypeList,
    findSrchSubInstList,
    findSrchSubTrprList,
    easySrchQuery,
    easySrchTypeList,
    easySrchSubTypeList,
    easySrchTrprList,
    easySrchSubTrprList,
    easySrchInstClsfList,
    easySrchSubInstList,
    easySrchRgnList,
    isExpanded,
    findEasySrchList
  };
});
