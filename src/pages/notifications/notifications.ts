import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'notifications.html'
})
export class Notifications {

	notifications: Array<{title: string, text: string}> = []
  	constructor(public viewCtrl: ViewController, params: NavParams) {
		this.notifications = params.get('notifications');
  	}	

  	close() {
    	this.viewCtrl.dismiss();
  	}

  	clear(){
  		this.notifications = [];
  	}

  	delete(notification){
  		this.notifications.splice(this.notifications.indexOf(notification), 1);
  	}

  	debug(stuff){
  	}
}
