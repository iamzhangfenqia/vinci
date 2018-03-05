import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {NbThemeService} from '@nebular/theme';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-detailanalyse',
  styleUrls: ['./detailAnalyse.component.scss'],
  templateUrl: './detailAnalyse.component.html',
})
export class DetailAnalyseComponent implements OnInit, AfterViewInit, OnDestroy {
  pieoptions: any = {};
  radaroptions: any = {};
  cloudoption: any = {};
  themeSubscription: any;
  srcText: FormControl = new FormControl();
  srcTextContent: string;
  dataSource: Observable<any>;
  safeUrl: string;
  constructor(private http: Http, private theme: NbThemeService, private routerInfo: ActivatedRoute) {
    this.srcText.valueChanges
      .debounceTime(500)
      .subscribe(value => this.srcTextContent = value);
    this.safeUrl = this.routerInfo.snapshot.params['safeUrl'];
    console.log('safeUrl ==== ');
    console.log(this.safeUrl);
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.pieoptions = {
        backgroundColor: echarts.bg,
        /*color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],*/
        color: [colors.successLight, colors.warningLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['积极', '消极'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: '情感倾向',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 17, name: '积极' },
              { value: 83, name: '消极' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
      this.radaroptions = {
        backgroundColor: echarts.bg,
        color: [colors.danger],
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['对应领域'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: [
            { name: '财经', max: 6500 },
            { name: '科技', max: 16000 },
            { name: '体育', max: 30000 },
            { name: '娱乐', max: 38000 },
            { name: '健康', max: 52000 },
            { name: '教育', max: 25000 },
          ],
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {
            name: '领域',
            type: 'radar',
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '对应领域',
              },
            ],
          },
        ],
      };
      this.cloudoption = {
        /*title: {
          text: '热点分析',
          link: 'https://www.baidu.com/s?wd=' + encodeURIComponent('ECharts'),
          x: 'center',
          textStyle: {
            fontSize: 23,
          },
        },*/
        /*backgroundColor: '#F7F7F7',*/
        tooltip: {
          show: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              iconStyle: {
                normal: {
                  color: '#FFFFFF',
                },
              },
            },
          },
        },
        series: [{
          name: '热点分析',
          type: 'wordCloud',
          sizeRange: [6, 66],
          rotationRange: [-45, 90],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6,
          },
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') + ')';
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data: [{
            name: 'Jayfee',
            value: 666,
          }, {
            name: 'Nancy',
            value: 666,
          }, {
            name: '生活资源',
            value: '999',
          }, {
            name: '供热管理',
            value: '888',
          }, {
            name: '供气质量',
            value: '777',
          }, {
            name: '生活用水管理',
            value: '688',
          }, {
            name: '一次供水问题',
            value: '588',
          }, {
            name: '交通运输',
            value: '516',
          }, {
            name: '城市交通',
            value: '515',
          }, {
            name: '环境保护',
            value: '483',
          }],
        }],
      };
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  sendSrcText() {
    this.dataSource = this.http.get('/api/analyse', {params: {'keyword': this.srcTextContent}});
  }
}
