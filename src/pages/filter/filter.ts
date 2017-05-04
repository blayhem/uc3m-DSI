import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

/**
 * Generated class for the FilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class Filter {

  subjects = [];
  types = ["Clase", "Examen", "Charla", "Taller", "Práctica"];

  constructor(public af: AngularFire,
    public navCtrl: NavController) {
    this.af.auth.subscribe((auth) => {
      if(auth.uid){
        this.af.database.list('/users/'+auth.uid+'/subjects').subscribe(data => {
        //__init__
        this.subjects = data;
      });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

}
