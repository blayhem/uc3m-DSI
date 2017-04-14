import { Component, OnInit } from '@angular/core';

import {Http} from '@angular/http';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {

	data: Array<{name: string, date: string}>;
	events: Array<{name: string, date: string}>;

    constructor(private http: Http) {
    	this.http.get("./assets/events.json").subscribe(data => {
        	this.data = JSON.parse(data['_body']);
        	this.getData(14)
        // console.log(this.items);
    	});
    }

    getData(date) {
    	this.events = this.data.filter(d => d.date == date);
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