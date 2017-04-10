import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchWizardPageOne } from '../search-wizard-page-one/search-wizard-page-one';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  startSearch() {
    console.log('startSearch');
    this.navCtrl.push(SearchWizardPageOne);
  }
}
