import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { LoginDto, RegisterDto} from '../model';

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

  login(username: string, password: string) {
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
  register(registerDto: RegisterDto) {
     return this.http.post('/auth/register', registerDto).pipe(
      catchError((err: HttpErrorResponse) => {
        this.toast.error('Register Failed', '', {
          timeOut: 3000,
        });
        throw 'Une erreur est survenu.';
      })
     );
    };
    }


  

//   createOperation(
//     title: string,
//     description: string,
//     amount: number,
//     categoryId: number
//   ) {
//     return this.http.post(
//       '/budget/operations',
//       { title, description, amount, categoryId },
//       {
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       }
//     );
//   }
// }
