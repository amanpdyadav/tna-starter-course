import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

@Injectable()
export class LoginDialogService {

    constructor(private dialog: MatDialog) {
    }

    public open(viewContainerRef: ViewContainerRef, data?: any): any {

        let dialogRef: MatDialogRef<LoginDialogComponent>;
        const config = new MatDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(LoginDialogComponent, config);

        dialogRef.componentInstance.data = data;

        return dialogRef.componentInstance[ 'emitChange' ];
    }
}
