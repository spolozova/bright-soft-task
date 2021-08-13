import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { get, sortBy } from 'lodash';

export interface User {
    name: string
    favorite_content_id: number[]
    favorite_channels?: string[]
  }

  export interface Content {
    name: string,
    favorite_content_id: number,
    channel_id: number,
  }

  export interface Channel {
    name: string,
    channel_id: number,
  }
  @Injectable({
    providedIn: 'root'
  })

  export class UsersService {

   constructor(
     private httpClient: HttpClient
   ) {}

   private findFavoriteChannels(user: any, contents: any, channels: any): any[] {
     const favoriteContents = user.favorite_content_id;
      if (favoriteContents.length === 0) {
        return [];
      }
      const channelsCounter = favoriteContents.reduce((acc: any, id: number) => {
        const favoriteContent = contents.find((element: Content) => element.favorite_content_id === id );
        if (!favoriteContent) {
          return;
        }
        const channelId = favoriteContent.channel_id;
        const count = get(acc, channelId, 0) + 1
        return { ...acc, [channelId]: count };
      }, {});
      const favoriteChannels = Object.keys(channelsCounter).map((channelId) => {
        const { name } = channels.find((channel: Channel) => channel.channel_id === Number(channelId));
        return { id: channelId, name, count: channelsCounter[channelId] };
       })

      return sortBy(favoriteChannels, [(item) => item.count])
      .filter((c) => c.count === favoriteChannels[favoriteChannels.length-1].count)
      .map((channel) => channel.name);
   }

   private loadUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/assets/users.json');
   }

   getContents(): Observable<Content[]> {
     return this.httpClient.get<any[]>('/assets/content.json');
   }

   getTvChannels(): Observable<Channel[]> {
     return this.httpClient.get<any[]>('/assets/tv_channels.json');
   }

   getData(): Observable<object> {
    return forkJoin([this.getUsers(), this.getContents(), this.getTvChannels()])
    .pipe((map(([users, contents, channels]: [User[], Content[], Channel[]]) => {
      return { users, contents, channels }
 })))
};

   getUsers(): Observable<User[]> {
     return forkJoin([this.loadUsers(), this.getContents(), this.getTvChannels()])
     .pipe(map(([users, content, channels]: [User[], Content[], Channel[]]) => {
       return users.map((user: User) => {
         const favorite_channels = this.findFavoriteChannels(user, content, channels);
         return { ...user, favorite_channels };
        });
      })
      );
    }

     addUser(user: any, contents: Content[], channels: Channel[]): Observable<any> {
     return this.httpClient.post<any>('https://reqres.in/api/users', user).pipe(map(({ name, favorite_content_id }) => {
       const favorite_channels = this.findFavoriteChannels({ name, favorite_content_id }, contents, channels)
       return { name, favorite_content_id, favorite_channels}
     }),
     catchError((error) => {
      console.log(error); 
      return throwError(error);
     })
     )
    }
  }
