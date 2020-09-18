import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes:Note[] = [];

  notesSubscription: Subscription;

  constructor(private noteService:NoteService, private router:Router) { }

  ngOnInit(): void {
    this.noteService.getLoggedInNotes();
    this.notesSubscription = this.noteService.getObservableNotes().subscribe(notes => this.notes = notes);
  } 

  delete(noteID){
    this.noteService.deleteNote(noteID);
  }

  edit(noteID){
    this.router.navigate(['/user/notes/edit',noteID]);
  }

}
