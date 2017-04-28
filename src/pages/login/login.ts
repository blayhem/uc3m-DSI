import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Calendar } from '../calendar/calendar'
import {AngularFire} from 'angularfire2';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

	logged: any;

	user = {
    	username: "",
    	password: ""
  	};

	constructor(
		public af: AngularFire,
		public navCtrl: NavController,
		public navParams: NavParams,
		) {
		this.logged=af.auth.subscribe(auth => {
			console.log(auth);
			if(auth){
				this.navCtrl.setRoot(Calendar);
			}
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login(other) {
		console.log('Loggin pressed.');
		this.af.auth.login({ email: this.user.username, password: this.user.password })
			// .then(() => console.log('logged'));
			.catch((e:any) => {
				console.log(e.message);
				if(e.code==="auth/user-not-found"){
					alert('Usuario o contraseña inválidos')
				}
				if(e.code==="auth/invalid-email"){
					alert('El formato introducido no es válido')
				}
			})
	}

	logout(){
		this.af.auth.logout();
	}
}
