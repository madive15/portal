// useCustomAlert.ts
import Swal from 'sweetalert2';
import type { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

export function useCustomAlert() {
  function showAlert(options: SweetAlertOptions): Promise<any>;
  function showAlert(message: string, icon?: SweetAlertIcon): Promise<any>;
  function showAlert(
    arg: SweetAlertOptions | string,
    icon: SweetAlertIcon = 'info'
  ) {
    if (typeof arg === 'string') {
      return Swal.fire({ title: arg, icon });
    }
    return Swal.fire(arg);
  }

  return { showAlert };
}
