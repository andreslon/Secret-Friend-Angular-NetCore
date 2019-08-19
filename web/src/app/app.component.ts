import { Component, OnInit } from '@angular/core';
import { User, Exception } from './app.models';
import { timer, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  users: User[] = [];
  exceptions: Exception[] = [];
  intervalNumber: number = 5;
  pagetoShow: number = 1;
  secretFriend: string = null;
  constructor() {

  }
  ngOnInit(): void {
    this.isLoading = true;
    let tm = timer(1000);
    tm.subscribe(done => {

      this.users.push({ userId: Guid.newGuid(), userName: 'Andrés Londoño', created: null });
      this.users.push({ userId: Guid.newGuid(), userName: 'Alejandra Rendon', created: new Date() });
      this.users.push({ userId: Guid.newGuid(), userName: 'Ismael Londoño', created: null });
      this.users.push({ userId: Guid.newGuid(), userName: 'Piedad Mesa', created: new Date() });
      this.users.push({ userId: Guid.newGuid(), userName: 'Sebastian Londoño', created: null });


      this.exceptions.push({
        userId: this.users[0].userId,
        userName: this.users[0].userName,
        friendId: this.users[2].userId,
        friendName: this.users[2].userName
      })

      this.isLoading = false;
    })
  }
  secretfriend(userId: string) {
    this.generateSecretFriend(userId);
    this.pagetoShow = 2;
    let tmInterval = interval(1000);
    tmInterval.subscribe(i => {
      if (this.intervalNumber === 0) {
        this.pagetoShow = 3;
      } else {
        this.intervalNumber = this.intervalNumber - 1;
      }
    })
  }
  generateSecretFriend(userId: string) {
    debugger;
    while (this.secretFriend == null) {
      var validUsers = this.users.filter(function (x) {
        return x.created == null && x.friendId == null;
      });
      var random = Math.floor(Math.random() * validUsers.length) + 0;
      var friend = validUsers[random];
      //El amigo secreto debe ser diferente a el usuario seleccionado
      if (friend.userId != userId) {
        //El amigo secreto no debe estar como excepcion
        var userExceptions = this.exceptions.filter(function (x) {
          return x.userId == userId && x.friendId == friend.userId;
        });

        if (userExceptions.length === 0) {
          this.secretFriend = friend.userName.toLocaleUpperCase();
        }
      }
    }


    let tm = timer(10000);
    tm.subscribe(done => {
      this.secretFriend = "····················";
    })
  }
}


class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}