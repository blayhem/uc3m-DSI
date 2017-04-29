import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class Tutorial {

  profesores: string = "Laura Arriaga";
  teachers = [];
  tabla = [{
    "dia": "Lunes",
    "horario": "13-15"
  },{
    "dia": "Martes",
    "horario": "10-11"
  }];

  today = new Date();
  minutes = this.today.getMinutes().toString().length==1 ? 0+this.today.getMinutes().toString() : this.today.getMinutes().toString();
  months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  tutoria = {
    "hora": this.today.getHours()+':'+this.minutes,
    "dia": this.today.toISOString()
  }


  constructor(public af: AngularFire,
    public navCtrl: NavController
  ) {

    this.af.auth.subscribe((auth) => {
      this.af.database.list('/users/'+auth.uid+'/teachers').subscribe(data => {
        this.teachers = data;
      });
    });

    
  }

  debug(){
    console.log('Fn call working correctly')
    console.log(this.tutoria);
  }
}
