import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LoginDto, RegisterDto, Category, Operation } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('act');

    if (fetchedToken) {
      this.token = atob(fetchedToken);
      this.jwtToken$.next(this.token);
    }
  }

  get jwtUserToken(): Observable<string> {
    return this.jwtToken$.asObservable();
  }

  getAllOperations(): Observable<any> {
    return this.http.get(`/budget/operations`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  login(username: string, password: string): void {
    this.http
      .post<{ access_token: string }>(`/auth/login`, {
        username,
        password,
      })
      .subscribe(
        (response) => {
          if (response && response.access_token) {
            this.token = response.access_token;

            localStorage.setItem('act', btoa(this.token));

            this.jwtToken$.next(this.token);

            this.router.navigateByUrl('/').then(() => {
              this.toast.success('Login successful', '', {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              });
            });
          } else {
            console.error('No token received from server');
          }
        },
        (error: HttpErrorResponse) => {
          this.toast.error('Login failed. Please try again.', '', {
            timeOut: 3000,
          });
        }
      );
  }

  logout() {
    (this.token = ''), this.jwtToken$.next(this.token);
    this.toast
      .success('Logged out successfully', '', {
        timeOut: 500,
      })
      .onHidden.subscribe(() => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
    return '';
  }
  
  register(username: string, password: string): void {
     this.http.post('/auth/register', 
      {username, password}
     ).subscribe(
        () => {
          this.toast.success('Registration successful', '', {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          });
        },
        (error: HttpErrorResponse) => {
          this.toast.error('Registration failed. Please try again.', '', {
            timeOut: 3000,
          });
        }
      );
    };
    

  getAllCategories(): Observable<any> {
    return this.http.get(`/budget/categories`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  createOperation(
    title: string,
    description: string,
    amount: number,
    selectedCategoryId: number
  ) {
    return this.http.post(
      '/budget/operations',
      { title, description, amount, categoryId: selectedCategoryId },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  deleteOperation(operationId: number) {
    return this.http
    .delete<{ success: boolean }>(`/budget/operations/${operationId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    .pipe(
      tap((res) => {
        if (res.success) {
          this.toast.success('Operation supprimé avec succès')
        }
      })
    )
  }

  createCategory(
    name: string,
  ) {
    return this.http.post(
      '/budget/categories',
      { name },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

}

  