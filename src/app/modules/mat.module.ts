import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],

})
export class MatModule {
}
