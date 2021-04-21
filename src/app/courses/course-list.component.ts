import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

    filteredCourses: Course[] = [];

    _courses: Course[] = [];


    _filterBy: string;

//a injeção de dependẽncia normalmente é feito no construtor do componente
    constructor(private courseService: CourseService) { }

        //ao iniciar o componente, as propriedades serão setadas
    ngOnInit(): void {
        //recebendo o valor do service de courses (course.service.ts)
        this._courses = this.courseService.retrieveAll();
        //this.retrieveAll();
        //cursos filtrados
        this.filteredCourses = this._courses;
    }

    retrieveAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('Error', err)
        })
    }

    deleteById(courseId: number): void {
        this.courseService.deleteById(courseId).subscribe({
            next: () => {
                console.log('Deleted with success');
                this.retrieveAll();
            },
            error: err => console.log('Error', err)
        })
    }

//criando uma função set para trabalhar com o filtro no html do componente
    set filter(value: string) {
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

//criando uma função get para retornar o filtro no html do componente
    get filter() {
        return this._filterBy;
    }

}