import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DynamicInputFieldComponent } from "../../../shared/dynamic-input-field/dynamic-input-field.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatDividerModule,
    DynamicInputFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    ToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showToast = false;
  toastMessage = '';
  isError = false;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({});
    this.loginInputConfig.forEach(config => {
      this.loginForm.addControl(config.name, this.fb.control('', config.validators));
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login details:', JSON.stringify(this.loginForm.value));
      this.showToast = true;
      this.isError = false;
      this.toastMessage = 'Login successful!';
    } else {
      this.loginForm.markAllAsTouched();
      this.toastMessage = 'Please fill all required fields';
      this.isError = true;
      this.showToast = true;
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
