import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ServiceRegionsComponent } from './service-regions/service-regions.component';
import { ServicesComponent } from './services/services.component';
import { AwsApiService } from './aws-api.service'

const appRoutes: Routes = [
  { path: 'service-regions/:offerCode', 
    component: ServiceRegionsComponent 
  },
  { path: 'services', 
    component: ServicesComponent 
  },
  {
    path: '',
    redirectTo: '/services',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ServiceRegionsComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AwsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
