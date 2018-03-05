import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'ngx-detailmodal',
  styleUrls: ['./detailmodal.component.scss'],
  template: `
    <div class="modal-header">
      <span style="font-size: 24px;">{{ modalHeader }}</span>
        <i class="ion-plus-round ion-size" (click)="isHiddenAdd = !isHiddenAdd"></i>
        <input type="text" placeholder="关键字" class="form-control" style="width: 200px;height: 10px;" [hidden]="isHiddenAdd"/>
        <i class="ion-checkmark-circled ion-size" [hidden]="isHiddenAdd" (click)="isHiddenAdd=!isHiddenAdd"></i>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" id="modalHeight">
      <div class="row">
        <ul class="list-group">
          <div class="row">
            <div class="col-md-2">
              <span>链接</span>
            </div>
            <div class="col-md-9">
              <li class="list-group-item">{{modalContent['src']}}</li>
            </div>
            <div class="col-md-2">
              <span>标题</span>
            </div>
            <div class="col-md-9">
              <li class="list-group-item">{{modalContent['title']}}</li>
            </div>
            <div class="col-md-2">
              <span>时间</span>
            </div>
            <div class="col-md-9">
              <li class="list-group-item">{{modalContent['post_time']}}</li>
            </div>
            <div class="col-md-2">
              <span>概述</span>
            </div>
            <div class="col-md-9">
              <li class="list-group-item">{{modalContent['text']}}</li>
            </div>
            <div class="col-md-2">
              <span>原网页</span>
            </div>
            <div class="col-md-9">
              <li class="list-group-item"><iframe [src]="safeUrl"></iframe>
                <!--<button (click)="openAnotherModal()">提交</button>-->
                <!--<button (click)="isHiddenIframe = !isHiddenIframe">放大</button>-->
                <button (click)="forOpen()">放大</button>
              </li>
            </div>
            <iframe [hidden]="isHiddenIframe" [src]="safeUrl" id="ifr" name="ifr" scrolling="yes"
            style="background:white;width: 800px;z-index:999;position:absolute;left:50%;top:0;margin-left:-400px;">
            </iframe>
            <button [hidden]="isHiddenIframe" (click)="isHiddenIframe = !isHiddenIframe"
            style="position: fixed;top: 20px; right: 20px;">close</button>
          </div>
        </ul>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" class="btn btn-hero-info btn-demo btn-sm" (click)="closeModal()" [routerLink]="['/pages/analyseDetail', modalContent['src']]">分析</button>
      <button type="submit" class="btn btn-hero-primary btn-demo btn-sm" (click)="closeModal()">关闭</button>
    </div>
  `,
})
export class DetailModalComponent implements OnInit {

  modalHeader: any;
  modalContent: any;
  isHiddenIframe: boolean = true;
  isHiddenAdd: boolean = true;
  safeUrl: any;
  constructor(private activeModal: NgbActiveModal, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    /*for (const m in this.modalContent) {
      if (m) {
        console.log(m);
      }
    }*/
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.modalContent['src']);
    console.log('safeUrl = ' + this.modalContent['src']);
  }
  closeModal() {
    this.activeModal.close();
  }
  forOpen() {
    const screenHeight = document.getElementById('modalHeight').clientHeight;
    document.getElementById('ifr').style.height = screenHeight + 'px';
    this.isHiddenIframe = !this.isHiddenIframe;
    console.log('src = ' + this.modalContent['src']);
  }
}
