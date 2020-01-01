import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, Event, NavigationEnd, } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class NavServiceService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  _userNavlist: any[] = [];

  private apiURL = environment.apiURL + '/api/auth/navList';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    },
      err => {
        throw err;
      });
  }

  getNavList(loginId): any {
    debugger
    return this.http.get<any>(this.apiURL + '/' + loginId, httpOptions).toPromise();
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

}


