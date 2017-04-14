import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { QueryCriteria } from '../../providers/dto/query-criteria';
import { UniversityData } from '../../providers/dto/university-data';
import { SearchWizardResultPage } from '../search-wizard-result-page/search-wizard-result-page';

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

  name: string;
  city: string;
  state: string;
  zipCode: string;

  inStateMinTuition: number;
  inStateMaxTuition: number;

  outStateMinTuition: number;
  outStateMaxTuition: number;

  sortField: string;
  sortOrder: string;

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

  onGetUniversityData() {
    let queryCriteria = new QueryCriteria();
    queryCriteria.name = this.name;
    queryCriteria.city = this.city;
    queryCriteria.state = this.state;
    queryCriteria.zipCode = this.zipCode;
    queryCriteria.inStateMinTuition = this.inStateMinTuition;
    queryCriteria.inStateMaxTuition = this.inStateMaxTuition;
    queryCriteria.outStateMinTuition = this.outStateMinTuition;
    queryCriteria.outStateMaxTuition = this.outStateMaxTuition;
    queryCriteria.sortField = this.sortField;
    queryCriteria.sortOrder = this.sortOrder;

    this.navCtrl.push(SearchWizardResultPage, queryCriteria);
  } 
}
