import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { NavServiceService } from '../../general/navService/nav-service.service';
import { User } from '../../../admin/user/user';

const httpFormOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    _currentUser: User;
    redirectUrl: string;
    _userNavlist: any[] = [];

    constructor(
        private http: HttpClient,
        private navService: NavServiceService
    ) { }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    userNavlist(): any[] {
        if (this._userNavlist && this._userNavlist.length > 0) {
            return this._userNavlist;
        }
        else {
            if (localStorage.getItem('navList')) {
                var json = JSON.parse(localStorage.getItem('navList'));
                this._userNavlist = json;
            }
        }
        return this._userNavlist;
    }

    currentUser(): User {
        if (this._currentUser) {
            return this._currentUser;
        }
        else {
            if (localStorage.getItem('currentUser')) {
                var json = JSON.parse(localStorage.getItem('currentUser'));
                this._currentUser = <User>json;
            }
        }
        return this._currentUser;
    }

    login(userName: string, password: string): Observable<User> {
        let body = 'loginId=' + userName + '&password=' + encodeURIComponent(password);
        let loginAPIUrl = environment.apiURL + '/api/auth/validUser'
        return this.http.post<User>(loginAPIUrl, body, httpFormOptions).pipe(
            tap(data => {
                this._currentUser = data
                this._userNavlist = data['permission'];
                this.navService.getNavList(userName).then(res => {
                    if(res.statusBool == 1){
                        console.log(res);
                        this._userNavlist = res.permission;
                        var childPermissions = [];
                        this._userNavlist.forEach(element => {
                            if (element.children.length) {
                                element.children.forEach(elem1 => {
                                    childPermissions.push({ childrens: elem1 })
                                });
                            }
                        });
                        localStorage.setItem('permissionList', JSON.stringify(childPermissions));
                        localStorage.setItem('navList', JSON.stringify(this._userNavlist));
                    }
                }, err => { throw err; })
                localStorage.setItem('currentUser', JSON.stringify(this._currentUser));
                localStorage.setItem('token', JSON.stringify(this._currentUser['token']));
            })
        );
    }

    // login(userName: string, password: string): Observable<User> {
    //     let body = 'loginId=' + userName + '&password=' + encodeURIComponent(password);
    //     // let loginAPIUrl = environment.apiURL + '/api/admin/users/login'
    //     let loginAPIUrl = environment.apiURL + '/api/auth/validUser'
    //     return this.http.post<User>(loginAPIUrl, body, httpFormOptions).pipe(
    //         tap(data => {
    //             debugger
    //             this._currentUser = data

    //             this.navService.getNavList(this._currentUser.userName).then(res => {
    //                 this._userNavlist = res;
    //                 var childPermissions = [];
    //                 this._userNavlist.forEach(element => {
    //                     if (element.children.length) {
    //                         element.children.forEach(elem1 => {
    //                             childPermissions.push({ childrens: elem1 })
    //                         });
    //                     }
    //                 });
    //                 localStorage.setItem('permissionList', JSON.stringify(childPermissions));
    //                 localStorage.setItem('navList', JSON.stringify(this._userNavlist));
    //             }, err => { throw err; })
    //             localStorage.setItem('currentUser', JSON.stringify(this._currentUser));
    //             localStorage.setItem('token', JSON.stringify(this._currentUser['token']));
    //         })
    //     );
    // }

    getToken(): string {
        let user = this.currentUser();
        if (user)
            return user.userName;
        else
            return "";
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('navList');
        localStorage.removeItem('permissionList');
    }

    get userName(): string {
        var _user = this.currentUser();
        if (_user != undefined && _user != null) {
            return this.currentUser().userName;
        }
        return '';
    }

    getFromLocalStorage(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

}
