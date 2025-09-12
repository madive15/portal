<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { v4 as uuid } from 'uuid';
import { useFileStore } from '~/stores/file';
import { DownloadUtils } from '~/utils/DownloadUtils';
import type { FileType } from 'ant-design-vue/es/upload/interface';

const acceptMimeTypes = [
  'text/plain',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'application/haansofthwp',
  'application/vnd.hancom.hwp',
  'application/haansofthwp',
  'application/x-hwp',
  'application/vnd.hancom.hwpx',
  'application/haansofthwpx',
  'application/zip',
  'application/x-zip-compressed',
  'image/*'
];

const fileStore = useFileStore();
const atchFileId = defineModel<string>('atchFileId');
const fileList: Ref<IFileList[]> = ref([]);
const fileInfoList = defineModel('fileInfoList');

interface IFileList {
  uid: string;
  name: string;
  size: string;
  url: string;
  dsctn: string | null;
}

const uploadedFileList = computed(() => {
  return fileList.value.map((item) => ({
    uid: `${item.atchFileId}-${item.atchFileSeq}`,
    name: item.orgnlFileNm,
    size: item.atchFileSz,
    atchFileId: item.atchFileId,
    atchFileSeq: item.atchFileSeq,
    atxtExpln: item.atxtExpln ? item.atxtExpln : null,
    url:
      props.mode === 'normal'
        ? `/api/download?atchFileId=${item.atchFileId}&atchFileSeq=${item.atchFileSeq}`
        : `/api/image?atchFileId=${item.atchFileId}&atchFileSeq=${item.atchFileSeq}`
  }));
});

type PropType = {
  view: boolean;
  mode: 'normal' | 'gallery';
  maxCount: number;
  module: string;
  size?: number;
};

const accept = computed(() => {
  if (props.mode === 'normal') {
    return acceptMimeTypes.join(',');
  } else {
    return 'image/*';
  }
});

const listType = computed(() => {
  return props.mode === 'normal' ? 'text' : 'picture';
});

const props = withDefaults(defineProps<PropType>(), {
  view: false,
  mode: 'normal',
  maxCount: 1,
  module: ''
});

onBeforeMount(async () => {
  if (!!atchFileId.value) {
    const { data } = await fileStore.fileList(atchFileId.value);
    fileList.value = data;
  }
});

const queue = ref<string[]>([]);

const beforeUpload = async (file, files: FileType[]) => {
  if (props.maxCount < files.length + fileList.value.length) {
    message.warning(`파일은 ${props.maxCount}개만 업로드가 가능합니다.`);
    return false;
  }

  if (props.size) {
    const limitSize = props.size * 1024 * 1024;
    const uploadedSize = uploadedFileList.value.reduce(
      (acc, cur) => acc + cur.size,
      0
    );
    const uploadSize = files.reduce((acc, cur) => acc + cur.size, 0);

    const isLimitFileSize = uploadedSize + uploadSize > limitSize;

    if (isLimitFileSize) {
      if (files[files.length - 1].uid === file.uid) {
        message.warning(`첨부파일 용량은 ${props.size}M이하로 올려주세요.`);
      }

      return;
    }
  }

  const uploadFileList = files.filter((file) =>
    file.uid.startsWith('vc-upload')
  );

  if (uploadFileList.length > 0 && queue.value.length === 0) {
    Array.prototype.join.apply(
      queue.value,
      files.map(({ uid }) => uid)
    );

    const formData = new FormData();
    if (!atchFileId.value) {
      const { data } = await fileStore.createAtchFileId({
        taskSeId: props.module
      });

      atchFileId.value = data.atchFileId;
      formData.append('atchFileId', data.atchFileId);
    } else {
      formData.append('atchFileId', atchFileId.value);
    }

    for (const file of uploadFileList) {
      formData.append('file', file);
    }

    fileStore
      .upload(formData)
      .then(({ data }) => {
        fileList.value = [...fileList.value, ...data];
        queue.value = [];
      })
      .catch((e) => {
        if (e.status === 406) {
          message.error('파일에서 개인정보가 검출되었습니다.');
        }
      });
  }

  return false;
};

const download = async (file) => {
  const [response] = file.response;
  const { atchFileId, atchFileSeq } = response;
  fileStore.download(atchFileId, atchFileSeq).then(({ data }) => {
    DownloadUtils.download(data);
  });
};

const deleteFile = (file) => {
  return new Promise((resolve) => {
    Modal.confirm({
      type: 'warning',
      title: '파일 삭제',
      okText: '확인',
      cancelText: '취소',
      content: `${file.name} 파일을 삭제하시겠습니까?`,
      onOk: () => {
        const fileId = file.uid.split('-');

        fileStore
          .deleteFileList([{ atchFileId: fileId[0], atchFileSeq: fileId[1] }])
          .then(() => {
            fileList.value = fileList.value.filter(
              (item) => item.atchFileSeq !== parseInt(fileId[1])
            );

            message.success(`${file.name} 파일이 삭제되었습니다.`);

            if (fileList.value.length === 0) {
              atchFileId.value = undefined;
            }
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      },
      onCancel: () => {
        resolve(false);
      }
    });
  });
};

watch(
  uploadedFileList,
  (newValue) => {
    fileInfoList.value = newValue;
  },
  { deep: true }
);

const showUploadList = computed(() => {
  if (props.view) {
    return {
      showRemoveIcon: false
    };
  } else {
    return true;
  }
});
</script>

<template>
  <client-only>
    <a-space direction="vertical" class="w-full">
      <a-upload-dragger
        name="file"
        :class="['w-full', 'h-full', view ? 'none' : '']"
        :list-type="listType"
        v-model:file-list="uploadedFileList"
        :key="uuid"
        :accept="accept"
        :multiple="true"
        :max-count="maxCount"
        :before-upload="beforeUpload"
        :on-preview="(file) => download(file)"
        @remove="deleteFile"
        :show-upload-list="showUploadList"
      >
        <div v-if="!view">
          <p style="font-size: 1rem">
            <inbox-outlined />
          </p>
          <p class="mb-2">
            업로드할 파일을 여기로 드래그하거나 해당 영역을 클릭해주세요.
          </p>
        </div>
        <template #itemRender="{ originNode, file }">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 8px;
            "
          >
            <!-- 기존 항목 노드 유지 -->
            <div style="flex: 1">
              <component :is="originNode" />
            </div>

            <!-- 오른쪽 input 박스 -->
            <a-input
              type="text"
              placeholder="파일 설명을 입력하세요."
              style="width: 300px"
              v-model:value="file.atxtExpln"
            />
          </div>
        </template>
      </a-upload-dragger>
    </a-space>
  </client-only>
</template>

<style>
.none > div.ant-upload {
  display: none !important;
}

.ant-upload-list-item-name {
  cursor: pointer;
}
</style>
<style scoped lang="scss">
@use './scss/fileupload';
</style>
