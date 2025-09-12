import { ref } from 'vue';
import type Modal from '~/components/common/modal.vue';

const FOCUS_TAG =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

export function useModalFocus() {
  const modalFocusRef = ref<InstanceType<typeof Modal> | null>(null);
  const returnFocusRef = ref<HTMLElement | null>(null);
  const firstFocusableElRef = ref<HTMLElement | null>(null);
  const lastFocusableElRef = ref<HTMLElement | null>(null);

  const modalTrapFocus = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (
        document.activeElement === lastFocusableElRef.value &&
        !event.shiftKey &&
        !!firstFocusableElRef.value
      ) {
        firstFocusableElRef.value.focus();
        event.preventDefault();
      } else if (
        document.activeElement === firstFocusableElRef.value &&
        event.shiftKey &&
        !!lastFocusableElRef.value
      ) {
        lastFocusableElRef.value.focus();
        event.preventDefault();
      }
    }
  };

  const createModalFocus = async () => {
    await nextTick();
    const focusableEls =
      modalFocusRef.value?.modalRef?.querySelectorAll(FOCUS_TAG);

    if (!focusableEls) return;

    firstFocusableElRef.value = focusableEls[0] as HTMLElement;
    lastFocusableElRef.value = focusableEls[
      focusableEls.length - 1
    ] as HTMLElement;

    /*
    console.log(
      focusableEls,
      firstFocusableElRef.value,
      lastFocusableElRef.value
    );
    */

    firstFocusableElRef.value.focus();

    document.addEventListener('keydown', modalTrapFocus);
  };

  const removeModalFocus = () => {
    // console.log(returnFocusRef.value);
    if (!!returnFocusRef.value) returnFocusRef.value.focus();
    document.removeEventListener('keydown', modalTrapFocus);
  };

  const setReturnFocusRef = (elm: HTMLElement) => {
    returnFocusRef.value = elm;
  };

  onUnmounted(() => {
    document.removeEventListener('keydown', modalTrapFocus);
  });

  return {
    modalFocusRef,
    returnFocusRef,
    setReturnFocusRef,
    createModalFocus,
    removeModalFocus
  };
}
