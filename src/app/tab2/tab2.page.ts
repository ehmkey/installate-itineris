import { Component } from '@angular/core';
import { AppointmentService } from '../shared/appointment.service';
import { AngularFireList } from '@angular/fire/database';
import { Appointment } from '../shared/Appointment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  appointments: AngularFireList<Appointment>;
  records;
  constructor(private aptService: AppointmentService) {}

  ngOnInit() {
    //  this.addrecord = {type :'', description :'', amount: null}
    this.records = this.aptService
      .getAll()
      .valueChanges()
  }
}
