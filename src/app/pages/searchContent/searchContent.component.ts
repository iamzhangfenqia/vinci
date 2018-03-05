import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilterModalComponent} from './filterModal/filtermodal.component';
import {DownloadModalComponent} from './downloadModal/downloadmodal.component';
import {DetailModalComponent} from './detailModal/detailmodal.component';

@Component({
  selector: 'ngx-searchcontent',
  styleUrls: ['./searchContent.component.scss'],
  templateUrl: './searchContent.component.html',
})
export class SearchContentComponent implements OnInit {
  titles: Array<string>;
  maps: Map<string, string>;
  allTitles: Array<string>;
  allMaps: Map<string, string>;
  searchUrl: string;
  dataSourse: Observable<any>;
  paginationModel = 1;
  firstPage: number = 1;
  curPage: number = 1;
  totalCount: number = 0; // 总数据量
  pageCounts: number = 10; // 每页展示的条数
  totalPages: number = 0;
  infoIndex: Array<string> ;
  infoData: string;
  pagesArray: Array<number>;
  constructor(private routerInfo: ActivatedRoute, private http: Http
  , private buttonModalService: NgbModal) {
  }

  ngOnInit(): void {
    this.infoIndex = new Array<string>();
    this.searchUrl = this.routerInfo.snapshot.params['searchUrl'];
    this.dataSourse = this.http.get('/zoom/search', {params: {'keyword': this.searchUrl, 'page': 1}})
      .map((res) => res.json());
    this.dataSourse.subscribe((data) => {
     console.log(data['counts']);
     console.log(data);
     this.infoData = data;
     this.totalCount = data['counts'];
     this.totalPages = this.totalCount / this.pageCounts;
     /*if (this.totalCount - this.totalPages * this.pageCounts > 0) {
       this.totalPages = this.totalPages + 1;
     }*/
     if (this.totalPages < 4) {
       this.pagesArray = new Array(this.totalPages);
     }
     /*console.log(data['info']);*/
     for (const info in data['info']) {
       if (info) {
         this.infoIndex.push(info);
       }
     }
    });
  }
  showFilterModal() {
    const filterModal = this.buttonModalService.open(FilterModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    filterModal.componentInstance.modalHeader = '在检索结果保留或排除包含检索式的实例';
    filterModal.componentInstance.modalContent = '';
  }
  showDownloadModal() {
    const downloadModal = this.buttonModalService.open(DownloadModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    downloadModal.componentInstance.modalHeader = '下载';
    downloadModal.componentInstance.modalContent = '';
  }
  showDetailModal(id: any) {
    /*console.log(id);*/
    const detailModal = this.buttonModalService.open(DetailModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    detailModal.componentInstance.modalHeader = '详情';
    detailModal.componentInstance.modalContent = id;
  }
  nextPage() {
    if (this.curPage < this.totalPages ) {
      this.curPage += 1;
      this.paginationModel = this.paginationModel + 1;
      if (this.paginationModel > 4 && this.paginationModel > this.firstPage + 3) {
        this.firstPage += 1;
      }
      /*将下一页的页号传给服务器*/
      this.infoIndex = new Array<string>();
      this.dataSourse = this.http.get('/zoom/search', {params: {'keyword': this.searchUrl, 'page': this.curPage}})
        .map((res) => res.json());
      this.dataSourse.subscribe((data) => {
        /*console.log(data['counts']);
        console.log(data);*/
        this.infoData = data;
        /*console.log(data['info']);*/
        for (const info in data['info']) {
          if (info) {
            this.infoIndex.push(info);
           /* console.log('nextPage ' + info);*/
          }
        }
      });
    }
  }
  prevPage() {
    this.curPage -= 1;
    if (this.curPage < 1) {
      this.curPage = 1;
    }
    this.paginationModel = this.paginationModel - 1;
    if (this.paginationModel < 1) {
      this.paginationModel = 1;
    }else {
      if (this.firstPage > 1) {
        this.firstPage = this.firstPage - 1;
      }else {
        this.firstPage = 1;
      }
    }
    /*将下一页的页号传给服务器*/
    this.infoIndex = new Array<string>();
    this.dataSourse = this.http.get('/zoom/search', {params: {'keyword': this.searchUrl, 'page': this.curPage}})
      .map((res) => res.json());
    this.dataSourse.subscribe((data) => {
      console.log(data['counts']);
      console.log(data);
      this.infoData = data;
      /*console.log(data['info']);*/
      for (const info in data['info']) {
        if (info) {
          this.infoIndex.push(info);
        }
      }
    });
  }
  showPage(n) {
    this.curPage = n;
    this.paginationModel = n;
    /*将当前页的页号传给服务器*/
    this.infoIndex = new Array<string>();
    this.dataSourse = this.http.get('/zoom/search', {params: {'keyword': this.searchUrl, 'page': this.curPage}})
      .map((res) => res.json());
    this.dataSourse.subscribe((data) => {
      console.log(data['counts']);
      this.infoData = data;
      /*console.log(data['info']);*/
      for (const info in data['info']) {
        if (info) {
          this.infoIndex.push(info);
        }
      }
    });
  }
}

