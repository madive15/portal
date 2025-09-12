import type { CreateSatisfactionType } from '~/types/satisfaction';

export const createSatisfaction = async (
  createSatisfaction: CreateSatisfactionType
) => {
  return await useAxios().post(
    `/api/satisfaction/satisfaction`,
    createSatisfaction
  );
};
