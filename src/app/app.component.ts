import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  data$ = this.usersService.getData();

constructor(
  private usersService: UsersService
) {}

  ngOnInit(): void {

  }
}
