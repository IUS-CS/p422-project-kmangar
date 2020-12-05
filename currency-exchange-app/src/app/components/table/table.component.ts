import { Component, Input, OnInit } from '@angular/core';

import {Data} from '../../models/data';
import {SDATA} from '../../data/scratch-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  datas = SDATA;

  selectedData: Data;
  constructor() { }



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
