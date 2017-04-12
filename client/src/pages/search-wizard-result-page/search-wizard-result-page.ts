import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueryCriteria } from '../../providers/dto/query-criteria';
import { UniversityData } from '../../providers/dto/university-data';
import { HttpUniversityService } from '../../providers/http-university-service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpUniversityService: HttpUniversityService) {
    this.queryCriteria = new QueryCriteria();
    this.queryCriteria.city = navParams.get('city');
    this.queryCriteria.state = navParams.get('state');
    this.queryCriteria.zipCode = navParams.get('zipCode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchWizardResultPage');
    this.httpUniversityService.queryUniversities(this.queryCriteria)
      .then((data) => { 
        this.universityData = data;
        console.log('University data: ' + data);
      })
      .catch((e) => {
        console.log('Failed to retrieve university data. Error: ' + e);
      });
  }

  universitySelected(university) {
    console.log('universitySelected');
  }
}