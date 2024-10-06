import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-input-field.component.html',
  styleUrl: './dynamic-input-field.component.scss'
})
export class DynamicInputFieldComponent implements OnInit {
  @Input() config: any;
  @Input() parentForm!: FormGroup;
  @Output() errorMessageChange = new EventEmitter<string>();
  control!: AbstractControl;

  ngOnInit() {
    this.control = this.parentForm.get(this.config.name)!;
    this.control.statusChanges.subscribe(() => {
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        this.errorMessageChange.emit(this.errorMessage);
      } else {
        this.errorMessageChange.emit('');
      }
    });
  }

  get errorMessage(): string {
    if (this.control.hasError('required')) {
      return `${this.config.label} is required`;
    }
    if (this.control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (this.control.hasError('minlength')) {
      return `${this.config.label} must be at least ${this.control.errors?.['minlength'].requiredLength} characters long`;
    }
    return '';
  }
}
