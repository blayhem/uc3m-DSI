import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'notifications.html'
})
export class Notifications {

	notifications: Array<{title: string, text: string}> = [];
  subscription;


  constructor(public af: AngularFire,
      public viewCtrl: ViewController, 
      params: NavParams) {
		this.notifications = params.get('notifications');
    this.subscription = params.get('subscription');
  }	

  close() {
    	this.viewCtrl.dismiss();
  }

  clear(){
    this.subscription.update({notifications: null});
    this.notifications = [];
  }

  delete(notification){
    this.notifications.splice(this.notifications.indexOf(notification), 1);
    this.subscription.update({notifications: this.notifications});
	}

	debug(stuff){
	}
}
