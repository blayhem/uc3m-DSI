import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class Tutorial {

  // profesores: string = "Laura Arriaga";

  subjects = [];
  sKey: "";
  subject: any;

  teachers = [];
  tKey: "";
  teacher: any;
  showTeachers = false;

  tabla = [];
  showTable = false;
  hasTutorials = true;

  today = new Date();
  minutes = this.today.getMinutes().toString().length==1 ? 0+this.today.getMinutes().toString() : this.today.getMinutes().toString();
  months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  dayShortNames = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];
  dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  
  days = ["01","02","03","04"];

  tutoria = {
    "hora": this.today.getHours()+':'+this.minutes,
    "dia": this.today.toISOString()
  }


  constructor(public af: AngularFire,
    public navCtrl: NavController
  ) {

    this.af.auth.subscribe((auth) => {
      this.af.database.list('/users/'+auth.uid+'/subjects').subscribe(data => {
        //__init__
        this.subjects = data;
      });
    });

    
  }

  listen(type){
    if(type==="subject"){
      this.subject = this.subjects.filter(s => s.key===this.sKey)[0];
      this.teachers = this.subject.teachers;
      this.showTeachers = true;
    }
    else if(type==="teacher"){
      this.tabla = [];
      this.teacher = this.teachers.filter(t => t.key===this.tKey)[0];
      if(this.teacher.tutorial){
        this.days = [];
        this.teacher.tutorial.map(t => {
          this.filterDay(t.weekday);
          this.tabla.push({"dia": t.weekday, "horario": t.hours});
        });
        this.showTable = true;
        this.hasTutorials = true;

        // this.filterTime('Lunes');
      }
      else{
        this.showTable = false;
        this.hasTutorials = false;
      }
    }
  }

  filterDay(day){
    let date;
    let textDay;
    let year = this.today.getFullYear();
    let month = this.today.getMonth();
    let numDays = new Date(year, month+1, 0).getDate();

    for(let i=1; i<=numDays; i++){
      date = new Date(year, month, i);
      if(date.getDay()===this.dayNames.indexOf(day)){
        textDay = i.toString().length==1 ? '0'+i.toString() : i.toString();
        this.days.push(textDay);
      }
    }
    this.days.sort();
  }

  getHoursByDay(weekday){
    
  }

  debug(){
    console.log('Fn call working correctly')
  }
}
