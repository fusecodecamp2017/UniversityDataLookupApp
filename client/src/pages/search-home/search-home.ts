import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchWizardPage } from '../search-wizard-page/search-wizard-page';

@Component({
  selector: 'page-home',
  templateUrl: 'search-home.html'
})
export class SearchHomePage {

  constructor(public navCtrl: NavController) {

  }

  startSearch() {
    console.log('startSearch');
    this.navCtrl.push(SearchWizardPage);
  }
}
