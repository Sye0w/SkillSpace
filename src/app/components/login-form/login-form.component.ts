import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicInputFieldComponent } from '../../shared/dynamic-input-field/dynamic-input-field.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ToastComponent } from '../../shared/toast/toast.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatDividerModule,
    DynamicInputFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    ToastComponent,
    ProgressSpinnerModule,
    LoaderComponent,
    RouterModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
  loginForm!: FormGroup;
  showToast = false;
  toastMessage = '';
  isError = false;
  isLoading = false;

  loginInputConfig = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter address here',
      validators: [Validators.required, Validators.email]
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '******',
      validators: [Validators.required, Validators.minLength(8)]
    },
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loginForm = this.fb.group({});
    this.loginInputConfig.forEach(config => {
      this.loginForm.addControl(config.name, this.fb.control('', config.validators));
    });


  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login details:', JSON.stringify(this.loginForm.value));
      this.isLoading = true;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.showToast = true;
        this.isError = false;
        this.toastMessage = 'Login successful!';
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      }, 2000);
    } else {
      this.loginForm.markAllAsTouched();
      this.toastMessage = 'Invalid input(s), please all required fields';
      this.isError = true;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }
  }

  onErrorMessageChange(message: string) {
    if (message) {
      this.showToast = true;
      this.isError = true;
      this.toastMessage = message;
    } else {
      this.showToast = false;
    }
  }
}
