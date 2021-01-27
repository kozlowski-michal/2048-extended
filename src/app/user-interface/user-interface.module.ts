import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceComponent } from './user-interface.component';
import { InstructionComponent } from './instruction/instruction.component';
import { StatusComponent } from './status/status.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UserInterfaceComponent,
    InstructionComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    NgbModalModule,
  ],
  exports: [
    UserInterfaceComponent,
  ],
})
export class UserInterfaceModule {}
