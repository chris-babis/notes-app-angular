import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Notes/header/header.component';
import { NotesListComponent } from './Notes/notes-list/notes-list.component';
import { SingleNoteComponent } from './Notes/single-note/single-note.component';
import { AuthGuardService } from './User/auth.guard';
import { UserComponent } from './User/user/user.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: UserComponent },
  {path: 'register', component: UserComponent },
  {path: 'user', component: HeaderComponent, canActivate:[AuthGuardService], children: [
    {path: '', redirectTo: 'notes', pathMatch: 'full'},
    {path: 'notes', component: NotesListComponent},
    {path: 'notes/compose', component: SingleNoteComponent},
    {path: 'notes/edit/:id', component: SingleNoteComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
