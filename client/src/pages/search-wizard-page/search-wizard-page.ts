import { Component, ViewChild } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWizardPage');
  }

  onNextSlide() {
    this.slides.slideNext(500);
  }

  onPrevSlide() {
    this.slides.slidePrev(500);
  }  
}
