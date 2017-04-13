import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'modal.html'
})
export class ModalPage {

    constructor(public viewCtrl: ViewController) {
   }
   dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
