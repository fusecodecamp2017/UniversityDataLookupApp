import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { SearchHomePage } from '../pages/search-home/search-home';
import { SearchNavController } from '../pages/search-nav-controller/search-nav-controller';
import { SearchWizardPage } from '../pages/search-wizard-page/search-wizard-page';
import { SearchWizardResultPage } from '../pages/search-wizard-result-page/search-wizard-result-page';
import { DetailsPage } from '../pages/details-page/details-page';
import { UnivWebsitePage } from '../pages/univ-website-page/univ-website-page';

import { HttpUniversityService } from '../providers/http-university-service';
import { WindowRef } from '../providers/window-ref';
import { SafePipe } from './safe.pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [ // Tells which components belong to the AppModule.
    MyApp,
    SearchNavController,
    SearchHomePage,
    SearchWizardPage,
    SearchWizardResultPage,
    ListPage,
    DetailsPage,
    UnivWebsitePage,
    SafePipe
  ],
  imports: [ // Tells Angular which modules (libraries) this app uses.
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp], // IonicApp should be started first, with it's component tree created.
  entryComponents: [
    MyApp,
    SearchNavController,
    SearchHomePage,
    SearchWizardPage,
    SearchWizardResultPage,
    ListPage,
    DetailsPage,
    UnivWebsitePage
  ],
  providers: [ // Make services globally available to the app.
    StatusBar,
    SplashScreen,
    HttpUniversityService, // Make HttpService globally available.
    WindowRef,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
