import { Component, OnInit } from '@angular/core';
import { User } from './app.models';
import { timer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading:boolean;
  users:User[]=[];
  constructor(){

  }
  ngOnInit(): void {
    this.isLoading=true;
    let tm = timer(4000);
    tm.subscribe(done => {
      
      this.users.push({userId:Guid.newGuid(), userName:'Andrés Londoño'});
      this.users.push({userId:Guid.newGuid(), userName:'Alejandra Rendon'});
      this.users.push({userId:Guid.newGuid(), userName:'Ismael Londoño'});
      this.users.push({userId:Guid.newGuid(), userName:'Piedad Mesa', created: new Date()});
      this.users.push({userId:Guid.newGuid(), userName:'Sebastian Londoño'});


      this.isLoading=false;
    })
  }
}


class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}