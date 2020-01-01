import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/userManagement/authService/auth.service';
import { NavServiceService } from '../service/general/navService/nav-service.service';
import { User } from '../admin/user/user';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css']
})

export class AppNavigationComponent implements AfterViewInit {

  navInfo: any = [];
  temp: any = [];
  user: User = new User();
  @ViewChild('appDrawer') appDrawer: ElementRef;
  private _mobileQueryListener: () => void;

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );
  mobileQuery: MediaQueryList;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavServiceService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      loginId: this.authService.currentUser().userName
    };
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.navInfo = [];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.menuVis = false;
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    var _user = this.authService.currentUser();
    if (_user != undefined && _user != null) {
      return this.authService.currentUser().userName;
    }
    return '';
  }

  get navInfoList(): any[] {
    return this.authService.userNavlist();
  }

  get name(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser().name;
    }
    return '';
  }

  menuVis = true;
  menuDriven() {
    if (this.menuVis) {
      this.menuVis = false;
    } else {
      this.menuVis = true;
    }
  }

}