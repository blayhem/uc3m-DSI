import { Component, OnInit } from '@angular/core';

import {Http} from '@angular/http';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

	data: Array<{name: string, date: string}>;
	events: Array<{name: string, date: string}>;
	free: boolean;
	date: string;
	today: number;

    constructor(private http: Http) {
    	this.http.get("./assets/events.json").subscribe(data => {
        	this.data = JSON.parse(data['_body']);
        // console.log(this.items);
    	});
    	this.free = false;
    	this.today = new Date().getDate();
    }

    getData(date: number) {
    	this.events = this.data.filter(d => parseInt(d.date) == date);
    	if(this.events.length==0) this.free = true;
    	else this.free = false;

    	switch (date) {
    		case this.today:
    			this.date = "hoy";
    			break;
    		case this.today-1:
    			this.date = "ayer";
    			break;
    		case this.today+1:
    			this.date = "mañana";
    			break;
    		default:
    			this.date = "El día "+date;
    			break;
    	}
    }

    translateDate(ev){
    	// console.log(ev.detail.date);
    	this.getData(ev.detail.date.getDate());
    }

    ngOnInit() { 
	    document
	    	.querySelector('.calendar')
			.addEventListener('date-change', (e) => {
				this.translateDate(e);
			});

    }
}