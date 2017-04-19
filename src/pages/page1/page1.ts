import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';

import { ModalController } from 'ionic-angular';

import { ModalPage } from '../modal/modal';
import { Notifications } from '../notifications/notifications';

import { PopoverController } from 'ionic-angular';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController,
    private http: Http,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController
  ) {

    this.http.get("./assets/sites.json").subscribe(data => {
        this.items = JSON.parse(data['_body']);
        // console.log(this.items);
    });
  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.onDidDismiss(data => {
      console.log(data);
    });
    modal.present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(Notifications);
    popover.present({
      ev: myEvent
    });
  }

  debug(){
    console.log('Fn call working correctly')
  }
}
