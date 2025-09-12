// plugins/chartjs.ts
import { defineNuxtPlugin } from '#app';
import { Chart, registerables } from 'chart.js';
//FIXME import ChartDataLabels from 'chartjs-plugin-datalabels'

// Chart.js 기본 등록
Chart.register(...registerables);

// Chart.js 플러그인 등록
//FIXME Chart.register(ChartDataLabels)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('chart', Chart);
});
