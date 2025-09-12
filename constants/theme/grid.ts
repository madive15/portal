import { OptPreset } from 'tui-grid/types/options';

export const TUI_GRID_THEME: OptPreset = {
  selection: {
    background: '#4daaf9',
    border: '#004082'
  },
  scrollbar: {
    background: '#f5f5f5',
    thumb: '#d9d9d9',
    active: '#c1c1c1'
  },
  outline: {
    border: '#e1e2e5'
  },
  area: {
    header: {
      border: '#e1e2e5',
      background: '#f8f8f9'
    }
  },
  row: {
    even: {
      background: '#EFFAFF'
    }
  },
  cell: {
    normal: {
      background: 'white',
      border: '#eee',
      showVerticalBorder: true
    },
    header: {
      background: '#f8f8f9',
      showHorizontalBorder: true,
      showVerticalBorder: true
    },
    rowHeader: {
      border: '#e1e2e5',
      background: '#f8f8f9',
      showHorizontalBorder: false,
      showVerticalBorder: false
    },
    editable: {
      // 수정 가능 셀 색상은 아래에
      background: 'white'
    },
    selectedHeader: {
      background: '#e0e0e0'
    },
    focused: {
      border: '#418ed4'
    },
    disabled: {
      text: '#333',
      background: 'white'
    },
    invalid: {
      background: '#D60440'
    },
    required: {
      background: 'white'
    }
  }
};
