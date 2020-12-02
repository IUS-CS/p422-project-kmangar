import {Data} from '../../../models/data';
import {SDATA} from '../../data/scratch-data';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  @Input() data: Data;
  constructor() { }

  ngOnInit(): void {
  }

}
