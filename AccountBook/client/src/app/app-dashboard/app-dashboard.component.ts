import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/userManagement/authService/auth.service';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/startWith';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {

  currentPermissions: any;

  public cols: Observable<number>;

  constructor(
    private observableMedia: ObservableMedia,

    private authService: AuthService
  ) { }

  ngOnInit() {
    const grid = new Map([
      ['xs', 1],
      ['sm', 1],
      ['md', 2],
      ['lg', 3],
      ['xl', 4]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.cols = this.observableMedia.asObservable()
      .map(change => {
        return grid.get(change.mqAlias);
      })
      .startWith(start);

  }
}
