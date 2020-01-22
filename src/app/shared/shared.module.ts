import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatBadgeModule
  ],
  declarations: [],
  exports: [CommonModule, FormsModule, MaterialModule]
})
export class SharedModule {}
