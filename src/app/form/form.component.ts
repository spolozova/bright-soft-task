import { Component, Input, OnInit } from '@angular/core';
import { User, UsersService, Data } from '../shared/users.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  user: User = {
    name: '',
    favorite_content_id: [],
  };

  @Input() data: Data = {
    users: [],
    contents: [],
    channels: [],
  }

  isSending: boolean = false;
  error: boolean = false;
  

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSending = true;
    this.usersService.addUser(this.user, this.data.contents, this.data.channels).subscribe((newUser) => {
      this.data.users.push(newUser);
    },
    () => {this.error = true;} 
    )
    this.user.name = '';
    this.user.favorite_content_id = [];
    this.isSending = false;
  }
}
