import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'add-notes', component: AddNotesComponent },
  { path: 'all-notes', component: AllNotesComponent },
  {path: '', component: SignUpComponent}
  // {path: 'edit', component: EditNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
