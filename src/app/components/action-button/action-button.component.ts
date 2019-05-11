import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  // Output is responsible for passing the changes to the parent.
  // Parent can subscribe to (changeEvent) in order to get the changes.
  @Output() changeEvent = new EventEmitter<EventType>();


  // Input is responsible for getting the values from parent.
  @Input() id: any = '';
  @Input() index: any = -1;

  constructor() {
  }

  ngOnInit() {
  }

  // emitEvents takes two arguments event of type string and id of type any and also id is optional denoted by '?'.
  emitEvents(event: string, id?) {
    this.changeEvent.emit({
      event: event,
      id: id
    });
  }
}

// Defining our custom types.
export class EventType {
  event: string;
  id: string;
}
