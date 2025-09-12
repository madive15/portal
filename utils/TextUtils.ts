export const telephoneNumber = (text: string) => {
  if (!text) {
    return '';
  }
  // return text.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');

  if (text.substring(0, 2) == '02') {
    return text.replace(/^(\d{2})(\d{3,4})(\d{4})$/, '$1-$2-$3');
  } else {
    return text.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
  }
};
