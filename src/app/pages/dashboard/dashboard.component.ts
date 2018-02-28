import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  search: string;
  isAddKeywordHidden: boolean = true;
  newWord: string = '';
  newWords: string[] = [''];
  maps: Map<string, string>;
  searchContent: FormControl = new FormControl();
  options: any = {};
  themeSubscription: any;
  constructor(private http: Http) {
    this.searchContent.valueChanges
      .debounceTime(500)
      .subscribe(value => this.search = value);
  }

  ngOnInit(): void {
  }
  addLimitiword() {
    const wordContent = this.newWord;
    this.newWords.unshift(wordContent);
    this.isAddKeywordHidden = true;
    this.newWord = '';
  }
}
