import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  submit(form: NgForm) {
    console.log(form.value.licensePlate);
    form.reset();
  }

}
