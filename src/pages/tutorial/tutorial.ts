import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { NavController, AlertController } from 'ionic-angular';

import { Calendar } from '../calendar/calendar';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class Tutorial {

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
  
  days  = [];
  hours = [];

  tutoria = {
    "hora": "",//this.today.getHours()+':'+this.minutes,
    "dia": ""//this.today.toISOString()
  }

  uid;


  constructor(public af: AngularFire,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) {

    this.af.auth.subscribe((auth) => {
      if(auth.uid){
        this.uid = auth.uid;
        this.af.database.list('/users/'+auth.uid+'/subjects').subscribe(data => {
        //__init__
        this.subjects = data;
      });
      }
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
        let office = this.teacher.office;
        this.teacher.tutorial.map(t => {
          this.filterDay(t.weekday);
          this.tabla.push({"dia": t.weekday, "horario": t.hours, "office": office});
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
    this.days = [];
    let date;
    let textDay;
    let year = this.today.getFullYear();
    let month = this.tutoria.dia === "" ? this.today.getMonth() : new Date(this.tutoria.dia).getMonth();
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

  getHoursByDay(){
    this.listen('teacher');
    this.hours = [];
    let weekday = this.dayNames[new Date(this.tutoria.dia).getDay()];
    let obj = this.teacher.tutorial.filter(t => t.weekday==weekday)[0];
    let hours = obj? obj.hours : [];
    // console.log(obj);
    for(let i=hours[0]; i<hours[hours.length-1]; i++){
      this.hours.push(i);
    }
  }

  sendTutorial(obj: Object){

    return new Promise((resolve, reject) => {

      let dia  = JSON.stringify(obj['dia'])
        .split('T')[0]
        .split('-')
        .map(e => e=='"2017' ? e.split('"')[1] : e)
        .map(e => Number(e));
      let hora = obj['hora'].split(':').map(e => Number(e));

      let date = dia[0]+'-'+dia[1]+'-'+dia[2]+'-'+hora[0]+'-'+hora[1];

      if(this.uid){
        this.af.database
        .list('/users/fjPm48R1RCfeCYUQSy0ESIL1hDm2/tutorials')
        .update(this.uid+'_'+date, obj)
        .then(_ => resolve())
        .catch(err => console.log(err));
      }
      else{
        this.af.database
        .list('/users/fjPm48R1RCfeCYUQSy0ESIL1hDm2/tutorials')
        .update("_"+date, obj)
        .then(_ => resolve())
        .catch(err => console.log(err));
      }

    });
  }

  setDay(){
    if(this.tutoria.dia===""){
      this.tutoria.dia = this.today.toISOString();
    }
  }

  saveTutorial(){
    // console.log(this.tutoria);
    let selectedDay = new Date(this.tutoria.dia)
    let selectedDate = this.dayNames[selectedDay.getDay()];
    let validDates = this.teacher.tutorial.filter(t => t.weekday==selectedDate);
    if(this.tutoria.hora=='' || validDates.length==0 || selectedDay<this.today){
      alert('Fecha incorrecta')
    }
    else{
      let msg = "Solicitar tutoría a "+this.teacher.name+" el "+ this.dayNames[selectedDay.getDay()]+" "+selectedDay.getDate()+" de "+this.months[selectedDay.getMonth()]+" a las "+this.tutoria.hora;
      
      let confirm = this.alertCtrl.create({
      title: "¿Son estos datos correctos?",
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {

            this.sendTutorial(this.tutoria)
            .then(() => {
              let confirm = this.alertCtrl.create({
                title: 'Tutoría solicitada!',
                subTitle: 'Recibirás un aviso cuando el profesor acepte o rechace la tutoría.',
                buttons: [{text: "Ok", handler: () => {
                  this.navCtrl.setRoot(Calendar);
                }}]
              });
              confirm.present();
            }, (reason) => console.log("Fail", reason));
            
          }
        }
      ]
    });
    confirm.present();
    }
  }

  debug(){
    console.log('Fn call working correctly')
  }
}
