import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicInputFieldComponent } from "../../shared/dynamic-input-field/dynamic-input-field.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { ToastComponent } from "../../shared/toast/toast.component";
import { ActivePasswordComponent } from "../active-password/active-password.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule,
    DynamicInputFieldComponent, ReactiveFormsModule,
    CommonModule, LoaderComponent, ToastComponent, ActivePasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})

export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  isError: boolean = false;
  showActivePassword: boolean = true;

  forgotConfig = {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email here',
    validators: [Validators.required, Validators.email]
  };

  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Login details:', JSON.stringify(this.forgotPasswordForm.value));
      this.isLoading = true;
      this.cdr.detectChanges();
      this.isError = false;
      setTimeout(() => {
        this.showToast = true;
        this.toastMessage = 'Login successful!';
        this.isLoading = false;
        setTimeout(() => {
          this.showActivePassword = true;
          this.cdr.detectChanges();
        }, 5000);
        this.cdr.detectChanges();
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      }, 2000);

    } else {
      this.forgotPasswordForm.markAllAsTouched();
      this.showToast = true;
      this.toastMessage = "Invalid input, please fill all required fields";
      this.isError = true;
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
