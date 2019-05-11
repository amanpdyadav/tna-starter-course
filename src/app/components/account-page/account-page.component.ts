import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'account-page',
    templateUrl: './account-page.component.html',
    styleUrls: [ './account-page.component.scss' ]
})
export class AccountPageComponent implements OnInit {
    listArray = new Array(10);
    rowData = {};

    constructor() {
    }

    ngOnInit() {
    }

    createRange(num) {
        return new Array(num);
    }

    changeEvent(evt) {
         if (evt.event === 'add') {
             this.listArray.splice(evt.id + 1, 0, _.cloneDeep(this.rowData));
         } else if (evt.event === 'delete') {
             this.listArray.splice(evt.id, 1);
         } else if (evt.event === 'copy') {
             this.listArray.splice(evt.id + 1, 0, _.cloneDeep(this.listArray[ evt.id ]));
         }
    }

    addRow() {
        this.listArray.push(_.cloneDeep(this.rowData));
    }
}
