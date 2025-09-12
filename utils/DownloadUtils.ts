import { toBytes } from '~/utils/BlobUtils';

export const DownloadUtils = {
  download: (data: any) => {
    const a = document.createElement('a');
    const blob = toBytes(data.data, data.mimeType);
    a.href = URL.createObjectURL(blob);
    a.download = data.filename;
    a.click();
    a.remove();
  }
};

export const OpenPdfViewer = (pdfId: string) => {
  window.open(`/streamdocs/view/sd;streamdocsId=${pdfId}`, '_blank');
};
