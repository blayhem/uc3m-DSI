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
  text;
  accept: string;
  showOther: boolean = this.accept=="no";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.request = this.navParams.get('request');

	  this.text = JSON.stringify(this.request);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialRequestPage');
  }

  showReason(){
    this.showOther = this.accept=="no";
  }

  debug(stuff){
      console.log(this.accept, this.accept=="yes", this.showOther);
      if(stuff) console.log(stuff);
  }

}
