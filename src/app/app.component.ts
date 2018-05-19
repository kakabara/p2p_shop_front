import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  storage = localStorage;
  auth = '';
  constructor() {}

  ngOnInit() {
    this.auth = this.storage.getItem('authToken');
    console.log(this.auth);
  }
}
