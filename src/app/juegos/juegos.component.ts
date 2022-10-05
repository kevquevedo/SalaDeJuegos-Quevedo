import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {


  constructor(private router: Router) {}

  ngOnInit(): void { }

  irAhorcado(){
    this.router.navigateByUrl('juegos/ahorcado');
  }

  irMayorMenor(){
    this.router.navigateByUrl('juegos/mayorMenor');
  }

}
