import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../User/user.service';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService{

  private notesSubject: Subject<Note[]> = new Subject();
  private notes: Note[] = [];

  constructor(private http:HttpClient, private userService:UserService, private router:Router){}
    

  getLoggedInNotes(){
    this.http.get<Note[]>('http://localhost:3000/notes').subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next([...this.notes]);
    });
  }

  postNote(title:string,content:string){
    const note: Note = {title, content, author: this.userService.user.value._id};
    this.http.post('http://localhost:3000/notes', note).subscribe(() => {
      this.notes.push(note);
      this.notesSubject.next([...this.notes]);
      this.router.navigate(['/user/notes'])
    });
  }

  deleteNote(_id:string){
    this.http.delete(`http://localhost:3000/notes/${_id}`).subscribe(() => {
      this.notes = this.notes.filter(note => note._id !== _id);
      this.notesSubject.next([...this.notes]);
    })
  }

  editNote(_id:string, title: string, content: string){
    
    this.http.patch(`http://localhost:3000/notes/${_id}`, {title, content}).subscribe((note:Note) => {
      let foundIndex = this.notes.findIndex(note => note._id === _id);
      this.notes[foundIndex] = note;
      this.notesSubject.next([...this.notes]);
    })
  }

  getNote(_id:string){
    return this.http.get(`http://localhost:3000/notes/${_id}`);
  }

  getObservableNotes(){
    return this.notesSubject.asObservable();
  }
}
