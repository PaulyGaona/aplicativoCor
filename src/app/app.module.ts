import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
// import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app-component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
