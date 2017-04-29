import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueryCriteria } from '../../providers/dto/query-criteria';
import { UniversityData } from '../../providers/dto/university-data';
import { HttpUniversityService } from '../../providers/http-university-service';
import { LoadingController, Loading } from 'ionic-angular';
import { DetailsPage } from '../details-page/details-page';

/**
 * Generated class for the SearchWizardResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-wizard-result-page',
  templateUrl: 'search-wizard-result-page.html',
})
export class SearchWizardResultPage {

  private queryCriteria: QueryCriteria;
  private universityData: UniversityData[];
  private loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpUniversityService: HttpUniversityService, private loadingCtrl: LoadingController) {
    this.queryCriteria = new QueryCriteria();
    this.queryCriteria.name = navParams.get('name');
    this.queryCriteria.city = navParams.get('city');
    this.queryCriteria.state = navParams.get('state');
    this.queryCriteria.zipCode = navParams.get('zipCode');
    this.queryCriteria.distance = navParams.get('distance');
    this.queryCriteria.sortField = navParams.get('sortField');
    this.queryCriteria.sortOrder = navParams.get('sortOrder');
    this.queryCriteria.inStateMinTuition = navParams.get('inStateMinTuition');
    this.queryCriteria.inStateMaxTuition = navParams.get('inStateMaxTuition');
    this.queryCriteria.outStateMinTuition = navParams.get('outStateMinTuition');
    this.queryCriteria.outStateMaxTuition = navParams.get('outStateMaxTuition');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWizardResultPage');

    this.loading = this.loadingCtrl.create({
      content: 'Loading Colleges...',
      dismissOnPageChange: false
    });
    this.loading.present();

    this.httpUniversityService.queryUniversities(this.queryCriteria)
      .then((data) => {
        this.universityData = data;
        for( var i = 0; i < this.universityData.length; i++ ) {
          var university = this.universityData[i];
          university.address = university.city + " " + university.state + ", " + university.zipCode;
        }
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

  universitySelected(university: UniversityData) {
    console.log('universitySelected - id: ' + university.id);
    this.navCtrl.push(DetailsPage, {'id': university.id});
  }
}
