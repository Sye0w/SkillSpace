import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DynamicInputFieldComponent } from "../../../shared/dynamic-input-field/dynamic-input-field.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatDividerModule,DynamicInputFieldComponent,
    ReactiveFormsModule, CommonModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.loginForm = this.fb.group({})
    this.loginInputConfig.forEach( config =>{
      this.loginForm.addControl(config.name,this.fb.control('', config.validators))
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
