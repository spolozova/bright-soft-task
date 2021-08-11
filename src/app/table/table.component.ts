import { Component, OnInit, Input } from '@angular/core';
import { Data } from '../shared/users.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() data: Data = {
    users: [],
    contents: [],
    channels: [],
  }

  ngOnInit(): void {
  }
}