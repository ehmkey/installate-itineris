import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  date : Date = new Date();
  travelStart : Date =  null;
  travelEnd : Date = null;
  workStart : Date = null;
  workEnd : Date = null;
  id:number = 2521001;

  constructor() {}

  getNextTaskNumber(): number {
   return this.id;
  };

  startTravelTime(){
    this.travelStart = new Date();
  }

  startWorkTime(){
    this.workStart = new Date();
    this.travelEnd = new Date();
  }

  finished(){
    this.id++;
    this.workEnd = new Date();
    if(this.travelEnd == null){
      this.travelEnd = new Date();
    }

    console.log(this.travelStart);
    console.log(this.travelEnd);

    console.log(this.workStart);
    console.log(this.workEnd);

    var diffWork = this.workEnd.getTime() - this.workStart.getTime();
    var diffTravel = this.travelEnd.getTime() - this.travelStart.getTime();
    var daysTravel = Math.floor(diffTravel / (60 * 60 * 24 * 1000));
    var hoursTravel = Math.floor(diffTravel / (60 * 60 * 1000)) - (daysTravel * 24);
    var minutesTravel = Math.floor(diffTravel / (60 * 1000)) - ((daysTravel * 24 * 60) + (hoursTravel * 60));

    var diffWork =  this.workEnd.getTime() - this.workStart.getTime();
    var days = Math.floor(diffWork / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diffWork / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diffWork / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));

    var total =  minutes+minutesTravel;

    alert("Fahrzeit " + minutes + " Arbeitszeit " + minutesTravel +  " Gesamtzeit: " + total );
  
    this.workStart = null;
    this.workEnd = null;
    this.travelStart = null;
    this.travelEnd = null;
  }

}
