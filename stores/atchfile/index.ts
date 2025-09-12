import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';

export const useFileStore = defineStore('useFileStore', () => {
  // 첨부파일아이디 생성
  const createAtchFileId = async (taskSeId: string) => {
    return useAxios().get('/api/comAtchFile/createAtchFileId', {
      params: {
        taskSeId
      }
    });
  };

  // 공통첨부파일 조회
  const selectComAtchFile = (atchFileId: string, atchFileSeq?: number) => {
    return useAxios().get('/api/comAtchFile/selectComAtchFile', {
      params: {
        atchFileId,
        atchFileSeq
      }
    });
  };

  // 공통첨부파일 등록
  const insertComAtchFile = (formData: any) => {
    return useAxios().post('/api/comAtchFile/insertComAtchFile', formData);
  };

  // 공통첨부파일(복사) 등록
  const insertComAtchFileCopy = (formData: any) => {
    return useAxios().post('/api/comAtchFile/insertComAtchFileCopy', formData);
  };

  // 공통첨부파일 다운로드
  const downloadAtchFile = (atchFileId: string, atchFileSeq?: number) => {
    return useAxios().get('/api/download', {
      params: {
        atchFileId,
        atchFileSeq
      }
    });
  };

  return {
    createAtchFileId,
    selectComAtchFile,
    insertComAtchFile,
    insertComAtchFileCopy,
    downloadAtchFile
  };
});
