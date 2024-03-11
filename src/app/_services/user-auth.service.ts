import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public setRoles(roles: string[]) {
    if (this.isBrowser()) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  public getRoles(): string[] {
    if (this.isBrowser()) {
      const rolesJson = localStorage.getItem('roles');
      return rolesJson ? JSON.parse(rolesJson) : [];
    } else {
      return [];
    }
  }

  public setToken(jwtToken: string) {
    if (this.isBrowser()) {
      localStorage.setItem('jwtToken', jwtToken);
    }
  }

  public getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('jwtToken');
    } else {
      return null;
    }
  }

  public clear() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken();
  }

  public isAdmin(): boolean {
    const roles: string[] = this.getRoles();
    return roles.length > 0 && roles[0] === 'Admin';
  }

  public isUser(): boolean {
    const roles: string[] = this.getRoles();
    return roles.length > 0 && roles[0] === 'User';
  }
}