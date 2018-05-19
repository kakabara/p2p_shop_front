import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required])
    });
  }

  protected onSubmit() {
    console.log(this.form.value);
  }
}
