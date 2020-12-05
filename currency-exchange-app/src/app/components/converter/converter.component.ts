import {Data} from '../../models/data';
import {SDATA} from '../../data/scratch-data';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
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
