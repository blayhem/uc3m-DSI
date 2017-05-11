import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TutorialRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tutorial-request',
  templateUrl: 'tutorial-request.html',
})
export class TutorialRequest {

  request;
  accept: string;
  showOther: boolean = this.accept=="no";
  reasons = [false, false, false, false];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.request = this.navParams.get('request');
  }

  showReason(){
    this.showOther = this.accept=="no";
  }

  debug(stuff){
      // console.log('fn call working ok');
      if(stuff) console.log(stuff);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialRequestPage');
  }

  send(){
    switch (this.accept) {
      case "yes":
        // 1. Send tutorial req accept to student
        //   STUDENT: 1. show notification 2. add event to calendar
        // 2. Add event to calendar
        break;
      case "no":
        // 1. Send tutorial req reject to student
        break;
      default:
        alert("No se ha aceptado o rechazado la tutoría.")
        break;
    }
  }

}
