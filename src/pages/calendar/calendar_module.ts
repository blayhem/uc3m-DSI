import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Calendar } from './calendar';

@NgModule({
  declarations: [ Calendar ],
  exports: [ Calendar ],
  imports: [ CommonModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class CustomModule {}
