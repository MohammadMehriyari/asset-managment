import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'as-modals',
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
  template: `
    <h1 mat-dialog-title class="dialog-title">
      تایید حذف
      <mat-icon class="close-icon" (click)="onNoClick()">close</mat-icon>
    </h1>

    <div mat-dialog-content class="dialog-content">
      <p class="message">آیا از حذف این بخش اطمینان دارید؟</p>
      <img
        src="assets/Images/warning.svg"
        alt="Warning Icon"
        class="warning-icon"
      />
    </div>

    <div mat-dialog-actions align="end" class="dialog-actions">
      <button type="button" class="btn btn-danger" (click)="onNoClick()">
        خیر
      </button>
      <button
        type="button"
        class="btn btn-success"
        [mat-dialog-close]="'delete'"
      >
        بله
      </button>
    </div>
  `,
  styleUrl: './modals.component.css',
})
export class ModalsComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
