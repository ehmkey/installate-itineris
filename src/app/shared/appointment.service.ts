import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  appointments: AngularFireList<any>;
  appointment: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.appointments = db.list('/appointment');
  }

  // Create
  create(apt: Appointment) {
    return this.appointments.push({
      date: apt.date,
      number: apt.number,
      travelTimeEnds: apt.travelTimeEnd,
      travelTimeStart: apt.travelTimeStart,
      workTimeEnd: apt.workTimeEnd,
      workTimeStart: apt.workTimeStart,
      startPosition: apt.startPosition,
      endPosition: apt.endPosition
    })
  }

  get(id: string) {
    this.appointment = this.db.object('/appointment/' + id);
    return this.appointment;
  }

  getAll() {
    this.appointments = this.db.list('/appointment', ref => ref.orderByChild('date'));
    return this.appointments;
  }

  update(id: string, apt: Appointment) {
    return this.appointments.update(id, {
      date: apt.date,
      number: apt.number,
      travelTimeEnds: apt.travelTimeEnd,
      travelTimeStart: apt.travelTimeStart,
      workTimeEnd: apt.workTimeEnd,
      workTimeStart: apt.workTimeStart,
      startPosition: apt.startPosition,
      endPosition: apt.endPosition
    })
  }

  deleteBooking(id: string) {
    this.appointment = this.db.object('/appointment/' + id);
    this.appointment.remove();
  }
}