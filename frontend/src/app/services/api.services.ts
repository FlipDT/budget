import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LoginDto, RegisterDto, Category, Operation } from '../model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';
  private jwtToken$ = new BehaviorSubject<string>(this.token);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private snackBar: MatSnackBar
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
              this.snackBar.open('Login successful', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['success-snackbar'],
              });
            });
          } else {
            console.error('No token received from server');
          }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar'],
          });
        }
      );
  }

  logout() {
    (this.token = ''), this.jwtToken$.next(this.token);
    this.snackBar
      .open('Logged out successfully', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['success-snackbar'],
      })
      .afterDismissed()
      .subscribe(() => {
        localStorage.removeItem('act');
        this.router.navigateByUrl('/login').then();
      });
  }

  register(username: string, password: string): void {
    this.http.post('/auth/register', { username, password }).subscribe(
      () => {
        this.snackBar.open('Utilisateur créé', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar'],
        });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(
          'Enregistrement échoué, merci de reessayer',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['error-snackbar'],
          }
        );
      }
    );
  }

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
    return this.http
      .post(
        '/budget/operations',
        { title, description, amount, categoryId: selectedCategoryId },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(
        tap(() => {
          this.snackBar.open('Opération créée avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });
        }),
        catchError((error: any) => {
          this.snackBar.open(
            "Erreur lors de la création de l'opération",
            'Fermer',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],
            }
          );
          return throwError(error);
        })
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
            this.snackBar.open('Operation supprimé avec succès', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],
            });
          }
        })
      );
  }

  createCategory(name: string) {
    return this.http
      .post(
        '/budget/categories',
        { name },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(
        tap(() => {
          this.snackBar.open('Catégorie créée avec succès', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });
        }),
        catchError((error: any) => {
          this.snackBar.open(
            'Erreur lors de la création de la catégorie',
            'Fermer',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],
            }
          );
          return throwError(error);
        })
      );
  }

  updateOperation(
    title: string,
    description: string,
    amount: number,
    selectedCategoryId: number,
    operationId: number
  ) {
    return this.http.patch(
      `/budget/operations/${operationId}`,
      { title, description, amount, categoryId: selectedCategoryId },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
