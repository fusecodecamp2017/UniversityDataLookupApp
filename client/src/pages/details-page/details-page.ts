import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UniversityData } from '../../providers/dto/university-data';
import { HttpUniversityService } from '../../providers/http-university-service';
import { LoadingController, Loading } from 'ionic-angular';
import { UnivWebsitePage } from '../univ-website-page/univ-website-page';
import { WindowRef } from '../../providers/window-ref';

@Component({
  selector: 'page-details-page',
  templateUrl: 'details-page.html',
})
export class DetailsPage {

  private address: string;
  private universityData: UniversityData;
  private loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private httpUniversityService: HttpUniversityService, 
              private loadingCtrl: LoadingController,
              private windowRef: WindowRef) {
    console.log('DetailsPage id: ' + navParams.get('id'));
    this.universityData = new UniversityData();
    this.universityData.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');

    this.loading = this.loadingCtrl.create({
      content: 'Loading College Details...',
      dismissOnPageChange: false
    });
    this.loading.present();

    this.httpUniversityService.getUniversityById(this.universityData.id)
      .then((data) => { 
        this.universityData = data;
        this.universityData.address = this.universityData.city + ", " + this.universityData.state + " " + this.universityData.zipCode; 
        console.log('University data: ' + data);
        this.loading.dismiss();
      })
      .catch((e) => {
        console.log('Failed to retrieve university data. Error: ' + e);
        this.loading.dismiss();
      });
  }

  onGoBack() {
    this.navCtrl.pop();
  }  

  onUnivWebSite(event) {
    this.navCtrl.push(UnivWebsitePage, {name: this.universityData.name, url: this.universityData.schoolUrl});
    // this.windowRef.nativeWindow.open('http://' + this.universityData.schoolUrl, '_blank');
  }

  onUnivPaymentCalculatorWebSite(event) {
    this.navCtrl.push(UnivWebsitePage, {url: this.universityData.priceCalculatorUrl});
  }  
}
