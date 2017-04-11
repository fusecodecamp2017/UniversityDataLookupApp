import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';

/**
 * Generated class for the SearchWizardPageOne page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-wizard-page',
  templateUrl: 'search-wizard-page.html',
})
export class SearchWizardPage {

  @ViewChild(Slides) slides: Slides;

  city: string;
  state: string;
  zipCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWizardPage');
  }

  onNextSlide(saveQueryData) {
    if( true == saveQueryData) {
      this.storage.set('city', this.city);
      this.storage.set('state', this.state);
      this.storage.set('zipCode', this.zipCode);
    }
    this.slides.slideNext(500);
  }

  onPrevSlide() {
    this.slides.slidePrev(500);
  }  
}
