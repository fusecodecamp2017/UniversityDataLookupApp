import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WindowRef } from '../../providers/window-ref';

declare var jQuery: any;

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
export class UnivWebsitePage implements AfterViewInit {

  private name: string;
  private webSiteUrl: string;
  private loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private loadingCtrl: LoadingController,
              private windowRef: WindowRef) {
    this.name = navParams.get('name');
    this.webSiteUrl = navParams.get('url');
    this.webSiteUrl = 'http://' + this.webSiteUrl;
  }

  ionViewDidLoad() {
    var test = jQuery('#iframe-container');
    test[0].innerHTML = '<iframe id="iframeId" src="' + this.webSiteUrl + '" class="container" frameborder="0" style="overflow-x: hidden; ' + 'height: ' + test[0].parentElement.clientHeight + 'px;"></iframe>';
    
    // this.loading = this.loadingCtrl.create({
    //   content: 'Loading College...',
    //   dismissOnPageChange: false
    // });
    // this.loading.present();

    console.log('UnivWebsitePage.ionViewDidLoad() - IFrame initialized with url: ' + this.webSiteUrl);
  }

  ngAfterViewInit() {
    console.log('UnivWebsitePage.ngAfterViewInit()');
  }  

  resizeIframe() {
    try {
      var iframe = this.getIFrame();
      iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
      console.log('UnivWebsitePage.resizeIframe() - IFrame height set to: ' + iframe.style.height);

      if( this.loading ) {
        this.loading.dismiss();
      }
    }
    catch( jsE ) {
      console.log('UnivWebsitePage.resizeIframe() - Error: ' + jsE);
    }
  }

  onGoBack() {
    this.navCtrl.pop();
  }

  getIFrame() : HTMLIFrameElement {
    var iframe = document.getElementById('iframeId');
    return (<HTMLIFrameElement>iframe);
  }
}
