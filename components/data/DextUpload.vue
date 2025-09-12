<script setup lang="ts">
/*
 * 파일 전송은 글쓰기 완료 시 진행하도록 함
 * 반드시 ref를 사용해야 하고 ref에서는 transferFiles를 호출해야 함
 *
 * - ATCH_FILE_ID 낭비가 심해짐
 * - 작성하지도 않았는데 파일 올리는 것을 이상하게 생각할 수 있음
 *
 * <lazy-data-dext-upload
 *       v-once
 *       ref="uploadRef"
 *       v-model:atch-file-id="detail.atchFileId"
 * />
 * */
import { useFileStore } from '~/stores/file';

const fileStore = useFileStore();

const props = defineProps({
  id: {
    type: String,
    default: 'dext5'
  },
  fileCount: {
    type: Number,
    required: true,
    default: 1
  },
  fileItemSize: {
    type: Number,
    required: true,
    default: 1
  },
  fileTotalSize: {
    type: Number,
    required: true,
    default: 10
  },
  mode: {
    type: String as PropType<'view' | 'edit'>,
    required: true,
    default: 'edit'
  }
});

const atchFileId = defineModel('atchFileId', {
  default: '',
  required: true
});

onMounted(() => {
  const script = document.createElement('script');
  script.src = '/dext5/js/dext5upload.js';
  script.onload = () => {
    DEXT5UPLOAD.config.Event = {
      // 업로드 시작 전 처리할 내용(현재는 미사용)
      TransferStart: async (uploadId) => {
        try {
          return true;
        } catch (e) {
          return false;
        }
      },
      // 화면 onload 이벤트
      CreationComplete: async (uploadId) => {
        DEXT5UPLOAD.config.Width = '100%';
        DEXT5UPLOAD.SetConfig('ButtonBarEdit', 'add,remove', props.id);
        DEXT5UPLOAD.SetConfig('UploadHolder', props.id, props.id);
        DEXT5UPLOAD.SetMaxTotalFileCount(String(props.fileCount), props.id);
        DEXT5UPLOAD.SetMaxOneFileSize(props.fileItemSize + 'MB', props.id);
        DEXT5UPLOAD.SetMaxTotalFileSize(props.fileTotalSize + 'MB', props.id);
        // 확장자별 용량 제한
        // DEXT5UPLOAD.config.MaxOneFileSizeByExtension = 'jpg|5MB';

        // DEXT5UPLOAD.config.ExtensionAllowOrLimit = '1'; // 0: black list, 1: white list

        // TODO globals.properties에 있는 whitelist와 동일하게 맞춰주세요.
        DEXT5UPLOAD.SetAllowOrLimitExtension(
          '1',
          'txt,xls,xlsx,doc,docx,ppt,pptx,pdf,hwp,hwpx,zip,png,jpg,jpeg,bmp,gif',
          'dext5'
        );

        // 리스트 불러오기
        if (atchFileId.value) {
          const { data } = await fileStore.fileList(atchFileId.value);
          data.forEach((item) => {
            DEXT5UPLOAD.AddUploadedFile(
              `${item.atchFileId}-${item.atchFileSeq}`,
              item.orgnlFileNm,
              `/api/download?atchFileId=${item.atchFileId}&atchFileSeq=${item.atchFileSeq}`,
              `${item.atchFileSz}`,
              '',
              props.id
            );
          });
        }
      },
      BeforeDeleteItem: async (
        uploadID,
        strWebFile,
        strItemKey,
        strItemUrlOrPath,
        nDeleteItemIndex
      ) => {
        const atchFileId = strItemKey.split('-')[0];
        const atchFileSeq = strItemKey.split('-')[1];

        if (!atchFileId || !atchFileSeq) {
          return true;
        }
        try {
          await fileStore.deleteFileList([
            {
              atchFileId,
              atchFileSeq
            }
          ]);
          return true;
        } catch (e) {
          return false;
        }
      }
    };

    DEXT5UPLOAD.config.UploadHolder = props.id;
    new Dext5Upload(`${props.id}`);
  };

  document.head.appendChild(script);
});

const transferFiles = async () => {
  if (!atchFileId.value) {
    const { data } = await fileStore.createAtchFileId({
      taskSeId: 'common'
    });

    atchFileId.value = data.atchFileId;
  }

  DEXT5UPLOAD.SetConfig(
    'HandlerUrl',
    `/api/dext5/upload?atchFileId=${atchFileId.value}`,
    props.id
  );

  DEXT5UPLOAD.TransferEx(props.id);
};

defineExpose({
  transferFiles
});
</script>

<template>
  <div :id="id"></div>
</template>
