import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNotesComponent } from '../add-notes/add-notes.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../supabase.service';
import { Session, AuthSession } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { EditNoteComponent } from '../edit-note/edit-note.component';


@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
  
})
 
export class AllNotesComponent {

  public notes: { title: string; text: string ; color: string}[] = [];
  supabase: any;


  constructor(public dialog: MatDialog, private supabaseService: SupabaseService, private router: Router) {}
  

async ngOnInit() {
  const session = await this.getSession();
  console.log('Session:', session);

  if (session) {
    const userId = session.user.id;
    // console.log('User ID:', userId);
    this.notes = await this.supabaseService.getUserNotes(userId);
    // console.log('User notes:', this.notes);

    
  }
}


async getSession(): Promise<Session | null> {
  console.log(this.supabaseService.getSession())
  return this.supabaseService.getSession();
}

  
  
  openData() {
    const dialogRef = this.dialog.open(AddNotesComponent, {
      width: '600px'
    });
    dialogRef.componentInstance.noteAdded.subscribe(async (note: { title: string; text: string; color: string }) => {
      // await this.supabaseService.createNote(note);
      this.notes.push(note);
    });
  }

  logOut(): void {
    this.supabaseService.logOut();
    this.router.navigate(['/login']);
  }
  


  editNote(note: { title: string; text: string; color: string }) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '600px',
      data: { ...note }
    });
  
    dialogRef.afterClosed().subscribe(async (updatedNote: { title: string; text: string; color: string }) => {
      if (updatedNote) {
        await this.supabaseService.updateNote({
          ...note,
          title: updatedNote.title,
          text: updatedNote.text,
          color: updatedNote.color
        });
        const noteIndex = this.notes.findIndex((n) => n.title === note.title && n.text === note.text && n.color === note.color);
        if (noteIndex !== -1) {
          this.notes[noteIndex] = updatedNote;
        }
      }
    });
  }
  






  deleteNote(note: { title: string; text: string; color: string }) {
    this.supabaseService.deleteNote(note);
    const noteIndex = this.notes.findIndex((n) => n.title === note.title && n.text === note.text && n.color === note.color);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
    }
  }
  
}

  