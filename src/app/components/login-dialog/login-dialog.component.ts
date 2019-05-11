import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  animations: [showAnimation()]
})
export class LoginDialogComponent implements OnInit {
  @Input() data: any;
  @Output() emitChange = new EventEmitter();

  mode = 'login';
  title = 'Login';

  confirmPassword = null;

  formData = {
    email: '',
    password: ''
  };

  error: any = null;

  constructor(private _authService: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>) {
  }

  ngOnInit() {
  }

  async signUp() {
    const res = await this._authService.emailSignUp(this.formData);
    this.error = res.type === 'error' ? res.msg : null;
    if (!this.error) {
      this.mode = 'login';
    }

  }

  loginWithGoogle() {
    this.closeDialog();
    this._authService.loginWithGoogle();
  }

  async loginWithEmail() {
    const res = await this._authService.emailLogin(this.formData);
    this.error = res.type === 'error' ? res.msg : null;
    if (!this.error) {
      this.closeDialog();
    }
  }

  resetPassword() {
    this.error = 'Email Sent';
    this.mode = 'login';
    this._authService.resetPassword(this.formData.email);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeMode(val) {
    this.mode = val;
    this.error = null;
  }
}

export function showAnimation() {
  return trigger('showAnimation', [
    transition(':enter', [ // :enter is alias to 'void => *'
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate('500ms', style({ transform: 'translateX(0)', 'opacity': 1 }))
    ]
    ),
    transition(':leave', [ // :leave is alias to '* => void'
      style({ transform: 'translateX(0)', 'opacity': 1 }),
      animate('500ms', style({ transform: 'translateX(100%)', 'opacity': 0 }))
    ])
  ]);
}