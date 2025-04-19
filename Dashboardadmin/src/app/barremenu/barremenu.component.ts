import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barremenu',
  templateUrl: './barremenu.component.html',
  styleUrls: ['./barremenu.component.css']
})
export class BarremenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
