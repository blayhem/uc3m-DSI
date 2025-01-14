import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire} from 'angularfire2';

import { TutorialRequest } from '../tutorial-request/tutorial-request';

/**
 * Generated class for the TutorialListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tutorial-list',
  templateUrl: 'tutorial-list.html',
})
export class TutorialList {

	tutorials = [];
	months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	subscription;

  	constructor(
	  	public af: AngularFire,
	  	public navCtrl: NavController, 
	  	public navParams: NavParams) {

	  	this.af.auth.subscribe((auth) => {
	  		if(auth && auth.uid){
	  			this.subscription = this.af.database.object('/users/'+auth.uid);
	  			this.subscription.subscribe(obj => {
	  				this.tutorials = [];
	  				if(obj.tutorials){
	  					for(let key in obj.tutorials) {
	  						let t 	 = obj.tutorials[key];
							t.key 	 = key;
							let date = new Date(t.dia)
							t.diaHR  = date.getDate() + " de " + this.months[date.getMonth()]; //day human readable
						    this.tutorials.push(t);
						}
	  				}
	  			});
	  		}
	  	});
  	}

  	showRequest(r){
        this.navCtrl.push(TutorialRequest, {request: r, delete: this.delete.bind(this)});
    }

  	clear(){
  		this.subscription.update({tutorials: null});
		this.tutorials = [];
	}

  	delete(tutorial){
  		this.tutorials.splice(this.tutorials.indexOf(tutorial), 1);
  		this.subscription.update({tutorials: this.tutorials});
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TutorialListPage');
	}

}
