import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UnivWebsitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-univ-website-page',
  templateUrl: 'univ-website-page.html',
})
export class UnivWebsitePage {

  private webSiteUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.webSiteUrl = navParams.get('url');
    this.webSiteUrl = 'http://' + this.webSiteUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnivWebsitePage');
  }
}
