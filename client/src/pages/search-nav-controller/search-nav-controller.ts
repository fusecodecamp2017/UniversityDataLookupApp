import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchHomePage } from '../search-home/search-home';

/**
 * Generated class for the SearchHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'search-nav-controller',
  templateUrl: 'search-nav-controller.html',
})
export class SearchNavController {

  rootSearchWizardPage: any = SearchHomePage;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchNavController');
  }

  goBack() {
    this.navCtrl.pop();
  }
}
