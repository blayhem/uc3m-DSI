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

  	constructor(
	  	public af: AngularFire,
	  	public navCtrl: NavController, 
	  	public navParams: NavParams) {

	  	this.af.auth.subscribe((auth) => {
	  		if(auth && auth.uid){
	  			this.af.database.object('/users/'+auth.uid).subscribe(obj => {
	  				this.tutorials = [];
	  				if(obj.tutorials){
	  					for(let key in obj.tutorials) {
	  						let t = obj.tutorials[key];
							t.key = key;
						    this.tutorials.push(t);
						}
	  				}
	  				console.log(this.tutorials);
	  			});
	  		}
	  	});
  	
  	}

  	showRequest(r){
        this.navCtrl.push(TutorialRequest, {'request': r});
    }

  	clear(){
		this.tutorials = [];
	}

  	delete(tutorial){
  		this.tutorials.splice(this.tutorials.indexOf(tutorial), 1);
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TutorialListPage');
	}

}
