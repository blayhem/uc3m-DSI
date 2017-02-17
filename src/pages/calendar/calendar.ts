import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html'
})
export class Calendar implements OnInit {
    constructor() { }
    ngOnInit() { }
    toggleDarkMode() {
        let embedded = document
            .querySelector('.embedded-calendar');
        let type = embedded
            .children[0]
            .tagName;
        switch (type) {
            case 'CALENDAR-LITE-DARK':
                console.log('the dark side is strong in you')
                embedded.innerHTML = '<calendar-lite bind-polymer id="someid"></calendar-lite>';
                break;
            case 'CALENDAR-LITE':
                console.log('let there be light')
                embedded.innerHTML = '<calendar-lite-dark bind-polymer id="someid"></calendar-lite-dark>';
            default:
                console.log('shrug')
        }
    }
}