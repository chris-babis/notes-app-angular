import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  notes:Note[] = [];

  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.getLoggedInNotes().subscribe(notes => this.notes = notes);
  }

}
