import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent {
 
  public title: string = '';
  public text: string = '';
  public color: string = '';

  @Output() noteAdded = new EventEmitter<{ title: string; text: string, color: string}>();

  constructor(private dialogRef: MatDialogRef<AddNotesComponent>, private supabaseService: SupabaseService) {}

  async save(): Promise<void> {
    const note = { title: this.title, text: this.text, color: this.color};
    await this.supabaseService.createNote(note);
    this.noteAdded.emit(note);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
