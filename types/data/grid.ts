import type {
  GridEventListener,
  OptColumn,
  OptHeader,
  OptRow,
  OptRowHeader,
  OptSummaryData,
  OptTree
} from 'tui-grid/types/options';
import type { EditingEvent, TabMode } from 'tui-grid/types/store/focus';
import type { SelectionUnit } from 'tui-grid/types/store/selection';
import type {
  ClipboardCopyOptions,
  ColumnOptions
} from 'tui-grid/types/store/column';
import type { PageOptions } from 'tui-grid/types/store/data';
import type { CreateMenuGroups } from 'tui-grid/types/store/contextMenu';

export type DataGridType = {
  data: OptRow[];
  columns: OptColumn[];
  bodyHeight?: number | 'fitToParent' | 'auto';
  columnOptions?: ColumnOptions;
  keyColumnName?: String;
  width?: number | 'auto';
  heightResizable?: Boolean;
  minBodyHeight?: Number;
  rowHeight?: number | 'auto';
  minRowHeight?: Number;
  scrollX?: Boolean;
  scrollY?: Boolean;
  editingEvent?: EditingEvent;
  tabMode?: TabMode;
  rowHeaders?: OptRowHeader[];
  summary?: OptSummaryData;
  useClientSort?: Boolean;
  selectionUnit?: SelectionUnit;
  showDummyRows?: Boolean;
  copyOptions?: ClipboardCopyOptions;
  pageOptions?: PageOptions;
  treeColumnOptions?: OptTree;
  header?: OptHeader;
  usageStatistics?: Boolean;
  disabled?: Boolean;
  onGridMounted?: GridEventListener;
  onGridUpdated?: GridEventListener;
  onGridBeforeDestroy?: GridEventListener;
  draggable?: Boolean;
  contextMenu?: CreateMenuGroups;
};
