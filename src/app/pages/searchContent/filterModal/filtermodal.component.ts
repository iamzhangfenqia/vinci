import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-filtermodal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="input-group">
        <input type="text" placeholder="请输入内容" class="form-control"/>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-hero-info btn-demo btn-sm">保留</button>
      <button type="submit" class="btn btn-hero-primary btn-demo btn-sm" (click)="closeModal()">排除</button>
    </div>
  `,
})
export class FilterModalComponent {

  modalHeader: string;
  modalContent: string;
  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
