import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly PATH_OF_API = 'http://localhost:9090';

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  register(registerData: any): Observable<any> {
    return this.httpclient.post<any>(`${this.PATH_OF_API}/registerNewUser`, registerData);
  }

  login(loginData: any): Observable<any> {
    return this.httpclient.post<any>(
      `${this.PATH_OF_API}/authenticate`,
      loginData,
      { headers: new HttpHeaders({ 'No-Auth': 'True' }) }
    );
  }

  forUser(): Observable<string> {
    return this.httpclient.get<string>(`${this.PATH_OF_API}/forUser`);
  }

  forAdmin(): Observable<string> {
    return this.httpclient.get<string>(`${this.PATH_OF_API}/forAdmin`);
  }

  roleMatch(allowedRoles: string | any[]): boolean {
    const userRoles: any[] = this.userAuthService.getRoles();
    if (!userRoles) {
      return false;
    }
    for (const userRole of userRoles) {
      if (allowedRoles.includes(userRole.roleName)) {
        return true;
      }
    }
    return false;
  }
}
