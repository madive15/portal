import type { PageType } from '~/types/common';

export const findTmplt = (page: PageType): any => {
  const axios = useAxios();
  return axios.get('/api/tmplt/list/A00000000010', {
    params: {
      ...page
    }
  });
};

export const findDscsn = (page: PageType) => {
  const axios = useAxios();
  return axios.get('/api/dscsn/list/A00000000010', {
    params: {
      ...page
    }
  });
};

export const findDetailDscsn = (dscsnNo: string) => {
  const axios = useAxios();
  return axios.get('/api/dscsn/detail/A00000000010', {
    params: {
      dscsnNo
    }
  });
};
