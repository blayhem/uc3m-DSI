import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class Tutorial {

  profesores: string = "n64";

  constructor(public navCtrl: NavController
  ) {

  }

  debug(){
    console.log('Fn call working correctly')
  }
}
