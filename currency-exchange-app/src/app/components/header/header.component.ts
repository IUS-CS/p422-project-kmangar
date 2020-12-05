import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLinkActive, RouterLink } from '@angular/router';
import { tap } from 'rxjs/operators';

import {Data} from '../../models/data';
import {SDATA} from '../../data/scratch-data';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  datas = SDATA;

  selectedData: Data;
  constructor() { }
  navbarOpen = false;

  // tslint:disable-next-line:typedef
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit(): void {
  }

  onSelect(data: Data): void {
    if (this.selectedData && this.selectedData.title === data.title){
      this.selectedData = null;
      return;
    }
    this.selectedData = data;
    console.log(`selected a profile: ${data.title}`);
  }

}
