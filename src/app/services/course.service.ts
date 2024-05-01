import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Kurs } from '../models/kurs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url: string = 'https://webbutveckling.miun.se/files/ramschema_ht23.json';

  constructor(private http: HttpClient) {}

  //Hämta kurser
  getCourses(): Observable<Kurs[]> {
    return this.http.get<Kurs[]>(this.url);
  }
}
