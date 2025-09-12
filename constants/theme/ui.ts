import type { ThemeConfig } from 'ant-design-vue/lib/config-provider/context';

export const FONT_FAMILY =
  '"Pretendard GOV Variable", "Pretendard GOV", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif';

export const DEFAULT_THEME: ThemeConfig = {
  token: {
    fontFamily: `${FONT_FAMILY}`,
    fontSize: 16,
    fontSizeIcon: 12,
    colorPrimary : '#0d6efd',
    colorError : '',
    colorWarning : '',
    colorInfo : '#ececec',
  },
  components : {
    Button : {

    },
    Dropdown : {

    }
  }
};

