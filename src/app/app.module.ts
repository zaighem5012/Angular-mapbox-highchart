import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HighchartsChartModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
