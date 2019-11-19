import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  /**
   * Success message toast
   *
   * @param  {string} message
   * @param  {string=""} title
   * @param  {number=5000} timeOut
   * @param  {boolean=false} isSticky
   */
  successToast(
    message: string,
    title: string = '',
    timeOut: number = 5000,
    isSticky: boolean = false
  ) {
    this.toastr.success(message, title, {
      timeOut,
      disableTimeOut: isSticky,
      closeButton: isSticky,
      tapToDismiss: !isSticky
    });
  }

  /**
   * Error message toast
   *
   * @param  {string} message
   * @param  {string=""} title
   * @param  {number=5000} timeOut
   * @param  {boolean=false} isSticky
   */
  errorToast(
    message: string,
    title: string = '',
    timeOut: number = 5000,
    isSticky: boolean = false
  ) {
    this.toastr.error(message, title, {
      timeOut,
      disableTimeOut: isSticky,
      closeButton: isSticky,
      tapToDismiss: !isSticky
    });
  }

  /**
   * Warning message toast
   *
   * @param  {string} message
   * @param  {string=""} title
   * @param  {number=5000} timeOut
   * @param  {boolean=false} isSticky
   */
  warningToast(
    message: string,
    title: string = '',
    timeOut: number = 5000,
    isSticky: boolean = false
  ) {
    this.toastr.warning(message, title, {
      timeOut,
      disableTimeOut: isSticky,
      closeButton: isSticky,
      tapToDismiss: !isSticky
    });
  }
}
