<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import 'tui-grid/dist/tui-grid.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import Grid, { type RowKey } from 'tui-grid';
import { cloneDeep } from 'lodash-es';
import type { DataGridType } from '~/types/data/grid';
import type { GridEventName, OptRow } from 'tui-grid/types/options';
import { TUI_GRID_THEME } from '~/constants/theme/grid';

Grid.setLanguage('ko', {
  display: {
    noData: '조회된 데이터가 존재하지 않습니다.'
  }
});

Grid.applyTheme('default', TUI_GRID_THEME);

const gridRef = ref();
const instance = ref<Grid>();

const props = defineProps<DataGridType>();

onMounted(() => {
  const gridOptions = {
    el: gridRef.value,
    columns: props.columns ?? [],
    data: cloneDeep(props.data) ?? [],
    bodyHeight: props.bodyHeight,
    columnOptions: props.columnOptions,
    keyColumnName: props.keyColumnName,
    width: props.width,
    heightResizable: props.heightResizable,
    minBodyHeight: props.minBodyHeight,
    rowHeight: props.rowHeight ?? 40,
    minRowHeight: props.minRowHeight,
    scrollX: props.scrollX,
    scrollY: props.scrollY,
    editingEvent: props.editingEvent,
    tabMode: props.tabMode,
    rowHeaders: props.rowHeaders,
    summary: props.summary,
    useClientSort: props.useClientSort,
    selectionUnit: props.selectionUnit,
    showDummyRows: props.showDummyRows,
    copyOptions: props.copyOptions,
    pageOptions: props.pageOptions,
    treeColumnOptions: props.treeColumnOptions,
    header: props.header,
    usageStatistics: false,
    disabled: props.disabled,
    draggable: props.draggable,
    contextMenu: props.contextMenu
  };

  if (props.onGridMounted) {
    gridOptions['onGridMounted'] = props.onGridMounted;
  }
  if (props.onGridUpdated) {
    gridOptions['onGridUpdated'] = props.onGridUpdated;
  }
  if (props.onGridBeforeDestroy) {
    gridOptions['onGridBeforeDestroy'] = props.onGridBeforeDestroy;
  }

  instance.value = new Grid(gridOptions);
});

const appendRow = (value: OptRow) => {
  instance.value?.appendRow(value);
};

const appendRows = (value: OptRow[]) => {
  instance.value?.appendRows(value);
};

const prependRow = (value: OptRow) => {
  instance.value?.prependRow(value);
};

const getCheckedRows = () => {
  return instance.value?.getCheckedRows();
};

const getData = () => {
  return instance.value?.getData();
};

const validate = () => {
  return instance.value?.validate();
};

const resetData = (data: OptRow[]) => {
  instance.value?.resetData(data);
};

const removeRow = (data: RowKey) => {
  instance.value?.removeRow(data);
};

const removeRows = (data: RowKey[]) => {
  instance.value?.removeRows(data);
};

const on = (eventName: GridEventName, eventFunction: (event) => void) => {
  instance.value?.on(eventName, eventFunction);
};

const off = (eventName: GridEventName) => {
  instance.value?.off(eventName);
};

const expandAll = () => {
  instance.value?.expandAll();
};

const collapseAll = () => {
  instance.value?.collapseAll();
};

const disableRowCheck = (rowKey: RowKey) => {
  instance.value?.disableRowCheck(rowKey);
};

const getValue = (rowKey: RowKey, columnName: string) => {
  return instance.value?.getValue(rowKey, columnName);
};

const setValue = (rowKey: RowKey, columnName: string, value: string) => {
  instance.value?.setValue(rowKey, columnName, value);
};

const refreshLayout = () => {
  instance.value?.refreshLayout();
};

const setRow = (rowKey: RowKey, row: OptRow) => {
  instance.value?.setRow(rowKey, row);
};

const getRow = (rowKey: RowKey) => {
  return instance.value?.getRow(rowKey);
};

const hideColumn = (columnName: string) => {
  instance.value?.hideColumn(columnName);
};

const showColumn = (columnName: string) => {
  instance.value?.showColumn(columnName);
};

defineExpose({
  appendRow,
  appendRows,
  prependRow,
  getCheckedRows,
  getData,
  validate,
  resetData,
  on,
  off,
  removeRow,
  removeRows,
  expandAll,
  collapseAll,
  disableRowCheck,
  getValue,
  setValue,
  getRow,
  setRow,
  refreshLayout,
  hideColumn,
  showColumn
});

watch(
  () => props.data,
  (newValue) => {
    resetData(newValue);
  }
);
</script>

<template>
  <div ref="gridRef" :key="uuid" />
</template>
