import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'event-page',
    templateUrl: './event-page.component.html',
    styleUrls: [ './event-page.component.scss' ]
})
export class EventPageComponent implements OnInit {
    events: any[];

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.getEvents().on('value', (res) => {
          console.log(res.val());
          if (!res.val()) { this.events = []; 
          } else { this.events = getArrayFromObject(res.val()); }
        });
    }

}

export function getArrayFromObject(data): any[] {
  if (!data) { return []; }
  const tmpArray = [];
  Object.keys(data).forEach(uid => {
    if (typeof data[uid] === 'object') {
      tmpArray.push(Object.assign(data[uid], { uid: uid }));
    } else {
      tmpArray.push({
        value: data[uid],
        uid: uid
      });
    }
  });
  return JSON.parse(JSON.stringify(tmpArray));
}
