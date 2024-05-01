import { Component } from '@angular/core';
import { Kurs } from '../models/kurs';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses: Kurs[] = [];

  //Null variabel att lagra senaste sortering i
  latestSort: null | string = null;

  constructor(private courseService: CourseService) {}

  //Lägg in data i kurs-array
  ngOnInit() {
    this.courseService.getCourses().subscribe((kurs) => {
      this.courses = kurs;
    });
  }
  //Filtrering

  filterValue: string = '';
  filteredCourses: Kurs[] = [];
  /* PROBLEM!! filteredCourses verkar inte uppdateras av detta. Visar bara en tom array, skriver inte ut något till skärmen alls. Har följt Mattias video och vet inte vad det är jag gör fel nu. */
  filterCourses(): void {
    this.filteredCourses = this.courses.filter((kurs) => {
      return kurs.coursename
        .toLowerCase()
        .includes(this.filterValue.toLowerCase());
    });
    console.log(this.filteredCourses); // Kontrollera temporär filtrerad lista
  }

  //Sortering
  /* Använder keyof då [sortByX] misstogs för index utan keyof */
  sortCourses(sortByX: keyof Kurs): void {
    let sortedCourses: Kurs[];
    //sortera arrayen
    sortedCourses = this.courses.sort((a, b) =>
      a[sortByX].localeCompare(b[sortByX])
    );
    //Peta in i variabeln
    this.courses = sortedCourses;

    //Om sortByX är likadan som Latestsort, byt ordning
    if (sortByX === this.latestSort) {
      sortedCourses.reverse();
      this.latestSort = null;
    } else {
      //Om sortByX inte är likadan, nollställ så sorteringen börjar om
      this.latestSort = sortByX;
    }
  }
}
