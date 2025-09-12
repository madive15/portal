import { defineStore } from 'pinia';
import { useAxios } from '~/composables/useAxios';

export const useFileStore = defineStore('useFileStore', () => {
  const createAtchFileId = async (atchfilegroup: any) => {
    return useAxios().post('/api/atchFileId', atchfilegroup);
  };

  const fileList = (atchFileId: string) => {
    return useAxios().get('/api/fileList', {
      params: {
        atchFileId
      }
    });
  };

  const upload = (formData: any) => {
    return useAxios().post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const download = (atchFileId: string, atchFileSeq?: number) => {
    return useAxios().get('/api/download', {
      params: {
        atchFileId,
        atchFileSeq
      }
    });
  };

  const deleteFileList = (files: any) => {
    return useAxios().post('/api/deleteFileList', files, {});
  };

  return {
    createAtchFileId,
    fileList,
    upload,
    download,
    deleteFileList
  };
});
