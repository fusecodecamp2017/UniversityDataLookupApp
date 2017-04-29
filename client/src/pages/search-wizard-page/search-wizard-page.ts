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
  distance: string;

  inStateMinTuition: number;
  inStateMaxTuition: number;

  outStateMinTuition: number;
  outStateMaxTuition: number;

  sortField: string;
  sortOrder: string;

  constructor(public navCtrl: NavController, public queryCriteria: QueryCriteria) {
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

  onGoBack() {
    this.navCtrl.pop(); // Go from SearchWizardPage back to SearhHomPage.
  }

  onGetUniversityData() {
    this.queryCriteria.name = this.name;
    this.queryCriteria.city = this.city;
    this.queryCriteria.state = this.state;
    this.queryCriteria.zipCode = this.zipCode;
    this.queryCriteria.inStateMinTuition = this.inStateMinTuition;
    this.queryCriteria.inStateMaxTuition = this.inStateMaxTuition;
    this.queryCriteria.outStateMinTuition = this.outStateMinTuition;
    this.queryCriteria.outStateMaxTuition = this.outStateMaxTuition;
    this.queryCriteria.sortField = this.sortField;
    this.queryCriteria.sortOrder = this.sortOrder;
	this.queryCriteria.distance = this.distance

    this.navCtrl.push(SearchWizardResultPage, this.queryCriteria);
  }
}
