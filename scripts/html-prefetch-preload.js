import * as fs from 'fs';
import path from 'path';

export const modifyHtmlFiles = (dir) => {
  console.log(dir);
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      modifyHtmlFiles(filePath);
    } else if (path.extname(file) === '.html') {
      modifyHtmlFile(filePath);
    }
  });
};

const modifyHtmlFile = (filePath) => {
  try {
    let html = fs.readFileSync(filePath, 'utf-8');
    html = html.replace(/rel="prefetch"/g, 'rel="modulepreload"');
    fs.writeFileSync(filePath, html);
  } catch (error) {
    console.log(
      `prefetch를 preload로 변경하는 도중 에러가 발생되었습니다: ${filePaht}(${error.meesage})`
    );
  }
};

modifyHtmlFiles('./dist');
