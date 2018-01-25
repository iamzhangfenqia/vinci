import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/Rx';

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
  dataSource: Observable<any>;
  titles: Array<string>;
  maps: Map<string, string>;
  searchContent: FormControl = new FormControl();

  constructor(private http: Http) {
    this.searchContent.valueChanges
      .debounceTime(500)
      .subscribe(value => this.search = value);
  }

  ngOnInit(): void {
  }
  addKeyword() {
    const wordContent = this.newWord;
    this.newWords.unshift(wordContent);
    this.isAddKeywordHidden = true;
    this.newWord = '';
  }

  submit() {
    this.maps = new Map<string, string>();
    this.titles = new Array<string>();
    this.dataSource = this.http.get('/zoom/getInfo', { params: {'url': this.search}}).map( (res) => res.json());
    this.dataSource.subscribe( (data) => {
      for (const value in data) {
        if (value) {
          console.log(value);
          console.log(data[value]);
          this.titles.push(value);
          this.maps[value] = data[value];
        }
      }
    },
  );
  }
}
