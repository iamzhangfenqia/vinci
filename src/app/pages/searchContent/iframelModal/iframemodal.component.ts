import { Component } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DownloadModalComponent} from '../downloadModal/downloadmodal.component';

@Component({
  selector: 'ngx-iframemodal',
  styleUrls: ['./iframemodal.component.scss'],
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
      <iframe src="http://www.baidu.com" width="100%" height="800px"></iframe>
  `,
})
export class IframemodalComponent {

  modalHeader: string;
  modalContent: string;
  constructor(private activeModal: NgbActiveModal, private buttonModalService: NgbModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
