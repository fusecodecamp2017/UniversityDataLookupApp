import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchWizardPage } from './search-wizard-page';
import { MyApp } from '../../app/app.component';
import { NavMock, NavParamsMock, QueryCriteriaMock, SlidesMock } from '../../mocks/mocks';
import { SearchHomePage } from '../search-home/search-home';
import { QueryCriteria } from '../../providers/dto/query-criteria';

let component: SearchWizardPage;
let fixture: ComponentFixture<SearchWizardPage>;

describe('SearchWizardPage Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({ // TestBed sets up an independent module (library) that is an isolated environment with all outside objects mocked.
      declarations: [MyApp, SearchWizardPage],

      providers: [
        StatusBar,
        SplashScreen,
        {
          provide: NavController,
          useClass: NavMock
        },
        {
          provide: QueryCriteria,
          useClass: QueryCriteriaMock
        },
        {
          provide: Slides,
          useClass: SlidesMock
        }
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWizardPage);
    component = fixture.componentInstance;
  });

  // afterEach(() => {
  //       fixture.destroy();
  //       component = null;
  //       // de = null;
  //       // el = null;
  // });

  it('is created', () => {
      expect(fixture).toBeTruthy();
      expect(component).toBeTruthy();
  });

  it('goes to next slide when onNextSlide() is called', () => {
      spyOn(component.slides, "slideNext");
      component.onNextSlide();
      expect(component.slides.slideNext).toHaveBeenCalledWith(500);
  });  
});
