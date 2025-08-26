import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'users';
  private sessionKey = 'currentUser';

  constructor(private router: Router) {}

  signup(user: any): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.email === user.email)) {
      return false; // already registered
    }

    // ✅ set default avatar if not provided
    if (!user.avatar) {
      user.avatar = '/Images/default-avatar.png'; // path to default avatar
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user)); // auto login after signup
    return true;
  }

  // login remains the same, `image` comes from localStorage

  login(email: string, password: string, rememberMe: boolean = false): boolean {
    let users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      return true;
    }
    return false;
  }

  // services/auth.service.ts
  updateUser(updatedUser: any, oldEmail: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // ⚠️ Do not allow email change
    updatedUser.email = oldEmail; // ensure email stays the same

    // update the user
    users = users.map((u: any) => (u.email === oldEmail ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    return true;
  }

  getActiveUser(): any {
    return JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
  }

  // logout() {
  //   const confirmed = confirm('Are you sure you want to logout?');
  //   if (confirmed) {
  //     localStorage.removeItem(this.sessionKey);
  //     this.router.navigate(['/login']);
  //   }
  // }
  logout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      const role = localStorage.getItem('role');
      localStorage.removeItem(this.sessionKey);
      localStorage.removeItem('role');

      if (role === 'admin') {
        this.router.navigate(['/admin-login']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.sessionKey);
  }

  // ✅ Auto-fill login form if Remember Me
  getRememberedCredentials() {
    const email = localStorage.getItem('rememberedEmail') || '';
    const password = localStorage.getItem('rememberedPassword') || '';
    return { email, password };
  }
}
