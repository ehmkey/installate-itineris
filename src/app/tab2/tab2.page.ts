import { Component } from '@angular/core';
import { AppointmentService } from '../shared/appointment.service';
import { AngularFireList } from '@angular/fire/database';
import { Appointment } from '../shared/Appointment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  appointments: AngularFireList<Appointment>;
  records = [];
  mappedList: Map<string, Appointment[]> = new Map<string, Appointment[]>();
  public resultData = [];

  constructor(private aptService: AppointmentService) { }

  ngOnInit() {
    //  this.addrecord = {type :'', description :'', amount: null}
    let appointments = this.aptService.getAll();
    appointments.snapshotChanges().subscribe(res => {
      this.records = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        //console.log(a)
        this.records.push(a as Appointment);
      });
    });
  }

  filterByDate(date: Date) {
    const today = new Date().setHours(0, 0, 0, 0);
    const filterToday = this.records.filter(obj => new Date(obj['date']).setHours(0, 0, 0, 0) === today);


    console.log(filterToday);
  }

  dataLoad() {

    let data = new Set(this.records.map(item => item.date))
    data.forEach((date) => {
      this.resultData.push({
        date: date,
        record: this.records.filter(i => i.date === date)
      })
    })

    return this.resultData;
  }

  getMappedList() {
    console.log(this.records);
    this.records.forEach(r => {
      console.log("xjjjj")
      let trimmedDate = r.date.split('T')[0];
    });

    return this.records;

  }
}