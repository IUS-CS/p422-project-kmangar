import {Component, Input, OnInit} from '@angular/core';

import {Data} from '../../models/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() data: Data;

  constructor() { }

  ngOnInit(): void {
  }

}
