import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent {
  supplierForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSupplierComponent>,
    private fb: FormBuilder
  ) {
    this.supplierForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      contact: ['', [Validators.required, Validators.maxLength(18)]],
    });
  }

  control(control: string) {
    return this.supplierForm.get(control);
  }

  submit() {
    if (this.supplierForm.valid) {
      this.dialogRef.close(this.supplierForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
