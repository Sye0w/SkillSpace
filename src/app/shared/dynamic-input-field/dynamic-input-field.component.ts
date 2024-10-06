import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';


@Component({
  selector: 'app-dynamic-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-input-field.component.html',
  styleUrl: './dynamic-input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicInputFieldComponent implements OnInit {
  @Input() config: any;
  @Input() parentForm!: FormGroup;
  @Output() errorMessageChange = new EventEmitter<string>();
  control!: AbstractControl;

  constructor(private formValidation: FormValidationService) {}

  ngOnInit() {
    this.control = this.parentForm.get(this.config.name)!;

    if (this.config.type === 'password') {
      this.control.setValidators([
        ...this.config.validators,
        this.formValidation.passwordStrCheck()
      ]);
    }

    this.control.statusChanges.subscribe(() => {
      if (this.control.invalid && (this.control.dirty || this.control.touched)) {
        const errorMessage = this.formValidation.getErrorMessage(this.control, this.config.label);
        this.errorMessageChange.emit(errorMessage);
      } else {
        this.errorMessageChange.emit('');
      }
    });
  }
}
