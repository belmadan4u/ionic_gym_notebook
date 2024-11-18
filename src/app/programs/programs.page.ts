import { Component } from '@angular/core';
import { Program } from '../models/program'
import { ProgramService } from '../services/program.service';
@Component({
  selector: 'app-programs',
  templateUrl: 'programs.page.html',
  styleUrls: ['programs.page.scss']
})
export class ProgramsPage {
  programs: Program[] = [];
  constructor(private programService : ProgramService) {}
  
  ngOnInit() {
    this.programService.getPrograms().subscribe(
      (programs) => {
        this.programs = programs;
        console.log(this.programs); // Vérifiez que les exercices sont chargés correctement
      },
      (error) => console.error('Erreur lors de la récupération des programmes :', error)
    );
  }
}
