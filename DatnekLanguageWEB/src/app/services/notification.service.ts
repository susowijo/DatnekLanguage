import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  title = 'Datnek';
  showSuccess(message){
    this.toastr.success(message, this.title)
  }

  showError(message){
    this.toastr.error(message, this.title)
  }

  showInfo(message){
    this.toastr.info(message, this.title)
  }

  showWarning(message){
    this.toastr.warning(message, this.title)
  }
}
