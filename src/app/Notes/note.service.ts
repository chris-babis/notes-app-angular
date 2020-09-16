import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService{
    constructor(private http:HttpClient){}

    getLoggedInNotes(){
        return this.http.get<Note[]>('http://localhost:3000/notes');
    }
}
