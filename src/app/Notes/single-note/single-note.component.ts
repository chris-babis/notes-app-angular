import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  pageMode;
  title = '';
  content = '';
  _id;
  constructor(private router:ActivatedRoute, private noteService:NoteService, private redirect: Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(param => {
      this.pageMode = param['params'].id;
      if(!this.pageMode) {
      
      } else {
        this.noteService.getNote(this.pageMode).subscribe((note:Note) => {
          this._id = note._id;
          this.title = note.title;
          this.content = note.content;
        }, err => this.redirect.navigate(['/user/notes/compose']));
      }
    }); 
   
  }

  postNote(noteForm:NgForm){
    if(!this.pageMode) {
      this.noteService.postNote(noteForm.value.title,noteForm.value.content);
    } else {
      this.noteService.editNote(this._id,this.title,this.content);
      this.redirect.navigate(['/user/notes']);
    }
  }

}
