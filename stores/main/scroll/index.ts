import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFullpageStore = defineStore('fullpage', () => {
    const currentPage = ref(1)
    const totalSections = ref(7) // 실제 섹션 개수

    function goNext() {
        if (currentPage.value < totalSections.value) {
            currentPage.value++
        }
    }
    function goPrev() {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    return {
        currentPage,
        totalSections,
        goNext,
        goPrev,
    }
})
