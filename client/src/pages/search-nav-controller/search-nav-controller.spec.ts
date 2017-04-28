import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchNavController } from './search-nav-controller';
import { MyApp } from '../../app/app.component';
import { NavMock, NavParamsMock } from '../../mocks/mocks';
import { SearchHomePage } from '../search-home/search-home';

let component: SearchNavController;
let fixture: ComponentFixture<SearchNavController>;

describe('SearchNavController Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({ // TestBed sets up an independent module (library) that is an isolated environment with all outside objects mocked.
      declarations: [MyApp, SearchNavController],

      providers: [
        StatusBar,
        SplashScreen,
        {
          provide: NavController,
          useClass: NavMock
        }
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNavController);
    component = fixture.componentInstance;
  });

  afterEach(() => {
        fixture.destroy();
        component = null;
        // de = null;
        // el = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('initialises with a root page of SearchHomePage', () => {
        expect(component['rootSearchWizardPage']).toBe(SearchHomePage);
    });

    it('calls NavController.pop() when the goBack method is called', () => {
        expect(component['rootSearchWizardPage']).toBe(SearchHomePage);

        spyOn(component['navCtrl'], "pop");
        component.goBack();
        expect(component['navCtrl'].pop).toHaveBeenCalled();
    });
});
