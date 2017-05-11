import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

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
  delete;
  accept: string;
  showOther: boolean = this.accept=="no";
  reasons = [false, false, false, false];
  other: string = "";

  constructor(public af: AngularFire,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.request = this.navParams.get('request');
    this.delete  = this.navParams.get('delete');
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
    let response = Object.assign(this.request, {accept: this.accept, reasons: this.reasons, other: this.other});
    switch (this.accept) {
      case "yes" :
        // 1. Add event to calendar
        console.log("Tutorial ACCEPTED, adding event to calendar");
        // no break because we ALWAYS send response
      case "no"  :
        // 2. Send tutorial req response to student
        //   STUDENT: 1. show notification 2. add event to calendar?
        this.af.database
          .object('/users/'+this.request.uid)
          .update({tutorialResponse: response})
          .then(()=>console.log('Tutorial sent to DB'))
        break;
      default:
        alert("No se ha aceptado o rechazado la tutoría.")
        break;
    }
    this.navCtrl.pop();
    this.delete(this.request);
  }
}
