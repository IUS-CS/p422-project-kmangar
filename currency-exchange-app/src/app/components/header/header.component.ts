import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor() {}

  ngOnInit(): void {}

}
