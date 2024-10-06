import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-input-field.component.html',
  styleUrl: './dynamic-input-field.component.scss'
})

export class DynamicInputFieldComponent {
  @Input() config: any;;
  @Input() parentForm!: FormGroup;
}
