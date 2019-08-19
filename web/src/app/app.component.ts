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


      let andresId = Guid.newGuid();
      let piedadId = Guid.newGuid();
      let alejaId = Guid.newGuid();
      let IsmaelId = Guid.newGuid();
      let SebastianId = Guid.newGuid();

      this.users.push({ userId: andresId, userName: 'Andrés Londoño' });
      this.users.push({ userId: Guid.newGuid(), userName: 'Jhonatan Londoño' });
      this.users.push({ userId: Guid.newGuid(), userName: 'Jorge Londoño' });
      this.users.push({ userId: Guid.newGuid(), userName: 'Andrea Rendón' });
      this.users.push({ userId: Guid.newGuid(), userName: 'Rosalba Loaiza' });
      this.users.push({ userId: Guid.newGuid(), userName: 'Zaritha Hernandez' }); 

      this.users.push({ userId: alejaId, userName: 'Alejandra Rendon', created: new Date(), friendId: SebastianId });
      this.users.push({ userId: IsmaelId, userName: 'Ismael Londoño' , created: new Date(), friendId: IsmaelId});
      this.users.push({ userId: piedadId, userName: 'Piedad Mesa', created: new Date(), friendId: andresId });
      this.users.push({ userId: SebastianId, userName: 'Sebastian Londoño', created: new Date(), friendId: alejaId });

      this.exceptions.push({
        userId: this.users[0].userId,
        userName: this.users[0].userName,
        friendId: this.users[2].userId,
        friendName: this.users[2].userName
      });

      this.exceptions.push({
        friendId: this.users[0].userId,
        friendName: this.users[0].userName,
        userId: this.users[2].userId,
        userName: this.users[2].userName
      });

      this.isLoading = false;
    })
  }
  secretfriend(userId: string) {
    this.generateSecretFriend(userId);
    this.pagetoShow = 2;
    let tmInterval = interval(1000);
    tmInterval.subscribe(i => {
      if (this.intervalNumber === 1) {
        this.pagetoShow = 3;
      } else {
        this.intervalNumber = this.intervalNumber - 1;
      }
    })
  }
  generateSecretFriend(userId: string) {
    debugger;
    while (this.secretFriend == null) {

      var random = Math.floor(Math.random() * this.users.length) + 0;
      var friend = this.users[random];

      
      var alreadyInUse = this.users.filter(function (x) {
        return x.friendId == friend.userId;
      });
      //El amigo secreto no debe estar en uso
      if (alreadyInUse.length === 0) {
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