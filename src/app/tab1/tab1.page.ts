import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppointmentService } from '../shared/appointment.service';
import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  now: Date = new Date();
  travelStart: Date = null;
  travelEnd: Date = null;
  workStart: Date = null;
  workEnd: Date = null;
  id: number = 2521001;

  taksy: any;
  taskForm: FormGroup;

  appointmentForm: FormGroup;

  constructor(
    private aptService: AppointmentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      number: new FormControl(this.getNextTaskNumber(), Validators.required),
      date: [new Date(this.now).toISOString(), [Validators.required]],
      travelTimeStart: ['', Validators.required],
      travelTimeEnd: ['', Validators.required],
      workTimeStart: ['', Validators.required],
      workTimeEnd: [''],
      startPosition: [''],
      endPosition: [''],
    });
  }

  formSubmit() {
    if (!this.appointmentForm.valid) {
      console.log('return false');
      return false;
    } else {
      console.log(this.appointmentForm.get('workTimeEnd').value);

      if (this.appointmentForm.get('workTimeEnd').value == '') {
        this.appointmentForm
          .get('workTimeEnd')
          .setValue(new Date().toISOString());
      }

      this.aptService
        .create(this.appointmentForm.value)
        .then((res) => {
          console.log(res);
          this.fromReset();
        })
        .catch((error) => console.log(error));
    }
  }

  fromReset() {
    this.appointmentForm.reset();
    this.appointmentForm.get('number').setValue(this.getNextTaskNumber());
    this.appointmentForm.get('date').setValue(new Date().toISOString());
  }

  getNextTaskNumber(): number {
    return this.id;
  }

  startTravelTime() {
    this.appointmentForm
      .get('travelTimeStart')
      .setValue(new Date().toISOString());
  }

  startWorkTime() {
    this.appointmentForm
      .get('workTimeStart')
      .setValue(new Date().toISOString());
    this.appointmentForm
      .get('travelTimeEnd')
      .setValue(new Date().toISOString());
  }

  finished() {
    this.id++;
    this.workEnd = new Date();
    if (this.travelEnd == null) {
      this.travelEnd = new Date();
    }

    console.log(this.travelStart);
    console.log(this.travelEnd);

    console.log(this.workStart);
    console.log(this.workEnd);

    var diffWork = this.workEnd.getTime() - this.workStart.getTime();
    var diffTravel = this.travelEnd.getTime() - this.travelStart.getTime();
    var daysTravel = Math.floor(diffTravel / (60 * 60 * 24 * 1000));
    var hoursTravel =
      Math.floor(diffTravel / (60 * 60 * 1000)) - daysTravel * 24;
    var minutesTravel =
      Math.floor(diffTravel / (60 * 1000)) -
      (daysTravel * 24 * 60 + hoursTravel * 60);

    var diffWork = this.workEnd.getTime() - this.workStart.getTime();
    var days = Math.floor(diffWork / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diffWork / (60 * 60 * 1000)) - days * 24;
    var minutes =
      Math.floor(diffWork / (60 * 1000)) - (days * 24 * 60 + hours * 60);

    var total = minutes + minutesTravel;

    alert(
      'Fahrzeit ' +
        minutes +
        ' Arbeitszeit ' +
        minutesTravel +
        ' Gesamtzeit: ' +
        total
    );

    /*     this.task = new Task();
    this.task.date = this.date;
    this.task.number = '123';
    this.task.travelTime.end = this.travelEnd.getTime();
    this.task.travelTime.start = this.travelStart.getTime();
    this.task.workTime.end = this.workEnd.getTime();
    this.task.workTime.start = this.workStart.getTime();
    this.firebaseService.create(this.task); */

    this.workStart = null;
    this.workEnd = null;
    this.travelStart = null;
    this.travelEnd = null;
  }
}
