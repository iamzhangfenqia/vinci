import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-downloadmodal',
  styleUrls: ['./downloadmodal.component.scss'],
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="first-tip">未下载状态可下载1000条数据，登录后可下载10000条数据。</div>
      <div class="second-tip">您目前尚未登录，仅可下载1000条数据。</div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-hero-info btn-demo btn-sm">登录</button>
      <button type="submit" class="btn btn-hero-primary btn-demo btn-sm" (click)="closeModal()">继续下载</button>
    </div>
  `,
})
export class DownloadModalComponent {

  modalHeader: string;
  modalContent: string;
  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
