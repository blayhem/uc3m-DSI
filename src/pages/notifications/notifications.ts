import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'notifications.html'
})
export class Notifications {

	notifications: Array<{title: string, description: string}>;
  	constructor(public viewCtrl: ViewController) {
  		this.notifications = [{title: "Example", description: "Example notification"}];
  	}	

  	close() {
    	this.viewCtrl.dismiss();
  	}
}
