import { Component, Input, OnInit } from '@angular/core';
import { Content, User, UsersService, Channel } from '../shared/users.service';


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

  @Input() users: User[] = [];

  contents: Content[] = [];
  channels: Channel[] = [];
  isSending: boolean = false;
  error: boolean = false;
  

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getContents().subscribe((contents: Content[]) => {
      this.contents = contents;
    })
    this.usersService.getTvChannels().subscribe((channels: Channel[]) => {
      this.channels = channels;
    })
  }

  onSubmit() {
    this.isSending = true;
    this.usersService.addUser(this.user, this.contents, this.channels).subscribe((newUser) => {
      console.log(newUser);
      this.users.push(newUser);
    },
    () => {this.error = true;} 
    )
    this.user.name = '';
    this.user.favorite_content_id = [];
    this.isSending = false;
  }
}
