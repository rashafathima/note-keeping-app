import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {
  constructor(
    public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public note: { title: string; text: string; color: string }
  ) {}

  onUpdate(): void {
    this.dialogRef.close(this.note);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
