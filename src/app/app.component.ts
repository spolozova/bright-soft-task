import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User, UsersService, Content, Channel, Data } from './shared/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  data: Data = {
    users: [],
    contents: [],
    channels: [],
  }

constructor(
  private usersService: UsersService
) {}

  ngOnInit(): void {
    forkJoin({
      users: this.usersService.getUsers(),
      contents: this.usersService.getContents(), 
      channels: this.usersService.getTvChannels(),
    }).subscribe((data) => this.data = data)
  }
}
