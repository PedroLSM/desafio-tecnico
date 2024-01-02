import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
    private snackbar = inject(MatSnackBar);
    private snackBarOptions: MatSnackBarConfig = { duration: 8000 };

    success(message: string, options: MatSnackBarConfig = { ...this.snackBarOptions }) {
        options.panelClass = ['success-snackbar'];
        this.open(message, options);
    }

    danger(message: string, options: MatSnackBarConfig = { ...this.snackBarOptions }) {
        options.panelClass = ['danger-snackbar'];
        this.open(message, options);
    }

    open(message: string, options: MatSnackBarConfig = { ...this.snackBarOptions }) {
        this.snackbar.open(message, 'OK', options);
    }
}