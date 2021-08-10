import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../shared/users.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }
}